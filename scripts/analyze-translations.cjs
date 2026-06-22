const fs = require("fs");
const path = require("path");

const dir = path.join("lib", "services", "i18n");

function extractObjectBody(content, marker) {
  const start = content.indexOf(marker);
  if (start === -1) return null;
  const braceStart = content.indexOf("{", start);
  if (braceStart === -1) return null;

  let depth = 0;
  for (let i = braceStart; i < content.length; i++) {
    const ch = content[i];
    if (ch === "{") depth++;
    if (ch === "}") depth--;
    if (depth === 0) {
      return content.slice(braceStart + 1, i);
    }
  }

  return null;
}

function extractKeys(content, marker) {
  const body = extractObjectBody(content, marker);
  if (!body) return [];
  return [...body.matchAll(/"([^"]+)":\s/g)].map((match) => match[1]);
}

const enContent = fs.readFileSync(path.join(dir, "en.ts"), "utf8");
const enKeys = extractKeys(enContent, "englishTranslations");

const files = [
  "en.ts",
  "es.ts",
  "pt.ts",
  "de.ts",
  "fr.ts",
  "ru.ts",
  "th.ts",
  "ja.ts",
  "ko.ts"
];

for (const file of files) {
  const content = fs.readFileSync(path.join(dir, file), "utf8");
  const exportMarker = "export const ";
  const start = content.indexOf(exportMarker);
  if (start === -1) continue;

  const nameEnd = content.indexOf(":", start);
  const exportName = content.slice(start + exportMarker.length, nameEnd);
  const hasEnglishFallback = content.includes("...englishTranslations");
  const keys = extractKeys(content, exportName);
  const missing = hasEnglishFallback ? [] : enKeys.filter((key) => !keys.includes(key));

  console.log(`=== ${file} (${missing.length} MISSING) ===`);

  const groups = {};
  for (const key of missing) {
    const prefix = key.split(".")[0];
    if (!groups[prefix]) groups[prefix] = [];
    groups[prefix].push(key);
  }

  for (const [prefix, keysForPrefix] of Object.entries(groups).sort(
    (a, b) => b[1].length - a[1].length
  )) {
    console.log(`  ${prefix}: ${keysForPrefix.join(", ")}`);
  }

  console.log("");
}
