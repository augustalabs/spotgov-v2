import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { FileStack } from "lucide-react";
import MultiSelectFilter from "./multi-select-filter";
import { useTranslations } from "next-intl";

const QueryTitlesFilter = ({ className }: { className?: string }) => {
  const queryTitleTranslation = useTranslations("radar.filters.queryTitle");

  const { queryTitlesInput, setQueryTitlesInput, queryTitlesDefaultValues } =
    useFavoriteQueriesFiltersStore();

  return (
    <MultiSelectFilter
      input={queryTitlesInput}
      setInput={setQueryTitlesInput}
      defaultValues={queryTitlesDefaultValues}
      selectLabel={queryTitleTranslation("label")}
      searchPlaceholder={queryTitleTranslation("searchPlaceholder")}
      noResultsMessage={queryTitleTranslation("noResults")}
      selectIcon={FileStack}
      className={className}
    />
  );
};

export default QueryTitlesFilter;
