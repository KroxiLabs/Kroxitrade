import type { ChineseStatTemplates } from "./stat-cache-transform"
import templates from "~/data/chinese-trade/stat-templates.json"

/**
 * Returns the reviewed local template dictionary. This module runs in the
 * extension service worker, where Vite's DOM-based dynamic-import preloader
 * is unavailable.
 */
export const loadChineseStatTemplates = () =>
  Promise.resolve(templates as ChineseStatTemplates)
