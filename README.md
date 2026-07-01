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

### Sidebar workflow

- **Integrated trade sidebar:** Poe Trade Plus mounts directly inside official Path of Exile trade pages, including PoE1, PoE2, and localized trade hosts.
- **Resizable layout:** the sidebar width can be adjusted and persisted locally.
- **Minimize and restore mode:** collapse the panel into a floating pill to recover screen space.
- **Left or right docking:** choose which side of the trade site the panel should live on.
- **Trade-site-aware layout shift:** the page adapts to the sidebar width so the official site remains usable.
- **Popup shortcuts:** optional grouped links for Path of Exile Wiki, Path of Exile 2 Wiki, Path of Regex, Craft of Exile, PoEDb, PoE2Db, and poe.ninja.

### Bookmarks and folders

- **Version-aware folders:** bookmarks are separated by Path of Exile trade version.
- **Folder creation and inline organization:** create, rename, expand, collapse, archive, and delete folders in place.
- **Drag and drop reordering:** reorder folders and searches without leaving the panel.
- **Per-folder import:** paste a serialized folder string and restore it instantly.
- **Full backup and restore:** export a portable `.json` file with folders, saved searches, settings, and extension preferences, then restore it in another browser.
- **Legacy backup support:** older folder-only `.txt` backups can still be restored.
- **Archived view:** switch between active and archived folders without losing saved searches.
- **PoE2 folder icons:** includes PoE2 currency, class, ascendancy, and themed folder icons.

### Search history and navigation

- **Automatic trade history:** visited searches are tracked and stored locally.
- **Active-tab integration:** reopening a saved history entry updates the current trade tab instead of spawning extra tabs.
- **Version filtering:** history entries are filtered to the currently detected trade version.

### Result enhancements

- **Equivalent pricing:** optionally show chaos and divine equivalents using live `poe.ninja` currency ratios.
- **Search-stat highlighting:** active stat filters are highlighted in the result list.
- **Socket breakpoint warnings:** armor results can display max-socket warnings based on item level.
- **Scroll back to result:** pinned-result navigation can scroll the active result list to a specific item.
- **Mageblood Legacy descriptions:** optionally show hidden PoE2 Mageblood Legacy effects below item results, including duplicate Legacy scaling.
- **Localized Mageblood support:** Mageblood Legacy detection uses stable trade stat ids and localized descriptions for English, Spanish, Portuguese, Russian, Thai, German, French, Japanese, and Korean.
- **Craft of Exile export:** copy supported PoE1 and PoE2 item results in Craft of Exile's advanced import format.
- **PoE2 copy helper:** optionally expose PoE2's native copy action for Path of Building workflows.

### Filter helpers

- **Finer Filters integration:** add or exclude modifiers directly from hovered result stats.
- **Grouped quick actions:** includes pseudo and explicit presets such as resistance/life, attack weapon, and spell weapon filters.
- **Regex-friendly search inputs:** native trade-site search inputs automatically get the `~` prefix when appropriate.

### Settings and local persistence

- **Sidebar position preference**
- **Equivalent pricing visibility toggle**
- **PoE1 and PoE2 result settings**
- **Mageblood Legacy description toggle**
- **History, bulk sellers, quick filters, Craft of Exile, and PoE2 copy toggles**
- **Persistent sidebar width**
- **Local browser storage for settings, folders, history, and extension preferences**
- **Portable full-extension backup file for moving data between browsers**
- **Ephemeral caching for `poe.ninja` currency ratios**

## Tech Stack

- **WXT** for browser extension structure and MV3 integration
- **Svelte 5** for the injected UI, using runes mode
- **TypeScript** for extension and domain logic
- **Sass** for theming and trade-site layout enhancements
- **Chrome Extension APIs** for storage, tab coordination, and background requests

## Project Structure

```text
entrypoints/         WXT entrypoints for popup, background, and content scripts
assets/              Branding assets and imported media
components/          Svelte UI components and panel pages
contents/            Shared content-script logic and mounted Svelte app
lib/services/        Bookmarks, trade tracking, settings, result enhancements, poe.ninja
lib/styles/          Base and enhancement styles for the site and sidebar
lib/types/           Shared TypeScript models
lib/utilities/       Small helpers for URLs, IDs, clipboard, dates, and parsing
public/              Static extension assets copied as-is into the bundle
scripts/             Build/version helper scripts
background.ts        Background bridge logic used by the WXT background entrypoint
popup.svelte         Shared popup Svelte component
wxt.config.ts        WXT build and manifest configuration
```

See `docs/ARCHITECTURE.md` for a deeper architectural overview if you want to explore the internal services and messaging flow.

## Development

### Requirements

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Run development build

```bash
npm run dev
```

Load the generated development output from `build/chrome-mv3` in your browser's extensions page.

### Production build

```bash
npm run build
```

This build step also runs the local version bump script before generating the final extension bundle.

The unpacked production extension is generated in `build/chrome-mv3`.

### Package the extension

```bash
npm run package
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
npm run whats-new
```

The script reads commits since the latest `v*` tag, groups `feat:` commits as new features, `fix:` and `perf:` commits as fixes, and keeps `docs:`, `chore:`, and `build:` entries out of the user-facing What's New unless they affect users directly. It also has a fallback for existing non-conventional subjects such as `Add ...`, `Show ...`, and `Refine ...`.

## Permissions and Integrations

- `storage`: persists folders, settings, history, and cache data
- `tabs`: detects and updates the active Path of Exile trade tab
- `https://www.pathofexile.com/*` and localized Path of Exile trade hosts: injects the sidebar and trade helpers
- `https://poe2.kakaogames.com/*`: supports the Korean PoE2 trade host
- `https://poe.ninja/*`: fetches currency ratios for equivalent pricing

## Credits

This project is based on or incorporates ideas/material from:

- [better-trading](https://github.com/exile-center/better-trading)
- [poe-trade-plus](https://github.com/KroxiLabs/poe-trade-plus/)

Special Thanks: Trompetin17, Maxime B and Fuzzy for creating the original scripts that inspired this extension.

## Privacy policy

We do not save nor require any data from the end user, if this extension ever uses data from a user will be saved LOCALLY and we won't have any way whatsoever to access it.

## License

Licensed under the **MIT License**.

See the [LICENSE](LICENSE) file for the full license text and notices.
