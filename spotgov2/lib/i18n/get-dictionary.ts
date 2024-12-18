import "server-only";

import { Language } from "./config";

const dictionaries = {
  pt: () => import("@/dictionaries/pt.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
};

export const getDictionary = async (locale: Language) => dictionaries[locale]();
