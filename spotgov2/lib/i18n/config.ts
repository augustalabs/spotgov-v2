export const i18n = {
  defaultLocale: "pt",
  locales: ["pt", "es"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
