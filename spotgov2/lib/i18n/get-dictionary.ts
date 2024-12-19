import "server-only";

import { Locale } from "./config";
import { DictionarySchema } from "@/lib/i18n/types";
import * as z from "zod";

const dictionaries = {
  pt: () => import("@/dictionaries/pt.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
};

export const getDictionary = async (
  locale: Locale,
): Promise<z.infer<typeof DictionarySchema>> => {
  const dictionary = await dictionaries[locale]();

  try {
    DictionarySchema.parse(dictionary);
    return dictionary;
  } catch (error) {
    throw new Error("Invalid dictionary structure.");
  }
};
