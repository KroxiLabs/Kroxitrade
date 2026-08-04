# Release workflow

1. Run `pnpm run release:check`. It refreshes the official Trade snapshots and the processed Chinese dictionaries from `MooHuiDev/poe-zh-trade-tools-pro`, writes them into `data/trade-locales/` and `data/chinese-trade/`, then validates What's New. Review and commit the approved snapshots. They are bundled locally; the extension never downloads third-party dictionaries at runtime.
2. Update `package.json` version, then run `pnpm run release:check`. It confirms the active `1.x` What's New section covers every user-facing change in every language and writes the release changelog.
3. Run `pnpm run release:prepare` from `main`. It validates What's New, creates `release-vX.Y.Z`, commits current changes, runs `pnpm run package` to create Chrome, Firefox, and source ZIP assets, pushes the branch, and opens an upstream PR.
4. Merge the upstream PR.
5. Run `pnpm run release:publish -- release-vX.Y.Z`. It verifies the upstream PR merged, creates matching GitHub releases in `javijec/PoeTradePlus` and `KroxiLabs/Kroxitrade` with all three assets and the full What's New changelog, then deletes the local and origin release branch.
