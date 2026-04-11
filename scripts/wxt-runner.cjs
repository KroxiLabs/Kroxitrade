const { spawn, spawnSync } = require("child_process")

const args = process.argv.slice(2)

if (args.length === 0) {
  console.error("Usage: node scripts/wxt-runner.cjs <wxt-args...>")
  process.exit(1)
}

const child = spawn(
  process.execPath,
  ["node_modules/wxt/bin/wxt.mjs", ...args],
  {
    cwd: process.cwd(),
    stdio: ["inherit", "pipe", "pipe"],
    windowsHide: true
  }
)

let sawSuccess = false
let settled = false
let successTimer = null

const clearSuccessTimer = () => {
  if (successTimer) {
    clearTimeout(successTimer)
    successTimer = null
  }
}

const killTree = () => {
  if (process.platform === "win32") {
    spawnSync("taskkill", ["/PID", String(child.pid), "/T", "/F"], {
      stdio: "ignore",
      windowsHide: true
    })
    return
  }

  try {
    process.kill(child.pid, "SIGTERM")
  } catch {}
}

const finish = (code) => {
  if (settled) return
  settled = true
  clearSuccessTimer()
  process.exit(code)
}

const scheduleSuccessExit = () => {
  if (process.platform !== "win32" || !sawSuccess || settled) {
    return
  }

  clearSuccessTimer()
  successTimer = setTimeout(() => {
    killTree()
    finish(0)
  }, 1200)
}

const handleChunk = (stream, chunk) => {
  const text = chunk.toString()
  stream.write(text)

  if (text.includes("Finished in")) {
    sawSuccess = true
    scheduleSuccessExit()
  }
}

child.stdout.on("data", (chunk) => handleChunk(process.stdout, chunk))
child.stderr.on("data", (chunk) => handleChunk(process.stderr, chunk))

child.on("error", () => finish(1))
child.on("exit", (code) => finish(code ?? 1))

process.on("SIGINT", () => {
  killTree()
  finish(130)
})

process.on("SIGTERM", () => {
  killTree()
  finish(143)
})
