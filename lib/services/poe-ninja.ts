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

interface PoeNinjaUniquePayloadLine {
  name: string;
  divineValue: number;
  links?: number;
}

interface PoeNinjaUniquePayload {
  lines: PoeNinjaUniquePayloadLine[];
}

export interface PoeNinjaUniqueDivinePrices {
  [slug: string]: number;
}

const EXCHANGE_RESOURCE = "/exchange/current/overview?type=Currency";
const RATIOS_CACHE_DURATION = 900000; // 15 minutes
const UNIQUE_PRICES_CACHE_DURATION = 3600000; // 1 hour
const UNIQUE_OVERVIEW_TYPES = [
  "UniqueWeapon",
  "UniqueArmour",
  "UniqueAccessory",
  "UniqueFlask",
  "UniqueJewel"
];

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

  async fetchUniqueDivinePricesFor(league: string): Promise<PoeNinjaUniqueDivinePrices> {
    const cacheKey = "poe-ninja-poe1-unique-divine-prices-cache";
    const cached = await storageService.getValue<PoeNinjaUniqueDivinePrices>(cacheKey, league);
    if (cached && Object.keys(cached).length > 0) return cached;

    const stale = await storageService.getStaleValue<PoeNinjaUniqueDivinePrices>(cacheKey, league);
    try {
      const normalizedLeague = encodeURIComponent(decodeLeague(league));
      const payloads = await Promise.all(
        UNIQUE_OVERVIEW_TYPES.map((type) => this.requestUniqueOverview(type, normalizedLeague))
      );
      const prices = this.parseUniqueDivinePrices(payloads);
      if (Object.keys(prices).length === 0) {
        throw new Error("poe.ninja returned no unique prices");
      }
      await storageService.setEphemeralValue(
        cacheKey,
        prices,
        dateDelta(UNIQUE_PRICES_CACHE_DURATION),
        league
      );
      return prices;
    } catch (error) {
      if (stale && Object.keys(stale).length > 0) return stale;
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

  private async requestUniqueOverview(
    type: string,
    encodedLeague: string
  ): Promise<PoeNinjaUniquePayload> {
    if (!hasValidExtensionContext()) {
      throw new Error("Extension context invalidated");
    }

    const response = await chrome.runtime.sendMessage({
      query: "poe-ninja-item",
      resource: `/stash/current/item/overview?type=${type}&league=${encodedLeague}`
    }) as PoeNinjaUniquePayload | null;
    if (!response?.lines) {
      throw new Error(`Failed to fetch ${type} prices from poe.ninja`);
    }
    return response;
  }

  private parseUniqueDivinePrices(
    payloads: PoeNinjaUniquePayload[]
  ): PoeNinjaUniqueDivinePrices {
    return payloads.reduce((prices, payload) => {
      for (const { name, divineValue, links } of payload.lines) {
        if (!name || !Number.isFinite(divineValue) || divineValue < 0) continue;
        if (links && links > 0) continue;
        const slug = slugify(name);
        if (!slug || (prices[slug] !== undefined && prices[slug] <= divineValue)) continue;
        prices[slug] = divineValue;
      }
      return prices;
    }, {} as PoeNinjaUniqueDivinePrices);
  }

  private cacheKey(version: "1" | "2") {
    return `poe-ninja-poe${version}-exchange-ratios-cache`;
  }
}

export const poeNinjaService = new PoeNinjaService();
