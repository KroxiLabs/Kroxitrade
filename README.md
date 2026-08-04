<div align="center">
  <img src="assets/logo.webp" alt="Poe Trade Plus Logo" width="120" />
  <h1>Poe Trade Plus Companion</h1>
  <p><em>Browser extension for a faster, cleaner Path of Exile Trade workflow</em></p>
  
  <a href="https://chromewebstore.google.com/detail/poe-trade-plus/igofmcebdienfacijkhdppcfiglcbffb">
    <img src="assets/chrome-button.webp" alt="Available in the Chrome Web Store" style="height:85px; width:auto;" />
  </a>
  <a href="https://addons.mozilla.org/en-US/firefox/addon/poe-trade-plus/" target="_blank" rel="noreferrer">
    <img src="assets/firefox-addon-badge.png" alt="Available on Firefox Add-ons" style="height:85px; width:auto;" />
  </a>
</div>

---

**Poe Trade Plus** is a browser extension that injects a native companion sidebar into the official Path of Exile trade site. It combines bookmark management, search history, search-result enhancements, and quality-of-life trading tools in a single Svelte + TypeScript extension built with WXT.

The project currently focuses on making recurring trade searches easier to save, revisit, compare, and navigate without leaving the official site.

## Features

### 📌 Bookmark management

- Organize saved searches into folders aware of the active Path of Exile trade version.
- Create, rename, archive, restore, duplicate, and reorder folders or saved searches instantly.
- Drag and drop folders and bookmarks for fast organization.
- Group saved searches into optional categories inside each folder.
- Choose Classic, Compact, or Minimal bookmark layouts, with actions configured per layout.
- Open one saved search or a whole folder in background tabs with middle-click.
- Saved searches follow the active trade tab's realm and league, with the original league kept as a fallback.
- Browse grouped Path of Exile 1 and 2 folder icons for currencies, classes, ascendancies, and more.
- Import and export individual folders as portable backup strings.
- Create a full extension backup for folders, searches, settings, and preferences, then restore it elsewhere.
- Restore legacy folder-only `.txt` backups.

### ⏱️ Search history

- Automatically track visited trade searches.
- Return to previous queries with one click.
- Update the active trade tab instead of opening extra windows.
- Keep Path of Exile 1 and 2 history separate for cleaner navigation.

### 🎨 Smart result enhancements

- Show live chaos/divine price equivalents from `poe.ninja` for Path of Exile 1 and 2.
- Highlight active stat filters directly in search results.
- Adjust quick filters, including a shortcut to clear Buyout Price.
- Show socket breakpoint warnings for armour items.
- Enable the optional Pinned Items tab to keep results from the current search close at hand and jump back to them with one click.
- Clear pins automatically when a new search starts or the page reloads, so the list never carries stale results.
- Use integrated Finer Filters for fast stat modifications.
- Open matching Path of Exile 1 and 2 Wiki pages for unique items.
- Show optional Mageblood Legacy descriptions for Path of Exile 2 in supported interface languages.
- Copy supported Path of Exile 1 and 2 items in Craft of Exile's advanced import format.
- Optionally include desecrated modifiers in Craft of Exile exports.
- Use the optional Path of Exile 2 copy helper for Path of Building workflows.

### ⚙️ Sidebar, popup, and customization

- Use a resizable sidebar that adapts the trade-site layout.
- Dock the panel on the left or right, or minimize it to a floating pill.
- Persist sidebar width, position, text size, language, and result-tool preferences.
- Choose Small, Medium, Large, or Extra interface text.
- Configure Quick Filter Presets in the sidebar or directly above the trade site's Stat Filters.
- Find setup help and the onboarding tutorial from About.
- Open grouped popup shortcuts for popular Path of Exile tools and reference sites.

### 🔄 Browser Sync and storage

- Sync bookmarks, bookmark folders, and extension settings between installations signed into the same browser profile.
- Safely migrate existing bookmark and settings data when updating.
- Compact and chunk synced data to stay within browser Sync storage limits.
- Keep search history and other high-volume data local to the browser.

### 🌍 Supported trade sites and languages

- Global: `pathofexile.com`.
- Localized trade sites: BR, RU, TH, DE, FR, ES, JP, and Taiwan.
- Kakao Games: `poe.kakaogames.com` and `poe2.kakaogames.com`.
- Interface languages: English, Portuguese, Russian, Thai, German, French, Spanish, Japanese, Korean, Simplified Chinese, and Traditional Chinese.
- Chinese Trade translation supports the international PoE1 trade site and Taiwan server, using bundled local dictionaries.

### 💿 Data privacy

- No Poe Trade Plus account, tracking, analytics, or application-owned data server.
- Saved-search data stays in browser storage; when browser Sync is enabled, bookmarks and settings use the browser's built-in Sync service.
- `poe.ninja` is read for optional price ratios. When Chinese Trade translation is enabled, the extension also retrieves official Path of Exile Trade metadata needed for that feature.
- External reference sites open only when you choose them.
- Full source code is available on GitHub.

## Tech Stack

- **WXT** for browser extension structure and MV3 integration
- **Svelte 5** for the injected UI, using runes mode
- **TypeScript** for extension and domain logic
- **CSS** for theming and trade-site layout enhancements
- **Chrome Extension APIs** for storage, tab coordination, and background requests

## Project Structure

```text
entrypoints/         WXT entrypoints for popup, background, and content scripts
assets/              Branding assets and imported media
components/          Svelte UI components and panel pages
contents/            Shared content-script logic and mounted Svelte app
lib/services/        Bookmarks, trade tracking, settings, result enhancements, poe.ninja
lib/background.ts    Background bridge logic used by the WXT background entrypoint
lib/styles/          Base and enhancement styles for the site and sidebar
lib/types/           Shared TypeScript models
lib/utilities/       Small helpers for URLs, IDs, clipboard, dates, and parsing
public/              Static extension assets copied as-is into the bundle
scripts/             Build/version helper scripts
components/pages/Popup.svelte  Shared popup Svelte component
wxt.config.ts        WXT build and manifest configuration
```

See `docs/ARCHITECTURE.md` for a deeper architectural overview, `docs/EXTENSION-BEST-PRACTICES.md` for the project's engineering guidelines, and `docs/DEPENDENCY-AUDIT.md` for the direct-dependency audit.

## Development

### Requirements

- Node.js
- pnpm

### Install dependencies

```bash
pnpm install
```

### Run development build

```bash
pnpm dev
```

Load the generated development output from `build/chrome-mv3` in your browser's extensions page.

### Production build

```bash
pnpm build
```

The unpacked production extensions are generated in `build/chrome-mv3` and `build/firefox-mv2`.

### Package the extension

```bash
pnpm package
```

This command creates browser-specific zip files in `build/`, such as `poe-trade-plus-1.0.70-chrome.zip` and `poe-trade-plus-1.0.70-firefox.zip`.

### Release notes and What's New

Poe Trade Plus shows a small "What's New" prompt after a user updates to a new extension version. The prompt is handled in `components/Layout.svelte`, stores the last seen version in local storage, and opens the release notes modal from `components/WhatsNewDialog.svelte`.

Release note content is kept in `lib/data/whats-new.ts`. Generate it before publishing a release so the in-app modal matches the version being packaged.

Recommended commit style for release notes:

```text
feat(bookmarks): add compact saved-search actions
fix(history): keep PoE2 history separated
docs(readme): document release notes workflow
```

To update the in-app release notes from Git commits, run:

```bash
pnpm whats-new
```

The script reads commits since the latest `v*` tag, groups `feat:` commits as new features, `fix:` and `perf:` commits as fixes, and keeps `docs:`, `chore:`, and `build:` entries out of the user-facing What's New unless they affect users directly. It also has a fallback for existing non-conventional subjects such as `Add ...`, `Show ...`, and `Refine ...`.

## Permissions and Integrations

- `storage`: persists folders, settings, history, and cache data
- `tabs`: detects and updates the active Path of Exile trade tab
- `https://www.pathofexile.com/*`, `https://pathofexile.tw/*`, and localized Path of Exile trade hosts: injects the sidebar and trade helpers
- `https://poe2.kakaogames.com/*`: supports the Korean PoE2 trade host
- `https://poe.ninja/*`: fetches currency ratios for equivalent pricing

## Credits

This project incorporates ideas or material from:

- [better-trading](https://github.com/exile-center/better-trading)
- [poe-trade-plus](https://github.com/KroxiLabs/poe-trade-plus/)

Special Thanks: Trompetin17, Maxime B and Fuzzy for creating the original scripts that inspired this extension.

## Privacy policy

Poe Trade Plus has no account system, analytics, tracking, or application-owned data server. Saved searches, folders, settings, and preferences stay in browser storage. If browser Sync is enabled, supported bookmarks and settings use the browser's built-in Sync service; search history and other high-volume data remain local. The extension requests `poe.ninja` only for optional price ratios and official Path of Exile Trade endpoints only when needed by enabled trade features such as Chinese Trade translation.

## License

Licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for the full license text and notices.
