import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "tests/e2e",
  timeout: 45_000,
  retries: 0,
  workers: 1,
  reporter: "list"
})
