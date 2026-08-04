# Chinese Trade localization data

This folder contains data only; translation behavior lives in
`lib/services/chinese-trade/`.

- `stat-templates.json`, `unique-names.json`, and `gem-names.json` are reviewed
  local snapshots from `MooHuiDev/poe-zh-trade-tools-pro`. Their MIT attribution
  is recorded in `THIRD_PARTY_NOTICES.md`.
- The small curated `.ts` maps are maintained by PoeTradePlus to cover official
  Trade-data gaps. Their source notes are kept beside each map so corrections
  can be reviewed as data changes instead of changing cache logic.

The installed extension reads only these bundled files and official Trade APIs.
