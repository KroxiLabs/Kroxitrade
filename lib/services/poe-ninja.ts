import { slugify } from "../utilities/slugify";
import { dateDelta } from "../utilities/date-delta";
import { hasValidExtensionContext, isExtensionContextInvalidatedError } from "../utilities/extension-context";
import { emitPageDebug } from "../utilities/page-debug";
import { storageService } from "./storage";

export interface PoeNinjaCurrenciesPayloadLine {
  currencyTypeName: string;
  chaosEquivalent: number;
}

export interface PoeNinjaCurrenciesPayload {
  lines: PoeNinjaCurrenciesPayloadLine[];
}

export interface PoeNinjaCurrenciesRatios {
  [key: string]: number;
}

interface OfficialTradeExchangeOffer {
  exchange?: {
    currency?: string;
    amount?: number;
  };
  item?: {
    currency?: string;
    amount?: number;
  };
}

interface OfficialTradeExchangeResultEntry {
  listing?: {
    offers?: OfficialTradeExchangeOffer[];
  };
}

interface OfficialTradeExchangePayload {
  result?: Record<string, OfficialTradeExchangeResultEntry>;
}

const URIS = {
  currencies: "/data/currencyoverview?type=Currency"
};

const RATIOS_CACHE_DURATION = 900000; // 15 minutes
const RATIOS_CACHE_KEY = "poe-ninja-chaos-ratios-cache";

export class PoeNinjaService {
  async fetchChaosRatiosFor(league: string): Promise<PoeNinjaCurrenciesRatios> {
    const cached = await storageService.getValue<PoeNinjaCurrenciesRatios>(RATIOS_CACHE_KEY, league);
    if (cached && Object.keys(cached).length > 0) {
      emitPageDebug("poe-ninja-cache-hit", {
        league,
        entries: Object.keys(cached).length
      });
      return cached;
    }

    if (cached) {
      emitPageDebug("poe-ninja-cache-empty", { league });
    }

    return this.fetchFreshChaosRatiosFor(league);
  }

  async fetchFreshChaosRatiosFor(league: string): Promise<PoeNinjaCurrenciesRatios> {
    await storageService.deleteValue(RATIOS_CACHE_KEY, league);

    const ratios = await this.requestChaosRatiosFor(league);
    await storageService.setEphemeralValue(RATIOS_CACHE_KEY, ratios, dateDelta(RATIOS_CACHE_DURATION), league);

    return ratios;
  }

  private async requestChaosRatiosFor(league: string): Promise<PoeNinjaCurrenciesRatios> {
    const { normalizedLeague, game } = this.normalizeLeagueRequest(league);

    if (game === "poe2") {
      return this.requestOfficialPoe2ChaosRatiosFor(league, normalizedLeague);
    }

    const uri = `${URIS.currencies}&league=${encodeURIComponent(normalizedLeague)}${game ? `&game=${game}` : ""}`;
    console.log("[Poe Trade Plus] Requesting poe.ninja ratios:", {
      league,
      normalizedLeague,
      game,
      uri
    });
    emitPageDebug("poe-ninja-request", {
      league,
      normalizedLeague,
      game,
      uri
    });
    if (!hasValidExtensionContext()) {
      throw new Error("Extension context invalidated");
    }

    let response: PoeNinjaCurrenciesPayload | null = null;

    try {
      response = await chrome.runtime.sendMessage({ query: "poe-ninja", resource: uri });
    } catch (error) {
      if (isExtensionContextInvalidatedError(error)) {
        throw new Error("Extension context invalidated");
      }

      throw error;
    }
    
    if (!response) throw new Error("Failed to fetch from poe.ninja via background");

    const parsed = this.parseChaosRatios(response);
    console.log("[Poe Trade Plus] Poe.ninja ratios parsed:", {
      league,
      normalizedLeague,
      game,
      entries: Object.keys(parsed).length
    });
    emitPageDebug("poe-ninja-response", {
      league,
      normalizedLeague,
      game,
      entries: Object.keys(parsed).length
    });

    if (Object.keys(parsed).length === 0) {
      emitPageDebug("poe-ninja-empty-response", {
        league,
        normalizedLeague,
        game,
        uri
      });
    }

    return parsed;
  }

  private async requestOfficialPoe2ChaosRatiosFor(
    league: string,
    normalizedLeague: string
  ): Promise<PoeNinjaCurrenciesRatios> {
    const url = `https://www.pathofexile.com/api/trade2/exchange/poe2/${encodeURIComponent(normalizedLeague)}`;
    const body = {
      exchange: {
        status: { option: "online" },
        have: ["chaos"],
        want: ["divine"]
      }
    };

    console.log("[Poe Trade Plus] Requesting official PoE2 exchange ratios:", {
      league,
      normalizedLeague,
      url,
      body
    });
    emitPageDebug("poe2-exchange-request", {
      league,
      normalizedLeague,
      url,
      body
    });

    if (!hasValidExtensionContext()) {
      throw new Error("Extension context invalidated");
    }

    let response: OfficialTradeExchangePayload | null = null;

    try {
      response = await chrome.runtime.sendMessage({
        query: "trade-exchange-rate",
        url,
        body
      });
    } catch (error) {
      if (isExtensionContextInvalidatedError(error)) {
        throw new Error("Extension context invalidated");
      }

      throw error;
    }

    if (!response) {
      throw new Error("Failed to fetch PoE2 trade exchange ratios via background");
    }

    const parsed = this.parseOfficialPoe2ChaosRatios(response);
    const entries = Object.keys(parsed).length;

    console.log("[Poe Trade Plus] Official PoE2 exchange ratios parsed:", {
      league,
      normalizedLeague,
      entries,
      divineRatio: parsed["divine-orb"]
    });
    emitPageDebug("poe2-exchange-response", {
      league,
      normalizedLeague,
      entries,
      divineRatio: parsed["divine-orb"]
    });

    if (entries === 0) {
      emitPageDebug("poe2-exchange-empty-response", {
        league,
        normalizedLeague,
        url
      });
    }

    return parsed;
  }

  private parseChaosRatios(payload: PoeNinjaCurrenciesPayload): PoeNinjaCurrenciesRatios {
    return payload.lines.reduce((acc, { currencyTypeName, chaosEquivalent }) => {
      acc[slugify(currencyTypeName)] = chaosEquivalent;
      return acc;
    }, {} as PoeNinjaCurrenciesRatios);
  }

  private parseOfficialPoe2ChaosRatios(payload: OfficialTradeExchangePayload): PoeNinjaCurrenciesRatios {
    const ratios: PoeNinjaCurrenciesRatios = {
      "chaos-orb": 1
    };

    const offers = Object.values(payload.result || {})
      .flatMap((entry) => entry.listing?.offers || [])
      .filter((offer) =>
        offer.exchange?.currency === "chaos" &&
        offer.item?.currency === "divine" &&
        typeof offer.exchange.amount === "number" &&
        typeof offer.item.amount === "number" &&
        offer.exchange.amount > 0 &&
        offer.item.amount > 0
      );

    if (offers.length === 0) {
      return {};
    }

    const chaosPerDivine = offers
      .map((offer) => offer.exchange!.amount! / offer.item!.amount!)
      .sort((a, b) => a - b)[0];

    if (!Number.isFinite(chaosPerDivine) || chaosPerDivine <= 0) {
      return {};
    }

    ratios["divine-orb"] = chaosPerDivine;

    return ratios;
  }

  private normalizeLeagueRequest(league: string) {
    const decodeLeague = (value: string) => {
      try {
        return decodeURIComponent(value);
      } catch {
        return value.replace(/%20/g, " ");
      }
    };

    if (/^poe2\//i.test(league)) {
      return {
        normalizedLeague: decodeLeague(league.replace(/^poe2\//i, "")),
        game: "poe2"
      } as const;
    }

    if (/^(xbox|sony)\//i.test(league)) {
      return {
        normalizedLeague: decodeLeague(league.replace(/^(xbox|sony)\//i, "")),
        game: null
      } as const;
    }

    return {
      normalizedLeague: decodeLeague(league),
      game: null
    } as const;
  }
}

export const poeNinjaService = new PoeNinjaService();
