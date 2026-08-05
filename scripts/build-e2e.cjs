const { spawnSync } = require("child_process")

const result = spawnSync(process.execPath, ["scripts/wxt-runner.cjs", "build"], {
  cwd: process.cwd(),
  env: { ...process.env, POETRADEPLUS_E2E: "1" },
  stdio: "inherit",
  windowsHide: true
})

process.exit(result.status ?? 1)
