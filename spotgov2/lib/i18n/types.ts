import { z } from "zod";

// Sidebar structure
export const SidebarItemsSchema = z.object({
  detectionAndAnalysis: z.object({
    title: z.string(),
    items: z.object({
      radar: z.string(),
      search: z.string(),
    }),
  }),
  responseAndReview: z.object({
    title: z.string(),
    items: z.object({
      reviewer: z.string(),
    }),
  }),
  management: z.object({
    title: z.string(),
    items: z.object({
      savedContests: z.string(),
    }),
  }),
  marketIntelligence: z.object({
    title: z.string(),
    items: z.object({
      marketIntelligence: z.string(),
    }),
  }),
  organization: z.object({
    title: z.string(),
    items: z.object({
      organization: z.string(),
    }),
  }),
});

export const UserButtonContactsSchema = z.object({
  logout: z.string(),
  contacts: z.object({
    label: z.string(),
    call: z.object({
      title: z.string(),
      subtitle: z.string(),
    }),
    email: z.object({
      title: z.string(),
      subtitle: z.string(),
    }),
    meeting: z.object({
      title: z.string(),
      subtitle: z.string(),
    }),
    toasts: z.object({
      success: z.object({
        copied: z.string(),
      }),
    }),
  }),
});

// Sidebar components
export const SidebarSchema = z.object({
  sidebarItems: SidebarItemsSchema,
  organizationSwitcher: z.object({
    label: z.string(),
    tooltip: z.string(),
  }),
  userButton: UserButtonContactsSchema,
});

// Radar filters structure
export const RadarFiltersSchema = z.object({
  search: z.string(),
  queryTitle: z.object({
    label: z.string(),
    searchPlaceholder: z.string(),
  }),
  cpv: z.object({
    label: z.string(),
    searchPlaceholder: z.string(),
  }),
  adjudicators: z.object({
    label: z.string(),
    searchPlaceholder: z.string(),
  }),
  saved: z.object({
    options: z.object({
      all: z.string(),
      saved: z.string(),
      notSaved: z.string(),
    }),
  }),
  publishDate: z.object({
    label: z.string(),
  }),
  basePrice: z.object({
    label: z.string(),
    popover: z.object({
      title: z.string(),
      subtitle: z.string(),
    }),
  }),
  sort: z.object({
    options: z.object({
      publishDateDesc: z.string(),
      publishDateAsc: z.string(),
      basePriceDesc: z.string(),
      basePriceAsc: z.string(),
      deadlineDesc: z.string(),
      deadlineAsc: z.string(),
    }),
  }),
});

// Radar table structure
export const RadarTableSchema = z.object({
  columns: z.object({
    title: z.string(),
    basePrice: z.string(),
    publishDate: z.string(),
    deadline: z.string(),
    timeLeft: z.string(),
    query: z.string(),
    saved: z.string(),
  }),
  customColumns: z.object({}),
  noResults: z.string(),
  buttons: z.object({
    previous: z.string(),
    next: z.string(),
  }),
});

// Main Radar structure
export const RadarSchema = z.object({
  header: z.object({
    title: z.string(),
  }),
  filters: RadarFiltersSchema,
  table: RadarTableSchema,
  toasts: z.object({
    success: z.object({}),
    error: z.object({}),
  }),
});

// Other sections like search, reviewer, etc.
export const SearchSchema = z.object({
  header: z.object({
    title: z.string(),
  }),
});

export const ReviewerSchema = z.object({
  header: z.object({
    title: z.string(),
  }),
});

export const SavedContestsSchema = z.object({
  header: z.object({
    title: z.string(),
  }),
});

export const MarketIntelligenceSchema = z.object({
  header: z.object({
    title: z.string(),
  }),
});

export const OrganizationSchema = z.object({
  header: z.object({
    title: z.string(),
  }),
  information: z.object({
    name: z.string(),
    nif: z.string(),
  }),
  cards: z.object({
    members: z.string(),
    querysLeft: z.string(),
    analysis: z.string(),
  }),
  table: z.object({
    filter: z.object({
      options: z.object({
        all: z.string(),
        owner: z.string(),
        admin: z.string(),
        editor: z.string(),
        viewer: z.string(),
      }),
    }),
    inviteMember: z.object({
      tooltip: z.string(),
      dialog: z.object({
        title: z.string(),
        subtitle: z.string(),
        input: z.object({
          email: z.string(),
        }),
        button: z.string(),
      }),
    }),
    columns: z.object({
      name: z.string(),
      role: z.string(),
      actions: z.string(),
    }),
    removeMember: z.object({
      tooltip: z.string(),
    }),
  }),
  toasts: z.object({
    success: z.object({
      inviteSent: z.string(),
      memberRemoved: z.string(),
      roleChange: z.string(),
    }),
    error: z.object({
      inviteFailed: z.string(),
      memberRemoveFailed: z.string(),
      roleChangeFailed: z.string(),
    }),
  }),
});

// Destructive dialog structure
export const DestructiveDialogSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  buttons: z.object({
    cancel: z.string(),
    continue: z.string(),
  }),
});

// The full dictionary schema
export const DictionarySchema = z.object({
  sidebar: SidebarSchema,
  radar: RadarSchema,
  search: SearchSchema,
  reviewer: ReviewerSchema,
  savedContests: SavedContestsSchema,
  marketIntelligence: MarketIntelligenceSchema,
  organization: OrganizationSchema,
  destructiveDialog: DestructiveDialogSchema,
});
