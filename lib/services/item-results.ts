import { poeNinjaService, type PoeNinjaCurrencyData } from "./poe-ninja";
import { tradeLocationService } from "./trade-location";
import { searchPanelService } from "./search-panel";
import { settings } from "./settings";
import { slugify } from "../utilities/slugify";
import { escapeRegex } from "../utilities/escape-regex";
import { emitPageDebug } from "../utilities/page-debug";
import { getCurrencyIconUrl } from "../data/currency-icons";
import {
  MAGEBLOOD_LEGACY_TEXTS,
  type MagebloodLegacyLocale
} from "../data/mageblood-legacy-texts";
import coeButtonImage from "../../assets/coe-button.webp?inline";
import { copyItemForPob } from "../utilities/copy-item-for-pob";
import {
  buildCraftOfExileText,
  copyTextSynchronously,
  hasUnsupportedCraftOfExileMod
} from "../utilities/copy-item-for-craft-of-exile";
import { flashMessages } from "./flash";
import { experimentalSettings } from "./experimental";



enum ItemResultsType {
  ARMOR = "armor",
  WEAPON = "weapon",
  UNKNOWN = "unknown"
}

const ILVL_THRESHOLDS = [
  { maxSockets: 2, ilvl: 1 },
  { maxSockets: 3, ilvl: 24 },
  { maxSockets: 4, ilvl: 34 },
  { maxSockets: 5, ilvl: 49 },
];

interface LegacyEffect {
  stats: Array<[number, string]>;
}

interface MagebloodLegacy {
  mod: HTMLElement;
  key: string;
  title: string;
}

const MAGEBLOOD_LEGACY_EFFECTS: Record<string, LegacyEffect> = {
  amethyst: { stats: [[45, "% to Chaos Resistance"]] },
  basalt: { stats: [[150, "% increased Armour"]] },
  bismuth: { stats: [[45, "% to all Elemental Resistances"]] },
  diamond: { stats: [[75, "% increased Critical Hit Chance"]] },
  gold: { stats: [[45, "% increased Rarity of Items found"]] },
  granite: { stats: [[2000, " to Armour"]] },
  jade: { stats: [[2000, " to Evasion Rating"]] },
  quicksilver: { stats: [[30, "% increased Movement Speed"]] },
  ruby: { stats: [[60, "% to Fire Resistance"], [5, "% to Maximum Fire Resistance"]] },
  sapphire: { stats: [[60, "% to Cold Resistance"], [5, "% to Maximum Cold Resistance"]] },
  silver: { stats: [[30, "% increased Skill Speed"]] },
  stibnite: { stats: [[150, "% increased Evasion Rating"]] },
  sulphur: { stats: [[60, "% increased Damage"]] },
  topaz: { stats: [[60, "% to Lightning Resistance"], [5, "% to Maximum Lightning Resistance"]] }
};

const MAGEBLOOD_LEGACY_VARIANTS: Record<string, string> = {
  "1": "amethyst",
  "2": "basalt",
  "3": "bismuth",
  "4": "diamond",
  "5": "gold",
  "6": "granite",
  "7": "jade",
  "8": "quicksilver",
  "9": "ruby",
  "10": "sapphire",
  "11": "silver",
  "12": "stibnite",
  "13": "sulphur",
  "14": "topaz"
};

const MAGEBLOOD_LEGACY_ALIASES: Record<string, string> = {
  amatista: "amethyst",
  basalto: "basalt",
  bismuto: "bismuth",
  diamante: "diamond",
  oro: "gold",
  granito: "granite",
  jade: "jade",
  celeridad: "quicksilver",
  rubi: "ruby",
  rubí: "ruby",
  zafiro: "sapphire",
  plata: "silver",
  antimonio: "stibnite",
  azufre: "sulphur",
  topacio: "topaz",
  mercurio: "quicksilver",
  estibina: "stibnite",
  ametista: "amethyst",
  ouro: "gold",
  safira: "sapphire",
  prata: "silver",
  enxofre: "sulphur"
};

const MAGEBLOOD_LEGACY_FIELD_PATTERN = /stat\.explicit\.stat_264262054\|(\d+)/;
const MAGEBLOOD_DUPLICATE_FIELD = "stat.explicit.stat_3874491706";
const MAGEBLOOD_LEGACY_PATTERN = /^(?:Legacy of|Legado de|มรดกแห่ง) (.+)$/i;
const MAGEBLOOD_DUPLICATE_PATTERN =
  /(?:Mage(?:'|\u2019)?s Legacies have (\d+)% increased effect per duplicate|legados de mago.*efecto aumentado un (\d+)%.*legado de mago duplicado)/i;
const MAGEBLOOD_LEGACY_CLASS = "bt-mb-legacy";
const MAGEBLOOD_EXPLANATIONS_CLASS = "bt-mb-explanations";

const normalizeMagebloodLegacyKey = (name: string) => {
  const normalized = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
  return MAGEBLOOD_LEGACY_ALIASES[normalized] || normalized;
};

const titleCaseLegacyName = (name: string) =>
  name.charAt(0).toUpperCase() + name.slice(1);

const getMagebloodLegacyLocale = (): MagebloodLegacyLocale => {
  const host = window.location.hostname.toLowerCase();
  if (host === "poe2.kakaogames.com") return "ko";
  const subdomain = host.split(".")[0];
  if (subdomain === "br") return "pt";
  if (subdomain === "jp") return "jp";
  if (["es", "pt", "ru", "th", "de", "fr"].includes(subdomain)) {
    return subdomain as MagebloodLegacyLocale;
  }
  return "en";
};

const getMagebloodLegacyBaseLabel = (locale: MagebloodLegacyLocale) =>
  ({
    en: "base",
    es: "base",
    pt: "base",
    ru: "база",
    th: "ฐาน",
    de: "Basis",
    fr: "base",
    jp: "基礎",
    ko: "기본"
  })[locale];

const getMagebloodLegacyEffectLabel = (locale: MagebloodLegacyLocale) =>
  ({
    en: "effect",
    es: "de efecto",
    pt: "de efeito",
    ru: "эффекта",
    th: "ผล",
    de: "Effekt",
    fr: "d'effet",
    jp: "効果",
    ko: "효과"
  })[locale];

const formatMagebloodLegacyLine = (template: string, value: number) =>
  template.replace("{value}", `${value}`);



export class ItemResultsService {
  private currencyData: PoeNinjaCurrencyData | null = null;
  private statNeedles: RegExp[] = [];
  private readonly CHAOS_SLUG = "chaos-orb";
  private readonly referenceSlugs = {
    "1": ["divine-orb", "chaos-orb"],
    "2": ["exalted-orb", "divine-orb", "chaos-orb", "orb-of-annulment"]
  } as const;
  private readonly currencySlugAliases: Record<string, string> = {
    chaos: "chaos-orb",
    divine: "divine-orb",
    exalted: "exalted-orb",
    exalt: "exalted-orb",
    regal: "regal-orb",
    vaal: "vaal-orb",
    alchemy: "orb-of-alchemy",
    annul: "orb-of-annulment",
    annullment: "orb-of-annulment",
    transmute: "orb-of-transmutation",
    transmutation: "orb-of-transmutation",
    augment: "orb-of-augmentation",
    augmentation: "orb-of-augmentation",
    chance: "orb-of-chance"
  };
  private showEquivalentPricing = false;
  private showMagebloodLegacyDescriptions = false;
  private unsubscribeSettings: (() => void) | null = null;
  private unsubscribeLocation: (() => void) | null = null;
  private readonly postSearchRefreshDelays = [80, 220, 500, 900];
  private searchRefreshTimers: number[] = [];
  private readonly handleDocumentClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    const copyButton = target?.closest<HTMLButtonElement>("button.copy");
    const coeButton = target?.closest<HTMLButtonElement>("button.bt-copy-coe");

    if (
      coeButton &&
      experimentalSettings.isCoeVisible()
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (coeButton.getAttribute("aria-disabled") === "true") return;

      const row = coeButton.closest<HTMLElement>(".row, .result-item");
      const text = row ? buildCraftOfExileText(row) : null;
      if (text && copyTextSynchronously(text)) {
        this.showCopyFeedback("Item copied for Craft of Exile.");
      } else {
        flashMessages.alert("Could not copy this item for Craft of Exile.");
      }
      return;
    }

    if (
      copyButton &&
      tradeLocationService.current.version === "2" &&
      experimentalSettings.isPoe2CopyVisible()
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();

      const row = copyButton.closest<HTMLElement>(".row, .result-item");
      if (row && copyItemForPob(row)) {
        this.showCopyFeedback("Item text copied.");
      } else {
        flashMessages.alert("Could not copy this item for Path of Building.");
      }
      return;
    }

    if (!target?.closest(".btn.search-btn")) return;
    this.schedulePostSearchRefresh();
  };
  private readonly handleExperimentalChange = () => {
    this.enhanceResults();
  };

  async initialize() {
    emitPageDebug("item-results-initialize", {
      href: window.location.href
    });
    if (window.location.protocol === "chrome-extension:") {
      return;
    }

    await settings.load();
    this.showEquivalentPricing = settings.getCurrent().showEquivalentPricing;
    this.showMagebloodLegacyDescriptions = settings.getCurrent().showMagebloodLegacyDescriptions;
    this.unsubscribeSettings?.();
    this.unsubscribeSettings = settings.subscribe((value) => {
      const changed = this.showEquivalentPricing !== value.showEquivalentPricing;
      const magebloodChanged =
        this.showMagebloodLegacyDescriptions !== value.showMagebloodLegacyDescriptions;
      this.showEquivalentPricing = value.showEquivalentPricing;
      this.showMagebloodLegacyDescriptions = value.showMagebloodLegacyDescriptions;
      if (changed) {
        this.refreshEquivalentPricing();
      }
      if (magebloodChanged) {
        this.refreshMagebloodLegacyDescriptions();
      }
    });
    this.unsubscribeLocation?.();
    this.unsubscribeLocation = tradeLocationService.onChange(() => {
      void this.handleLocationChange();
    });
    
    try {
      await this.fetchRatios();
    } catch (e) {
      console.error("[Poe Trade Plus] Failed to fetch ratios from poe.ninja:", e);
    }

    this.prepareHighlighting();
    this.startObserving();
    document.removeEventListener("click", this.handleDocumentClick, true);
    document.addEventListener("click", this.handleDocumentClick, true);
    document.removeEventListener(
      "poe-trade-plus:experimental-change",
      this.handleExperimentalChange
    );
    document.addEventListener(
      "poe-trade-plus:experimental-change",
      this.handleExperimentalChange
    );
  }

  private showCopyFeedback(toastMessage: string) {
    this.showItemCopiedToast(toastMessage);
  }

  private showItemCopiedToast(message: string) {
    document.querySelector(".poe-toast-trade.bt-item-copied-toast")?.remove();

    let container = document.body.querySelector<HTMLElement>(
      ".poe-toast-container.poe-toast-container--position-bottom-center"
    );
    if (!container) {
      container = document.createElement("div");
      container.className =
        "poe-toast-container poe-toast-container--position-bottom-center bt-item-copied-toast-container";
      document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className =
      "poe-toast-trade poe-toast-trade--type-success bt-item-copied-toast";
    toast.setAttribute("role", "status");
    toast.setAttribute("aria-live", "polite");

    const content = document.createElement("div");
    content.className = "poe-toast-trade__content";

    const title = document.createElement("div");
    title.className = "poe-toast-trade__title";
    title.textContent = message;
    content.appendChild(title);

    const close = document.createElement("button");
    close.type = "button";
    close.className = "poe-toast-trade__close";
    close.textContent = "×";
    close.setAttribute("aria-label", "Close");
    close.addEventListener("click", () => {
      toast.remove();
      if (
        container?.classList.contains("bt-item-copied-toast-container") &&
        container.childElementCount === 0
      ) {
        container.remove();
      }
    });

    toast.append(content, close);
    container.appendChild(toast);

    window.setTimeout(() => {
      toast.classList.add("is-leaving");
      window.setTimeout(() => {
        toast.remove();
        if (
          container?.classList.contains("bt-item-copied-toast-container") &&
          container.childElementCount === 0
        ) {
          container.remove();
        }
      }, 180);
    }, 1500);
  }

  private async handleLocationChange() {
    try {
      await this.fetchRatios();
    } catch (e) {
      console.error("[Poe Trade Plus] Failed to refresh ratios after location change:", e);
    }

    this.schedulePostSearchRefresh();
    this.refreshEquivalentPricing();
  }



  private async fetchRatios(forceFresh = false) {
    const { league, type, slug, version } = tradeLocationService.current;

    if (!league) {
      this.currencyData = null;
      emitPageDebug("poe-ninja-skip", {
        reason: "missing-league",
        league,
        type,
        slug
      });
      return;
    }

    emitPageDebug("poe-ninja-fetching-for-league", {
      league,
      type,
      slug,
      forceFresh
    });
    this.currencyData = forceFresh
      ? await poeNinjaService.fetchFreshCurrencyDataFor(league, version)
      : await poeNinjaService.fetchCurrencyDataFor(league, version);
  }

  async forceRefreshEquivalentPricing() {
    await this.fetchRatios(true);
    this.refreshEquivalentPricing();
  }

  private injectEquivalentPricing(row: HTMLElement) {
    const priceInfo = this.extractPriceInfo(row);
    if (!priceInfo) {
      return;
    }

    const { container: priceContainer, amount, currencyText } = priceInfo;

    if (!this.currencyData) {
      this.removeEquivalentPricing(row);
      return;
    }

    if (!currencyText || isNaN(amount)) {
      this.removeEquivalentPricing(row);
      emitPageDebug("equivalent-missing-details", {
        currency: currencyText,
        amount,
        html: priceContainer.innerHTML
      });
      return;
    }

    const slug = this.resolveCurrencySlug(currencyText);
    const pricedCurrency = this.currencyData[slug];
    if (!pricedCurrency) {
      this.removeEquivalentPricing(row);
      emitPageDebug("equivalent-unresolved", {
        amount,
        currencyText,
        slug,
        availableSample: Object.keys(this.currencyData).slice(0, 10)
      });
      return;
    }

    const version = tradeLocationService.current.version;
    const valueInPrimary = amount * pricedCurrency.value;
    const parts = this.referenceSlugs[version]
      .filter((referenceSlug) => referenceSlug !== slug)
      .flatMap((referenceSlug) => {
        const reference = this.currencyData?.[referenceSlug];
        if (!reference?.value) return [];

        const equivalent = valueInPrimary / reference.value;
        const rounded = equivalent >= 10
          ? Math.round(equivalent)
          : Math.round(equivalent * 10) / 10;
        if (!rounded) return [];

        return [{ amount: rounded, slug: referenceSlug, icon: reference.icon }];
      });

    if (parts.length === 0) {
      this.removeEquivalentPricing(row);
      return;
    }

    emitPageDebug("equivalent-rendered", {
      amount,
      currencyText,
      slug,
      parts
    });
    this.renderEquivalentPricing(priceContainer, parts);
  }

  private extractPriceInfo(row: HTMLElement) {
    const container = row.querySelector<HTMLElement>('[data-field="price"], .details .price, .itemHeader .lprice, .price');
    if (!container) {
      return null;
    }

    const normalizedLabel = this.extractNormalizedPriceLabel(container);
    const amountMatch = normalizedLabel.match(/[0-9]+(?:\.[0-9]+)?/);
    const amount = amountMatch ? parseFloat(amountMatch[0]) : Number.NaN;
    const iconAlt = this.extractCurrencyAlt(container);

    let currencyText = iconAlt || "";
    if (!currencyText && amountMatch) {
      currencyText = normalizedLabel
        .slice(amountMatch.index! + amountMatch[0].length)
        .replace(/^x\s*/i, "")
        .trim();
    }

    if (!currencyText) {
      const rawCurrencyText = row.querySelector<HTMLElement>(
        '[data-field="price"] .currency-text span, .currency-text span, .currency-text'
      )?.textContent;
      currencyText = rawCurrencyText?.trim() || "";
    }

    return {
      container,
      amount,
      currencyText
    };
  }

  private extractNormalizedPriceLabel(container: HTMLElement) {
    return (container.textContent || "")
      .replace(/\s+/g, " ")
      .replace(/^price\s*/i, "")
      .replace(/^asking price\s*/i, "")
      .replace(/asking price/gi, "")
      .replace(/\s*fee.*$/i, "")
      .replace(/^note\s*/i, "")
      .trim();
  }

  private extractCurrencyAlt(container: HTMLElement) {
    const icons = Array.from(container.querySelectorAll<HTMLImageElement>("img[alt]"));
    for (const icon of icons) {
      const alt = icon.alt?.trim();
      if (!alt) continue;
      if (/currency/i.test(alt)) continue;
      return alt;
    }

    return "";
  }

  private resolveCurrencySlug(currencyText: string) {
    const baseSlug = slugify(currencyText);
    return this.currencySlugAliases[baseSlug] || baseSlug;
  }

  private renderEquivalentPricing(
    container: HTMLElement,
    parts: Array<{ amount: number | string; slug: string; icon: string }>
  ) {
    let el = container.querySelector(".bt-equivalent-pricings-equivalent") as HTMLElement | null;
    if (!el) {
      el = document.createElement("span");
      el.className = "bt-equivalent-pricings bt-equivalent-pricings-equivalent";
      container.appendChild(el);
    }

    el.replaceChildren();
    el.appendChild(this.createTextSpan("bt-equivalent-label", "equivalent:"));

    parts.forEach((part, index) => {
      if (index > 0) {
        el!.appendChild(this.createTextSpan("bt-equivalent-separator", "="));
      }
      el!.appendChild(this.createCurrencyFragment(part.amount, part.slug, part.icon));
    });
    this.syncEquivalentVisibility(el!);
  }

  private createCurrencyFragment(amount: number | string, slug: string, iconUrl: string) {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.createTextSpan("bt-equivalent-amount", String(amount)));

    const icon = document.createElement("img");
    icon.className = "bt-equivalent-icon currency-icon";
    icon.alt = slug;
    icon.src = iconUrl || getCurrencyIconUrl(slug === this.CHAOS_SLUG ? "chaos" : "divine");
    fragment.appendChild(icon);

    return fragment;
  }

  private createTextSpan(className: string, text: string) {
    const span = document.createElement("span");
    span.className = className;
    span.textContent = text;
    return span;
  }

  private removeEquivalentPricing(row: HTMLElement) {
    row.querySelectorAll(".bt-equivalent-pricings-equivalent").forEach((el) => el.remove());
  }

  private syncEquivalentVisibility(element: HTMLElement) {
    const isHidden = !this.showEquivalentPricing;
    element.classList.toggle("is-hidden", isHidden);
    element.toggleAttribute("hidden", isHidden);
    element.style.display = isHidden ? "none" : "block";
    element.setAttribute("aria-hidden", String(isHidden));
  }

  private prepareHighlighting() {
    const stats = searchPanelService.getStats();
    this.statNeedles = stats.map(s => new RegExp(escapeRegex(s).replace(/#/g, '[\\+\\-]?\\d+'), 'i'));
  }

  private observerTimer: ReturnType<typeof setTimeout> | null = null;
  private observerRetries = 0;
  private readonly OBSERVER_MAX_RETRIES = 10;
  private readonly OBSERVER_RETRY_DELAY = 2000;

  private startObserving() {
    const observer = new MutationObserver((mutations) => {
      if (this.observerTimer) clearTimeout(this.observerTimer);
      this.observerTimer = setTimeout(() => this.enhanceResults(), 100);
    });

    const target = document.querySelector(".search-results, .resultset, .results");
    if (target) {
      this.observerRetries = 0;
      observer.observe(target, { childList: true, subtree: true });
      this.enhanceResults();
    } else if (this.observerRetries < this.OBSERVER_MAX_RETRIES) {
      // Fallback: observe body but keep trying to find the specific container.
      // Cap retries so we don't poll forever if the page never renders results.
      this.observerRetries++;
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => {
        observer.disconnect();
        this.startObserving();
      }, this.OBSERVER_RETRY_DELAY);
    } else {
      emitPageDebug("observer-give-up", {
        retries: this.observerRetries,
        reason: "max-retries-reached"
      });
    }
  }

  private schedulePostSearchRefresh() {
    this.searchRefreshTimers.forEach((timer) => window.clearTimeout(timer));
    this.searchRefreshTimers = this.postSearchRefreshDelays.map((delay) =>
      window.setTimeout(() => this.enhanceResults(), delay)
    );
  }

  private enhanceResults() {
    // Current trade site uses .result-item, but some pages or versions use .row.
    // Re-run equivalent pricing on every visible result because the trade site can recycle DOM nodes between searches.
    const results = document.querySelectorAll(".search-results .result-item, .search-results .row, .result-list .result-item, .row");
    const newResults = Array.from(results).filter((row) => !row.hasAttribute("bt-enhanced"));

    results.forEach((row: Element) => {
      const typedRow = row as HTMLElement;
      this.enablePoe2CopyButton(typedRow);
      this.syncCoeButton(typedRow);
      this.injectEquivalentPricing(typedRow);
      this.enhanceMagebloodLegacy(typedRow);

      if (typedRow.hasAttribute("bt-enhanced")) {
        return;
      }

      typedRow.setAttribute("bt-enhanced", "true");
      this.highlightStats(typedRow);
      this.checkMaximumSockets(typedRow);
    });
  }

  private enablePoe2CopyButton(row: HTMLElement) {
    if (tradeLocationService.current.version !== "2") return;

    const copyButton = row.querySelector<HTMLButtonElement>(".left > button.copy");
    if (!copyButton) return;

    experimentalSettings.applyPoe2CopyButton(copyButton);
  }

  private syncCoeButton(row: HTMLElement) {
    const left = row.querySelector<HTMLElement>(".left");
    if (!left) return;

    const searchByButton = left.querySelector<HTMLButtonElement>("button.searchBy");
    let button = left.querySelector<HTMLButtonElement>("button.bt-copy-coe");
    if (!experimentalSettings.isCoeVisible()) {
      button?.remove();
      return;
    }

    if (button) {
      this.syncCoeButtonUnsupportedState(button, row);
      if (searchByButton) this.positionCoeButton(button, searchByButton);
      return;
    }

    button = document.createElement("button");
    button.type = "button";
    button.className = "bt-copy-coe";
    button.setAttribute("aria-label", "Copy for Craft of Exile");
    this.syncCoeButtonUnsupportedState(button, row);
    
    const image = document.createElement("img");
    image.src = coeButtonImage;
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    button.appendChild(image);
    if (searchByButton) {
      searchByButton.insertAdjacentElement("afterend", button);
      this.positionCoeButton(button, searchByButton);
    } else {
      left.appendChild(button);
    }
  }

  private syncCoeButtonUnsupportedState(button: HTMLButtonElement, row: HTMLElement) {
    const unsupported = hasUnsupportedCraftOfExileMod(row);
    button.classList.toggle("bt-copy-coe--disabled", unsupported);
    button.setAttribute("aria-disabled", unsupported ? "true" : "false");
    button.title = unsupported
      ? "Craft of Exile can't import this item yet (Prefix/Suffix Modifier mods)."
      : "Copy for Craft of Exile";
  }

  private positionCoeButton(button: HTMLButtonElement, searchByButton: HTMLButtonElement) {
    const searchStyle = window.getComputedStyle(searchByButton);
    const searchLeft = Number.parseFloat(searchStyle.left);
    const searchWidth = Number.parseFloat(searchStyle.width);

    if (Number.isFinite(searchLeft) && Number.isFinite(searchWidth)) {
      button.style.left = `${searchLeft + searchWidth}px`;
    }

    if (searchStyle.bottom !== "auto") {
      button.style.top = "auto";
      button.style.bottom = searchStyle.bottom;
    } else if (searchStyle.top !== "auto") {
      button.style.top = searchStyle.top;
      button.style.bottom = "auto";
    }
  }

  private refreshEquivalentPricing() {
    const results = document.querySelectorAll(".search-results .result-item, .search-results .row, .result-list .result-item, .row");
    results.forEach((row) => this.injectEquivalentPricing(row as HTMLElement));
  }

  private highlightStats(row: HTMLElement) {
    if (this.statNeedles.length === 0) return;

    const mods = row.querySelectorAll(".explicitMod, .pseudoMod, .implicitMod, .item-mod");
    mods.forEach((mod) => {
        const element = mod as HTMLElement;
        const text = element.textContent || "";
        if (this.statNeedles.some(n => n.test(text))) {
            element.classList.add("bt-highlight-stat-filters");
        }
    });
  }

  private enhanceMagebloodLegacy(row: HTMLElement) {
    if (!this.showMagebloodLegacyDescriptions) {
      this.removeMagebloodLegacyDescriptions(row);
      return;
    }

    this.removeMagebloodLegacyDescriptions(row);

    const legacies: MagebloodLegacy[] = [];
    const duplicateMods: HTMLElement[] = [];
    let duplicatePercent = 0;

    row.querySelectorAll<HTMLElement>('.item-mod [data-field^="stat."]').forEach((valueSpan) => {
      const inner = valueSpan.querySelector<HTMLElement>("span") || valueSpan;
      const text = (inner.textContent || "").replace(/\s+/g, " ").trim();
      const field = valueSpan.dataset.field || "";
      const mod = valueSpan.closest<HTMLElement>(".item-mod");

      const legacyFieldMatch = field.match(MAGEBLOOD_LEGACY_FIELD_PATTERN);
      if (legacyFieldMatch) {
        const key = MAGEBLOOD_LEGACY_VARIANTS[legacyFieldMatch[1]];
        if (mod && key) {
          legacies.push({ mod, key, title: text });
        }
        return;
      }

      const legacyMatch = text.match(MAGEBLOOD_LEGACY_PATTERN);
      if (legacyMatch) {
        if (mod) {
          const name = legacyMatch[1].trim();
          legacies.push({
            mod,
            key: normalizeMagebloodLegacyKey(name),
            title: text
          });
        }
        return;
      }

      const duplicateMatch = text.match(MAGEBLOOD_DUPLICATE_PATTERN);
      if (field === MAGEBLOOD_DUPLICATE_FIELD || duplicateMatch) {
        if (mod) duplicateMods.push(mod);
        const percentMatch = text.match(/(\d+)%/);
        duplicatePercent = Number.parseInt(
          percentMatch?.[1] || duplicateMatch?.[1] || duplicateMatch?.[2] || "0",
          10
        );
      }
    });

    if (legacies.length === 0) return;

    const counts: Record<string, number> = {};
    const displayTitles: Record<string, string> = {};
    legacies.forEach(({ key, title }) => {
      counts[key] = (counts[key] || 0) + 1;
      displayTitles[key] = title;
    });

    const duplicates = legacies.length - Object.keys(counts).length;
    const duplicateMod = duplicateMods[0] || null;
    const multiplier = duplicateMod && Number.isFinite(duplicatePercent)
      ? 1 + (duplicatePercent / 100) * duplicates
      : 1;
    const increasedEffect = Math.round((multiplier - 1) * 100);

    legacies.forEach(({ mod }) => mod.classList.add(MAGEBLOOD_LEGACY_CLASS));

    if (!row.querySelector(`.${MAGEBLOOD_EXPLANATIONS_CLASS}`)) {
      const explanationAnchor = this.findMagebloodExplanationAnchor(row, legacies);
      const fragment = document.createDocumentFragment();
      fragment.appendChild(
        this.buildMagebloodLegacyExplanations(counts, displayTitles, multiplier, increasedEffect)
      );

      explanationAnchor?.after(fragment);
    }
  }

  private removeMagebloodLegacyDescriptions(row: HTMLElement) {
    row
      .querySelectorAll(`.${MAGEBLOOD_EXPLANATIONS_CLASS}`)
      .forEach((element) => element.remove());
    row
      .querySelectorAll(`.${MAGEBLOOD_LEGACY_CLASS}`)
      .forEach((element) => element.classList.remove(MAGEBLOOD_LEGACY_CLASS));
  }

  private createMagebloodDiv(className: string, text?: string) {
    const el = document.createElement("div");
    el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  }

  private findMagebloodExplanationAnchor(
    row: HTMLElement,
    legacies: MagebloodLegacy[]
  ) {
    const content = row.querySelector<HTMLElement>(".item-popup__content") || row;
    const flagsSeparator = content.querySelector<HTMLHRElement>('hr[name="flags"]');
    if (flagsSeparator) {
      return flagsSeparator;
    }

    const corruptedLine = Array.from(content.children).find((child) =>
      /\b(?:corrupted|corrupto)\b/i.test(child.textContent || "")
    );
    if (corruptedLine) {
      const next = corruptedLine.nextElementSibling;
      return next?.tagName.toLowerCase() === "hr"
        ? next
        : corruptedLine;
    }

    const explicitSeparator = content.querySelector<HTMLHRElement>('hr[name="explicit"]');
    if (explicitSeparator) {
      return explicitSeparator;
    }

    return legacies[legacies.length - 1]?.mod || content.lastElementChild;
  }

  private buildMagebloodLegacyExplanations(
    counts: Record<string, number>,
    displayTitles: Record<string, string>,
    multiplier: number,
    increasedEffect: number
  ) {
    const container = this.createMagebloodDiv(MAGEBLOOD_EXPLANATIONS_CLASS);
    const locale = getMagebloodLegacyLocale();
    const legacyTexts = MAGEBLOOD_LEGACY_TEXTS[locale] || MAGEBLOOD_LEGACY_TEXTS.en;
    const baseLabel = getMagebloodLegacyBaseLabel(locale);
    const effectLabel = getMagebloodLegacyEffectLabel(locale);

    Object.keys(counts).forEach((key) => {
      const titleText = displayTitles[key] || `Legacy of ${titleCaseLegacyName(key)}`;
      const effect = MAGEBLOOD_LEGACY_EFFECTS[key];
      const templates = legacyTexts[key] || MAGEBLOOD_LEGACY_TEXTS.en[key];
      const block = document.createElement("div");
      const title = document.createElement("span");
      title.style.color = "var(--colour-augmented)";
      title.textContent = titleText;
      block.appendChild(title);

      if (!effect || !templates) {
        block.appendChild(document.createElement("br"));
        block.appendChild(document.createTextNode("Effect not in the database yet."));
        container.appendChild(block);
        return;
      }

      effect.stats.forEach(([base], index) => {
        const template = templates[index] || MAGEBLOOD_LEGACY_TEXTS.en[key]?.[index];
        if (!template) return;

        const final = multiplier > 1.0001 ? Math.floor(base * multiplier) : base;
        const value = formatMagebloodLegacyLine(template, final);
        const line = document.createElement("span");
        line.className = "bt-mb-explanation-line";
        line.textContent = value;
        if (multiplier > 1.0001) {
          const detail = document.createElement("span");
          detail.className = "bt-mb-explanation-detail";
          detail.textContent = ` (${baseLabel}: ${base}, +${increasedEffect}% ${effectLabel})`;
          line.appendChild(detail);
        }
        block.appendChild(document.createElement("br"));
        block.appendChild(line);
      });

      templates.slice(effect.stats.length).forEach((line) => {
        block.appendChild(document.createElement("br"));
        block.appendChild(document.createTextNode(line));
      });

      container.appendChild(block);
    });

    return container;
  }

  private refreshMagebloodLegacyDescriptions() {
    const results = document.querySelectorAll(".search-results .result-item, .search-results .row, .result-list .result-item, .row");
    results.forEach((row) => this.enhanceMagebloodLegacy(row as HTMLElement));
  }



  private checkMaximumSockets(row: HTMLElement) {
    if (tradeLocationService.current.version !== "1") return;

    const ilvlEl = row.querySelector('.item-property [data-field="ilvl"], [data-field="ilvl"], .itemLevel');
    const ilvlMatch = ilvlEl?.textContent?.match(/(\d+)/);
    if (!ilvlMatch) return;
    const ilvl = parseInt(ilvlMatch[0], 10);

    const socketsCount = row.querySelectorAll(".sockets .socket").length;
    if (socketsCount === 0) return;

    const iconImg = row.querySelector(".icon img") as HTMLImageElement;
    const iconSrc = iconImg?.src || "";
    let type = ItemResultsType.UNKNOWN;
    if (/\/BodyArmours\//.test(iconSrc)) type = ItemResultsType.ARMOR;
    else if (/\/OneHandWeapons\/|\/TwoHandWeapons\//.test(iconSrc)) type = ItemResultsType.WEAPON;

    if (type !== ItemResultsType.ARMOR) return;

    const threshold = ILVL_THRESHOLDS.find(t => ilvl <= t.ilvl);
    if (!threshold) return;

    if (threshold.maxSockets > socketsCount) {
        const rendered = row.querySelector(".itemRendered");
        if (rendered) {
            const warning = document.createElement("div");
            warning.className = "bt-maximum-sockets-warning";
            warning.style.color = "#ff4444";
            warning.style.fontSize = "12px";
            warning.style.textAlign = "center";
            warning.style.padding = "4px";
            warning.style.background = "rgba(0,0,0,0.8)";
            warning.style.border = "1px solid #ff4444";
            warning.innerText = `⚠ Max sockets for ilvl ${ilvl} is ${threshold.maxSockets}`;
            rendered.prepend(warning);
        }
    }
  }


}

export const itemResultsService = new ItemResultsService();
