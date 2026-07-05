<script lang="ts">
  import { onMount } from "svelte"
  import chartIcon from "lucide-static/icons/chart-line.svg?raw"
  import bookOpenIcon from "lucide-static/icons/book-open.svg?raw"
  import hammerIcon from "lucide-static/icons/hammer.svg?raw"
  import packageSearchIcon from "lucide-static/icons/package-search.svg?raw"
  import searchIcon from "lucide-static/icons/search.svg?raw"
  import { languageStore, setLanguage, translate, type AppLanguage } from "./lib/services/i18n"
  import { settings } from "./lib/services/settings"
  import { normalizeIcon } from "./lib/utilities/icons"

  const tradeLinks = [
    {
      href: "https://www.pathofexile.com/trade/search",
      logo: poe1Logo,
      logoAltKey: "popup.trade1Alt",
      labelKey: "popup.trade1"
    },
    {
      href: "https://www.pathofexile.com/trade2/search/poe2",
      logo: poe2Logo,
      logoAltKey: "popup.trade2Alt",
      labelKey: "popup.trade2"
    }
  ]

  const shortcutLinks: Array<{
    group: "poe1" | "poe2" | "shared"
    href: string
    icon: string
    labelKey: string
  }> = [
    {
      group: "poe1",
      href: "https://www.poewiki.net/wiki/Path_of_Exile_Wiki",
      icon: bookOpenIcon,
      labelKey: "popup.shortcut.poeWiki"
    },
    {
      group: "poe1",
      href: "https://poe.re/",
      icon: searchIcon,
      labelKey: "popup.shortcut.poeRegex"
    },
    {
      group: "poe1",
      href: "https://www.craftofexile.com/?game=poe1",
      icon: hammerIcon,
      labelKey: "popup.shortcut.craftPoe1"
    },
    {
      group: "poe1",
      href: "https://poedb.tw/us/",
      icon: packageSearchIcon,
      labelKey: "popup.shortcut.poedb"
    },
    {
      group: "poe2",
      href: "https://www.poe2wiki.net/wiki/Path_of_Exile_2_Wiki",
      icon: bookOpenIcon,
      labelKey: "popup.shortcut.poe2Wiki"
    },
    {
      group: "poe2",
      href: "https://poe2.re/",
      icon: searchIcon,
      labelKey: "popup.shortcut.poe2Regex"
    },
    {
      group: "poe2",
      href: "https://www.craftofexile.com/?game=poe2",
      icon: hammerIcon,
      labelKey: "popup.shortcut.craftPoe2"
    },
    {
      group: "poe2",
      href: "https://poe2db.tw/us/",
      icon: packageSearchIcon,
      labelKey: "popup.shortcut.poe2db"
    },
    {
      group: "shared",
      href: "https://poe.ninja/",
      icon: chartIcon,
      labelKey: "popup.shortcut.ninja"
    }
  ]

  const shortcutGroups: Array<{
    id: "poe1" | "poe2" | "shared"
    labelKey: string
  }> = [
    { id: "poe1", labelKey: "popup.shortcuts.poe1" },
    { id: "poe2", labelKey: "popup.shortcuts.poe2" },
    { id: "shared", labelKey: "popup.shortcuts.shared" }
  ]

  import poe1Logo from "./assets/logo-trade.webp?inline"
  import poe2Logo from "./assets/logo-trade2.webp?inline"

  const SHORTCUTS_VISIBLE_KEY = "popup-shortcuts-visible"
  const TEXT_SIZE_SCALE = {
    small: "0.92",
    medium: "1",
    large: "1.18"
  } as const
  let showShortcuts = $state(false)

  function applyTextSize(textSize: keyof typeof TEXT_SIZE_SCALE) {
    document.documentElement.style.setProperty("--bt-text-scale", TEXT_SIZE_SCALE[textSize])
  }

  onMount(async () => {
    await settings.load()
    applyTextSize($settings.textSize)
    setLanguage(($settings.language || "en") as AppLanguage)
    const storedVisibility = await chrome.storage.local.get(SHORTCUTS_VISIBLE_KEY)
    showShortcuts = storedVisibility[SHORTCUTS_VISIBLE_KEY] === true
  })

  const toggleShortcuts = async () => {
    showShortcuts = !showShortcuts
    await chrome.storage.local.set({ [SHORTCUTS_VISIBLE_KEY]: showShortcuts })
  }
</script>

<svelte:head>
  <title>Poe Trade Plus</title>
</svelte:head>

<div class="popup-shell">
  <div class="hero">
    <p>{translate($languageStore, "popup.description")}</p>
  </div>

  <div class="trade-grid">
    {#each tradeLinks as link}
      <a class="trade-link" href={link.href} target="_blank" rel="noreferrer">
        <span class="trade-link__logo-wrap">
          <img class="trade-link__logo" src={link.logo} alt={translate($languageStore, link.logoAltKey)} />
        </span>
        <span class="trade-link__label">{translate($languageStore, link.labelKey)}</span>
      </a>
    {/each}
  </div>

  <div class="shortcut-panel" aria-label={translate($languageStore, "popup.shortcuts")}>
    <div class="section-header">
      <div class="section-title">{translate($languageStore, "popup.shortcuts")}</div>
      <button
        type="button"
        class="shortcut-toggle"
        aria-expanded={showShortcuts}
        onclick={toggleShortcuts}
      >
        {translate($languageStore, showShortcuts ? "popup.hideShortcuts" : "popup.showShortcuts")}
      </button>
    </div>

    {#if showShortcuts}
      <div class="shortcut-groups">
        {#each shortcutGroups as group}
          <section class="shortcut-group" aria-label={translate($languageStore, group.labelKey)}>
            <div class="shortcut-group__title">{translate($languageStore, group.labelKey)}</div>
            <div class="shortcut-grid">
              {#each shortcutLinks.filter((shortcut) => shortcut.group === group.id) as shortcut}
                <a
                  class="shortcut-button"
                  href={shortcut.href}
                  target="_blank"
                  rel="noreferrer"
                  title={translate($languageStore, shortcut.labelKey)}
                >
                  <span class="shortcut-button__icon" aria-hidden="true">
                    {@html normalizeIcon(shortcut.icon, { size: 15, className: "shortcut-svg" })}
                  </span>
                  <span class="shortcut-button__label">{translate($languageStore, shortcut.labelKey)}</span>
                </a>
              {/each}
            </div>
          </section>
        {/each}
      </div>
    {/if}
  </div>
</div>

<style>
  :global(html) {
    width: 388px;
    min-width: 388px;
    max-width: 388px;
    background:
      radial-gradient(circle at top left, rgba(184, 124, 52, 0.18), transparent 38%),
      linear-gradient(180deg, #0f0d0b 0%, #070707 100%);
  }

  :global(body) {
    margin: 0;
    width: 388px;
    min-width: 388px;
    max-width: 388px;
    background:
      radial-gradient(circle at top left, rgba(184, 124, 52, 0.18), transparent 38%),
      linear-gradient(180deg, #0f0d0b 0%, #070707 100%);
    color: #f0dfbd;
    font-family: Georgia, "Times New Roman", serif;
    box-sizing: border-box;
  }

  :global(#app) {
    width: 388px;
    min-width: 388px;
    max-width: 388px;
    box-sizing: border-box;
  }

  .popup-shell {
    padding: 14px;
    box-sizing: border-box;
  }

  .hero {
    margin-bottom: 10px;
    padding: 10px 12px;
    border: 1px solid rgba(173, 132, 72, 0.18);
    background: linear-gradient(180deg, rgba(23, 20, 17, 0.9), rgba(12, 11, 10, 0.95));
  }

  p {
    margin: 0;
    color: #bca887;
    font-size: calc(11px * var(--bt-text-scale, 1));
    line-height: 1.45;
  }

  .trade-grid {
    display: flex;
    gap: 8px;
  }

  .trade-link {
    flex: 1 1 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 10px;
    border: 1px solid rgba(188, 145, 77, 0.16);
    background: linear-gradient(180deg, rgba(24, 21, 18, 0.94), rgba(14, 13, 12, 0.98));
    color: inherit;
    text-decoration: none;
    transition:
      border-color 120ms ease,
      background 120ms ease,
      transform 120ms ease;
  }

  .trade-link:hover,
  .trade-link:focus-visible {
    transform: translateY(-1px);
    border-color: rgba(238, 199, 130, 0.32);
    background: linear-gradient(180deg, rgba(31, 27, 22, 0.96), rgba(16, 15, 13, 0.99));
    outline: none;
  }

  .trade-link__logo-wrap {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    width: 100%;
  }

  .trade-link__logo {
    display: block;
    height: 30px;
    width: auto;
    object-fit: contain;
    max-width: 100%;
  }

  .trade-link__label {
    display: block;
    color: #f1e1bf;
    font-size: calc(12px * var(--bt-text-scale, 1));
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-align: center;
  }

  .shortcut-panel {
    margin-top: 10px;
    padding: 10px;
    border: 1px solid rgba(188, 145, 77, 0.14);
    background: rgba(9, 8, 7, 0.62);
  }

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .section-title {
    color: #bca887;
    font-size: calc(11px * var(--bt-text-scale, 1));
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .shortcut-toggle {
    flex: 0 0 auto;
    height: 24px;
    padding: 0 8px;
    border: 1px solid rgba(188, 145, 77, 0.18);
    border-radius: 4px;
    background: rgba(24, 21, 18, 0.72);
    color: #d9c79f;
    cursor: pointer;
    font: inherit;
    font-size: calc(10px * var(--bt-text-scale, 1));
    line-height: 1;
  }

  .shortcut-toggle:hover,
  .shortcut-toggle:focus-visible {
    border-color: rgba(238, 199, 130, 0.36);
    color: #f1e1bf;
    outline: none;
  }

  .shortcut-groups {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 8px;
  }

  .shortcut-group {
    min-width: 0;
  }

  .shortcut-group__title {
    margin-bottom: 5px;
    color: #8f8067;
    font-size: calc(9px * var(--bt-text-scale, 1));
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .shortcut-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 6px;
  }

  .shortcut-button {
    display: flex;
    min-width: 0;
    height: 36px;
    justify-content: flex-start;
    align-items: center;
    gap: 6px;
    padding: 6px 8px;
    border: 1px solid rgba(188, 145, 77, 0.14);
    border-radius: 4px;
    background: rgba(24, 21, 18, 0.84);
    color: #d9c79f;
    cursor: pointer;
    font: inherit;
    transition:
      border-color 120ms ease,
      background 120ms ease,
      color 120ms ease;
  }

  .shortcut-button:hover,
  .shortcut-button:focus-visible {
    border-color: rgba(238, 199, 130, 0.36);
    background: rgba(31, 27, 22, 0.96);
    color: #f1e1bf;
    outline: none;
  }

  .shortcut-button__icon {
    display: inline-flex;
    width: 15px;
    height: 15px;
    align-items: center;
    justify-content: center;
  }

  .shortcut-button__icon :global(.shortcut-svg) {
    display: block;
    width: 15px;
    height: 15px;
    stroke: currentColor;
    fill: none;
  }

  .shortcut-button__label {
    display: block;
    max-width: 100%;
    overflow: hidden;
    color: inherit;
    font-size: calc(11px * var(--bt-text-scale, 1));
    line-height: 1.2;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
