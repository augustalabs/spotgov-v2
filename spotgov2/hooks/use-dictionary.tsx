import { useEffect, useState } from "react";
import { DictionarySchema } from "@/lib/i18n/types";
import * as z from "zod";
import { Locale } from "@/lib/i18n/config";

const dictionaries = {
  pt: () => import("@/dictionaries/pt.json").then((module) => module.default),
  es: () => import("@/dictionaries/es.json").then((module) => module.default),
};

export const useDictionary = (locale: Locale) => {
  const [dictionary, setDictionary] = useState<z.infer<
    typeof DictionarySchema
  > | null>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const loadedDictionary = await dictionaries[locale]();
        DictionarySchema.parse(loadedDictionary);
        setDictionary(loadedDictionary);
      } catch {
        throw new Error("Invalid dictionary structure.");
      }
    };

    loadDictionary();
  }, [locale]);

  return dictionary;
};
