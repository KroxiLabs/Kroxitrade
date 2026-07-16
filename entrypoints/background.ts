import { registerBackgroundHandlers } from "~/lib/background"

export default defineBackground({
  type: "module",
  main() {
    registerBackgroundHandlers()
  }
})
