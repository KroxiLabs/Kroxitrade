export interface WhatsNewItem {
  title: string;
  description: string;
}

export interface WhatsNewGroup {
  titleKey: string;
  items: WhatsNewItem[];
}

export interface WhatsNewSection {
  titleKey?: string;
  title?: string;
  items?: WhatsNewItem[];
  groups?: WhatsNewGroup[];
}

export interface WhatsNewEntry {
  version: string;
  date: string;
  sections: WhatsNewSection[];
}

const version111Items: WhatsNewItem[] = [
  {
    title: "Foulborn items add the correct modifier",
    description:
      "Quick filter buttons now compensate for mutated Foulborn item rows where the trade site shifts modifier stat ids out of visual order."
  },
  {
    title: "Bookmark action buttons no longer open searches",
    description:
      "Editing, refreshing, duplicating, or opening the bookmark menu stays inside that action instead of triggering the saved search row."
  },
  {
    title: "PoE2 copy stays out of PoE1",
    description:
      "The Path of Building copy option is now only shown on the PoE2 trade site."
  },
  {
    title: "Craft of Exile buttons keep their shape",
    description:
      "The CoE action button is now a centered 30px square so it aligns cleanly with the result row controls."
  },
  {
    title: "Craft of Exile copy avoids unsupported modifier slots",
    description:
      "Items with Prefix/Suffix Modifier allowed affixes now show a greyed CoE button with an explanation, while Copy for PoB keeps working."
  },
  {
    title: "Version-specific settings are clearer",
    description:
      "PoE1 and PoE2 can keep separate result-tool preferences where that matters, and PoE2-only tools stay hidden on PoE1."
  }
];

const version112Features: WhatsNewItem[] = [
  {
    title: "External reference links in the popup",
    description:
      "The popup can now show grouped PoE1 and PoE2 shortcuts for the official trade-adjacent tools, including the Path of Exile Wiki, Path of Exile 2 Wiki, Path of Regex, Craft of Exile, PoEDb, PoE2Db, and poe.ninja."
  },
  {
    title: "New PoE2 bookmark folder icons",
    description:
      "Disciple of Varashta, Martial Artist, and Spirit Walker icons are available for PoE2 bookmark folders."
  },
  {
    title: "Mageblood Legacy descriptions for PoE2",
    description:
      "A new Results setting can show hidden Mageblood Legacy effects below PoE2 item results, including duplicate Legacy scaling."
  }
];

const version112Fixes: WhatsNewItem[] = [
  {
    title: "Localized PoE2 trade links load correctly",
    description:
      "Bookmarks and helper panels now recognize localized trade2 hosts such as es.pathofexile.com and keep league URLs with spaces encoded correctly."
  },
  {
    title: "Mageblood Legacy works across languages",
    description:
      "Legacy detection now uses stable trade stat ids, with localized effect descriptions for English, Spanish, Portuguese, Russian, Thai, German, French, Japanese, and Korean."
  }
];

const version112Polish: WhatsNewItem[] = [
  {
    title: "Mageblood details stay quiet until hover",
    description:
      "Legacy descriptions show the final value by default, while base value and duplicate effect details appear inline on hover."
  },
  {
    title: "Mageblood descriptions match item layout",
    description:
      "Legacy description blocks now sit below corrupt/explicit separators like native notable descriptions and stay out of copied item text."
  }
];

const version113Items: WhatsNewItem[] = [
  {
    title: "Full extension backup",
    description:
      "Backup files now include saved folders, searches, global settings, PoE1/PoE2 result settings, and extension preferences in one portable JSON file."
  },
  {
    title: "Old folder backups still restore",
    description:
      "The restore action still accepts older folder-only .txt exports, so existing backups remain usable."
  }
];

const version114Items: WhatsNewItem[] = [
  {
    title: "Adjustable text size",
    description:
      "Interface settings now include Small, Medium, Large, and Extra text sizes, with Medium matching the previous default."
  },
  {
    title: "Tutorial access moved to About",
    description:
      "The button to reopen the onboarding tutorial now lives in About, keeping Interface settings focused on display and language options."
  }
];

const version110Features: WhatsNewItem[] = [
  {
    title: "Settings are now easier to navigate",
    description:
      "Customization is grouped into Interface, Sidebar, Results, and Bookmarks so each option has a clearer home."
  },
  {
    title: "Bookmark Layout now has a live preview",
    description:
      "The Bookmarks settings tab shows a real-time saved-search preview using the same action menu as the actual bookmark list."
  },
  {
    title: "What's New is now built into the sidebar",
    description:
      "New releases can show a compact update prompt, plus a full release notes modal from About."
  },
  {
    title: "Quick Filter Presets can live where you work",
    description:
      "Enable them from Results settings, then choose whether they appear in the sidebar or directly above the trade site's Stat Filters."
  },
  {
    title: "Craft of Exile export is easier to reach",
    description:
      "PoE1 and PoE2 result rows can now expose a CoE action that copies items in Craft of Exile's advanced import format."
  },
  {
    title: "PoE2 copy support for Path of Building",
    description:
      "A dedicated PoE2 copy option can surface beside other result actions and copy item text ready for PoB."
  },
  {
    title: "Equivalent pricing works across both games",
    description:
      "poe.ninja ratios now support PoE1 and PoE2 so chaos/divine conversion stays useful on either trade site."
  }
];

const version110Fixes: WhatsNewItem[] = [
  {
    title: "More reliable background messaging",
    description:
      "Background requests and bulk seller caching now handle failure cases more defensively."
  },
  {
    title: "Finer Filters hover behavior is smoother",
    description:
      "Compact result layouts and item filter buttons now behave more consistently."
  },
  {
    title: "Bookmark text opens saved searches again",
    description:
      "Clicking the saved-search title now opens the bookmark instead of being ignored."
  },
  {
    title: "Extension dependencies were hardened",
    description:
      "Dependency overrides and validation changes reduce known package and request risks."
  }
];

const version110Changes: WhatsNewItem[] = [
  {
    title: "Sidebar and result options were separated",
    description:
      "Visible sidebar modules now live under Sidebar, while injected trade-result tools stay under Results."
  },
  {
    title: "Add To Filters moved out of the sidebar by default",
    description:
      "Quick filter presets can now be injected into the trade page, keeping the sidebar focused on navigation and saved searches."
  },
  {
    title: "Bookmark folders remember their open state",
    description:
      "Expanded and collapsed folders persist more predictably across sessions."
  },
  {
    title: "History labels and trade URLs are cleaner",
    description:
      "League names, fallbacks, and trade-link handling received small consistency improvements."
  },
  {
    title: "Result cards are easier to use",
    description:
      "Card click handling and seller panel accessibility were tightened for repeated trade workflows."
  }
];

export const latestWhatsNew: WhatsNewEntry = {
  version: "1.1.4",
  date: "2026-07-05",
  sections: [
    {
      title: "1.1.4",
      groups: [
        {
          titleKey: "whatsNew.section.features",
          items: version114Items
        }
      ]
    },
    {
      title: "1.1.3",
      groups: [
        {
          titleKey: "whatsNew.section.features",
          items: version113Items
        }
      ]
    },
    {
      title: "1.1.2",
      groups: [
        {
          titleKey: "whatsNew.section.features",
          items: version112Features
        },
        {
          titleKey: "whatsNew.section.fixes",
          items: version112Fixes
        },
        {
          titleKey: "whatsNew.section.polish",
          items: version112Polish
        }
      ]
    },
    {
      title: "1.1.1",
      groups: [
        {
          titleKey: "whatsNew.section.fixes",
          items: version111Items.slice(0, 4)
        },
        {
          titleKey: "whatsNew.section.polish",
          items: version111Items.slice(4)
        }
      ]
    },
    {
      title: "1.1.0",
      groups: [
        {
          titleKey: "whatsNew.section.features",
          items: version110Features
        },
        {
          titleKey: "whatsNew.section.polish",
          items: version110Changes
        },
        {
          titleKey: "whatsNew.section.fixes",
          items: version110Fixes
        }
      ]
    }
  ]
};

export const whatsNewEntries: WhatsNewEntry[] = [
  latestWhatsNew,
  {
    version: "1.1.4",
    date: "2026-07-05",
    sections: [
      {
        titleKey: "whatsNew.section.features",
        items: version114Items
      }
    ]
  },
  {
    version: "1.1.3",
    date: "2026-06-30",
    sections: [
      {
        titleKey: "whatsNew.section.features",
        items: version113Items
      }
    ]
  },
  {
    version: "1.1.2",
    date: "2026-06-30",
    sections: [
      {
        title: "1.1.2",
        groups: [
          {
            titleKey: "whatsNew.section.features",
            items: version112Features
          },
          {
            titleKey: "whatsNew.section.fixes",
            items: version112Fixes
          },
          {
            titleKey: "whatsNew.section.polish",
            items: version112Polish
          }
        ]
      },
      {
        title: "1.1.1",
        groups: [
          {
            titleKey: "whatsNew.section.fixes",
            items: version111Items.slice(0, 4)
          },
          {
            titleKey: "whatsNew.section.polish",
            items: version111Items.slice(4)
          }
        ]
      },
      {
        title: "1.1.0",
        groups: [
          {
            titleKey: "whatsNew.section.features",
            items: version110Features
          },
          {
            titleKey: "whatsNew.section.polish",
            items: version110Changes
          },
          {
            titleKey: "whatsNew.section.fixes",
            items: version110Fixes
          }
        ]
      }
    ]
  },
  {
    version: "1.1.1",
    date: "2026-06-27",
    sections: [
      {
        title: "1.1.1",
        groups: [
          {
            titleKey: "whatsNew.section.fixes",
            items: version111Items.slice(0, 4)
          },
          {
            titleKey: "whatsNew.section.polish",
            items: version111Items.slice(4)
          }
        ]
      },
      {
        title: "1.1.0",
        groups: [
          {
            titleKey: "whatsNew.section.features",
            items: version110Features
          },
          {
            titleKey: "whatsNew.section.polish",
            items: version110Changes
          },
          {
            titleKey: "whatsNew.section.fixes",
            items: version110Fixes
          }
        ]
      }
    ]
  },
  {
    version: "1.1.0",
    date: "2026-06-27",
    sections: [
      {
        titleKey: "whatsNew.section.features",
        items: version110Features
      },
      {
        titleKey: "whatsNew.section.fixes",
        items: version110Fixes
      },
      {
        titleKey: "whatsNew.section.polish",
        items: version110Changes
      }
    ]
  }
];

export const getWhatsNewEntry = (version: string) =>
  whatsNewEntries.find((entry) => entry.version === version) || whatsNewEntries[0];
