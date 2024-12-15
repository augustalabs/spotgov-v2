"use client";

import MultipleSelector, {
  Option as MultiSelectOption,
} from "@/components/ui/multi-select";
import { useQuery } from "@tanstack/react-query";
import { WholeWord } from "lucide-react";
import { memo } from "react";
import { getKeywords } from "../api";

interface KeywordsSelectorProps {
  selectedKeywords: MultiSelectOption[];
  setSelectedKeywords: (value: MultiSelectOption[]) => void;
  setNewKeywords: (value: string[]) => void;
  organizationId: string;
}

const KeywordsSelector = memo(function KeywordsSelector({
  selectedKeywords,
  setSelectedKeywords,
  setNewKeywords,
  organizationId,
}: KeywordsSelectorProps) {
  // Fetch keywords
  const { data: keywords } = useQuery({
    queryKey: ["keywords", organizationId],
    queryFn: () => getKeywords({ organizationId }),
    enabled: false,
  });

  // Process the keywords data to create a list compatible with the MultiSelect component
  const keywordsList: MultiSelectOption[] =
    keywords
      ?.filter(
        (keyword: { keyword: string | null }) => keyword.keyword !== null,
      )
      .filter(
        (keyword, index, self) =>
          index === self.findIndex((k) => k.keyword === keyword.keyword),
      )
      .sort((a, b) => {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA;
      })
      .slice(0, 10)
      .map((keyword: { keyword: string | null }) => ({
        value: keyword.keyword as string,
        label: keyword.keyword as string,
      })) || [];

  const handleSelectedKeywordsChange = (values: MultiSelectOption[]) => {
    console.log(values);
    console.log(keywordsList);

    // Find new keywords (values not present in the keywordsList)
    const newKeywords = values.filter(
      (selected) =>
        !keywordsList.some((existing) => existing.value === selected.value),
    );

    setNewKeywords(newKeywords.map((keyword) => keyword.value));

    setSelectedKeywords(values);
  };

  return (
    <div className="mx-auto flex w-full items-center justify-between gap-2 bg-transparent text-sm">
      <div className="flex aspect-square h-12 w-12 items-center justify-center rounded-2xl border bg-[#F9F9FB] p-1">
        <WholeWord className="h-full w-full rounded-xl border bg-white p-2.5 text-gray-600" />
      </div>
      <MultipleSelector
        value={selectedKeywords}
        onChange={handleSelectedKeywordsChange}
        defaultOptions={keywordsList}
        creatable
        placeholder="Pesquisar com Palavras-Chave..."
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            Sem resultados.
          </p>
        }
        className="rounded-xl bg-white"
      />
    </div>
  );
});

export default KeywordsSelector;
