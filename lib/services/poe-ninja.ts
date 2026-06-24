import { dateDelta } from "../utilities/date-delta";
import { hasValidExtensionContext, isExtensionContextInvalidatedError } from "../utilities/extension-context";
import { emitPageDebug } from "../utilities/page-debug";
import { slugify } from "../utilities/slugify";
import { storageService } from "./storage";

export interface PoeNinjaExchangeLine {
  id: string;
  primaryValue: number;
}

export interface PoeNinjaExchangeItem {
  id: string;
  name: string;
  image: string;
}

export interface PoeNinjaExchangePayload {
  lines: PoeNinjaExchangeLine[];
  items: PoeNinjaExchangeItem[];
}

export interface PoeNinjaCurrencyDatum {
  value: number;
  icon: string;
}

export interface PoeNinjaCurrencyData {
  [slug: string]: PoeNinjaCurrencyDatum;
}

const EXCHANGE_RESOURCE = "/exchange/current/overview?type=Currency";
const RATIOS_CACHE_DURATION = 900000; // 15 minutes

const decodeLeague = (league: string) => {
  const withoutRealm = league.replace(/^(?:poe2|xbox|sony)\//i, "");

  try {
    return decodeURIComponent(withoutRealm);
  } catch {
    return withoutRealm.replace(/%20/g, " ");
  }
};

const absoluteCurrencyIcon = (image: string) =>
  image.startsWith("http") ? image : `https://web.poecdn.com${image}`;

export const parseExchangeRatios = (payload: PoeNinjaExchangePayload): PoeNinjaCurrencyData => {
  const itemsById = new Map(payload.items.map((item) => [item.id, item]));

  return payload.lines.reduce((ratios, line) => {
    const item = itemsById.get(line.id);
    if (!item || !Number.isFinite(line.primaryValue) || line.primaryValue <= 0) {
      return ratios;
    }

    ratios[slugify(item.name)] = {
      value: line.primaryValue,
      icon: absoluteCurrencyIcon(item.image)
    };
    return ratios;
  }, {} as PoeNinjaCurrencyData);
};

export class PoeNinjaService {
  async fetchCurrencyDataFor(league: string, version: "1" | "2"): Promise<PoeNinjaCurrencyData> {
    const cacheKey = this.cacheKey(version);
    const cached = await storageService.getValue<PoeNinjaCurrencyData>(cacheKey, league);
    if (cached && Object.keys(cached).length > 0) {
      emitPageDebug("poe-ninja-cache-hit", {
        league,
        version,
        entries: Object.keys(cached).length
      });
      return cached;
    }

    return this.fetchFreshCurrencyDataFor(league, version);
  }

  async fetchFreshCurrencyDataFor(league: string, version: "1" | "2"): Promise<PoeNinjaCurrencyData> {
    const cacheKey = this.cacheKey(version);
    const stale = await storageService.getStaleValue<PoeNinjaCurrencyData>(cacheKey, league);

    try {
      const ratios = await this.requestCurrencyDataFor(league, version);
      if (Object.keys(ratios).length > 0) {
        await storageService.setEphemeralValue(
          cacheKey,
          ratios,
          dateDelta(RATIOS_CACHE_DURATION),
          league
        );
      }
      return ratios;
    } catch (error) {
      if (stale && Object.keys(stale).length > 0) {
        emitPageDebug("poe-ninja-stale-fallback", {
          league,
          version,
          entries: Object.keys(stale).length
        });
        return stale;
      }
      throw error;
    }
  }

  private async requestCurrencyDataFor(
    league: string,
    version: "1" | "2"
  ): Promise<PoeNinjaCurrencyData> {
    const normalizedLeague = decodeLeague(league);
    const resource = `${EXCHANGE_RESOURCE}&league=${encodeURIComponent(normalizedLeague)}`;

    emitPageDebug("poe-ninja-request", {
      league,
      normalizedLeague,
      version,
      resource
    });

    if (!hasValidExtensionContext()) {
      throw new Error("Extension context invalidated");
    }

    let response: PoeNinjaExchangePayload | null = null;
    try {
      response = await chrome.runtime.sendMessage({
        query: "poe-ninja-exchange",
        game: version === "2" ? "poe2" : "poe1",
        resource
      });
    } catch (error) {
      if (isExtensionContextInvalidatedError(error)) {
        throw new Error("Extension context invalidated");
      }
      throw error;
    }

    if (!response) {
      throw new Error("Failed to fetch currency exchange data from poe.ninja");
    }

    const parsed = parseExchangeRatios(response);
    emitPageDebug("poe-ninja-response", {
      league,
      normalizedLeague,
      version,
      entries: Object.keys(parsed).length
    });

    if (Object.keys(parsed).length === 0) {
      throw new Error(`poe.ninja returned no currency data for ${normalizedLeague}`);
    }

    return parsed;
  }

  private cacheKey(version: "1" | "2") {
    return `poe-ninja-poe${version}-exchange-ratios-cache`;
  }
}

export const poeNinjaService = new PoeNinjaService();
