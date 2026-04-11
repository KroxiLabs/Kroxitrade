const { spawn } = require("node:child_process")
const path = require("node:path")

const command = process.execPath
const wxtCli = path.join(__dirname, "..", "node_modules", "wxt", "bin", "wxt.mjs")
const args = [wxtCli, "-b", "firefox", ...process.argv.slice(2)]

const child = spawn(command, args, {
  stdio: "inherit",
  env: {
    ...process.env,
    WXT_FIREFOX_MANUAL: "1"
  }
})

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})

child.on("error", (error) => {
  console.error("[wxt-firefox-dev] Failed to start WXT:", error)
  process.exit(1)
})
