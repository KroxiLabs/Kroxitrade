const childProcess = require("child_process");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const outputPath = path.join(root, "lib", "data", "whats-new.ts");

const run = (command) =>
  childProcess.execSync(command, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "pipe"]
  }).trim();

const escapeString = (value) =>
  value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const sentenceCase = (value) => {
  const trimmed = value.trim().replace(/\.$/, "");
  if (!trimmed) return "";
  return `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}.`;
};

const cleanSubject = (subject) => {
  const conventional = subject.match(/^(feat|fix|perf|refactor|docs|test|build|ci|chore|style)(?:\([^)]+\))?!?:\s+(.+)$/i);
  const raw = conventional ? conventional[2] : subject;
  return sentenceCase(raw.replace(/^Merge .+$/i, "").trim());
};

const getType = (subject) => {
  const conventional = subject.match(/^(\w+)(?:\([^)]+\))?!?:\s+/i);
  if (conventional) return conventional[1].toLowerCase();

  if (/^(add|show|enable|support|create|introduce)\b/i.test(subject)) return "feat";
  if (/^(fix|harden|correct|repair)\b/i.test(subject)) return "fix";
  if (/^(refine|improve|persist|split|refactor|format|return|remove)\b/i.test(subject)) return "refactor";
  return "chore";
};

const getLatestTag = () => {
  try {
    return run("git describe --tags --abbrev=0 --match \"v*\"");
  } catch {
    return "";
  }
};

const latestTag = getLatestTag();
const range = latestTag ? `${latestTag}..HEAD` : "HEAD";
const subjects = run(`git log ${range} --pretty=format:%s`)
  .split(/\r?\n/)
  .map((line) => line.trim())
  .filter(Boolean)
  .filter((line) => !/^Merge\b/i.test(line));

const sections = [
  { titleKey: "whatsNew.section.features", types: new Set(["feat"]), items: [] },
  { titleKey: "whatsNew.section.fixes", types: new Set(["fix", "perf"]), items: [] },
  { titleKey: "whatsNew.section.polish", types: new Set(["refactor"]), items: [] }
];

for (const subject of subjects) {
  const item = cleanSubject(subject);
  if (!item) continue;

  const type = getType(subject);
  const section = sections.find((candidate) => candidate.types.has(type));
  if (section) section.items.push(item);
}

const visibleSections = sections
  .map(({ titleKey, items }) => ({ titleKey, items: [...new Set(items)].slice(0, 8) }))
  .filter((section) => section.items.length > 0);

const generated = `export interface WhatsNewSection {
  titleKey: string;
  items: string[];
}

export interface WhatsNewEntry {
  version: string;
  date: string;
  sections: WhatsNewSection[];
}

export const latestWhatsNew: WhatsNewEntry = {
  version: "${escapeString(packageJson.version)}",
  date: "${new Date().toISOString().slice(0, 10)}",
  sections: [
${visibleSections
  .map(
    (section) => `    {
      titleKey: "${section.titleKey}",
      items: [
${section.items
  .map((item) => `        {
          title: "${escapeString(item)}",
          description: ""
        }`)
  .join(",\n")}
      ]
    }`
  )
  .join(",\n")}
  ]
};
`;

fs.writeFileSync(outputPath, generated);

console.log(`Generated ${path.relative(root, outputPath)} from ${subjects.length} commits${latestTag ? ` since ${latestTag}` : ""}.`);
