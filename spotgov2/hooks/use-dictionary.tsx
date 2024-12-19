import { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { useState, useEffect } from "react";

const useDictionary = (locale: Locale) => {
  const [dictionary, setDictionary] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const dict = await getDictionary(locale);
        setDictionary(dict);
      } catch (error) {
        // TODO: handle error
      } finally {
        setLoading(false);
      }
    };

    loadDictionary();
  }, [locale]);

  return { dictionary, loading };
};

export default useDictionary;
