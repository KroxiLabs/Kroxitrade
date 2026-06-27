export interface WhatsNewItem {
  title: string;
  description: string;
}

export interface WhatsNewSection {
  titleKey: string;
  items: WhatsNewItem[];
}

export interface WhatsNewEntry {
  version: string;
  date: string;
  sections: WhatsNewSection[];
}

export const latestWhatsNew: WhatsNewEntry = {
  version: "1.0.78",
  date: "2026-06-27",
  sections: [
    {
      titleKey: "whatsNew.section.features",
      items: [
        {
          title: "What’s New is now built into the sidebar",
          description: "New releases can show a compact update prompt, plus a full release notes modal from About."
        },
        {
          title: "Craft of Exile export is easier to reach",
          description: "PoE1 and PoE2 result rows can now expose a CoE action that copies items in Craft of Exile’s advanced import format."
        },
        {
          title: "PoE2 copy support for Path of Building",
          description: "A dedicated PoE2 copy option can surface beside other result actions and copy item text ready for PoB."
        },
        {
          title: "Equivalent pricing works across both games",
          description: "poe.ninja ratios now support PoE1 and PoE2 so chaos/divine conversion stays useful on either trade site."
        },
        {
          title: "Result-action visibility can be tested in dev builds",
          description: "Development builds include a toggle for keeping result actions visible while tuning hover behavior."
        }
      ]
    },
    {
      titleKey: "whatsNew.section.fixes",
      items: [
        {
          title: "More reliable background messaging",
          description: "Background requests and bulk seller caching now handle failure cases more defensively."
        },
        {
          title: "Cleaner typecheck and CI surface",
          description: "Type errors were fixed, dead code was removed, and noisy logs were trimmed from the build."
        },
        {
          title: "Finer Filters hover behavior is smoother",
          description: "Compact result layouts and item filter buttons now behave more consistently."
        },
        {
          title: "Extension dependencies were hardened",
          description: "Dependency overrides and validation changes reduce known package and request risks."
        }
      ]
    },
    {
      titleKey: "whatsNew.section.polish",
      items: [
        {
          title: "Settings now respect the active trade version",
          description: "PoE1 and PoE2 can keep separate result-tool preferences where that matters."
        },
        {
          title: "Bookmark folders remember their open state",
          description: "Expanded and collapsed folders persist more predictably across sessions."
        },
        {
          title: "History labels and trade URLs are cleaner",
          description: "League names, fallbacks, and trade-link handling received small consistency improvements."
        },
        {
          title: "Result cards are easier to use",
          description: "Card click handling and seller panel accessibility were tightened for repeated trade workflows."
        }
      ]
    }
  ]
};
