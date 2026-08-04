const fs = require("fs")
const path = require("path")

const root = path.join(__dirname, "..")
const browser = process.argv[2] || "chrome-mv3"
const buildDir = path.join(root, "build", browser)
const mib = 1024 * 1024

const limits = {
  "background.js": 6 * mib,
  "content-scripts/trade-sidebar.js": 1.5 * mib,
  "content-scripts/chinese-trade-supplement.js": 1.5 * mib,
  "content-scripts/chinese-trade-results.js": 64 * 1024
}
const totalLimit = 9.5 * mib

const sizeOf = (relativePath) => {
  const target = path.join(buildDir, relativePath)
  if (!fs.existsSync(target)) throw new Error(`Missing extension bundle: ${relativePath}`)
  return fs.statSync(target).size
}

const formatSize = (bytes) => `${(bytes / mib).toFixed(2)} MiB`

if (!fs.existsSync(buildDir)) {
  throw new Error(`Build output not found: ${buildDir}. Run the browser build first.`)
}

const failures = []
for (const [file, limit] of Object.entries(limits)) {
  const bytes = sizeOf(file)
  if (bytes > limit) failures.push(`${file}: ${formatSize(bytes)} exceeds ${formatSize(limit)}`)
}

const files = fs.readdirSync(buildDir, { recursive: true, withFileTypes: true })
const totalBytes = files
  .filter((entry) => entry.isFile())
  .reduce((total, entry) => total + fs.statSync(path.join(entry.parentPath, entry.name)).size, 0)

if (totalBytes > totalLimit) {
  failures.push(`Total extension: ${formatSize(totalBytes)} exceeds ${formatSize(totalLimit)}`)
}

if (failures.length) throw new Error(`Bundle budget failed:\n${failures.join("\n")}`)

console.log(`Bundle budget passed for ${browser}: ${formatSize(totalBytes)} total.`)
