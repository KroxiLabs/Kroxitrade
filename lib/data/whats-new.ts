export interface WhatsNewSection {
  titleKey: string;
  itemKeys: string[];
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
      titleKey: "whatsNew.section.bookmarks",
      itemKeys: [
        "whatsNew.item.versionFolders",
        "whatsNew.item.compactActions",
        "whatsNew.item.backupRestore"
      ]
    },
    {
      titleKey: "whatsNew.section.tradeTools",
      itemKeys: [
        "whatsNew.item.bulkSellers",
        "whatsNew.item.equivalentPricing",
        "whatsNew.item.finerFilters"
      ]
    },
    {
      titleKey: "whatsNew.section.polish",
      itemKeys: [
        "whatsNew.item.onboarding",
        "whatsNew.item.resizableSidebar",
        "whatsNew.item.languages"
      ]
    }
  ]
};
