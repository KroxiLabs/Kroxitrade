import { registerBackgroundHandlers } from "~/background"

export default defineBackground({
  type: "module",
  main() {
    registerBackgroundHandlers()
  }
})
