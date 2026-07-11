# Release workflow

1. Update `package.json` version, then run `npm run release:check`. It confirms the active `1.x` What's New section covers every user-facing change in every language and writes the release changelog.
2. Run `npm run release:prepare` from `main`. It validates What's New, creates `release-vX.Y.Z`, commits current changes, runs `npm run package` to create Chrome, Firefox, and source ZIP assets, pushes the branch, and opens an upstream PR.
3. Merge the upstream PR.
4. Run `npm run release:publish -- release-vX.Y.Z`. It verifies the upstream PR merged, then creates matching GitHub releases in `javijec/PoeTradePlus` and `KroxiLabs/Kroxitrade` with all three assets and the full What's New changelog.
