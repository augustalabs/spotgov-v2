import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { FileStack } from "lucide-react";
import MultiSelectFilter from "./multi-select-filter";

const QueryTitlesFilter = () => {
  const { queryTitlesInput, setQueryTitlesInput, queryTitlesDefaultValues } =
    useFavoriteQueriesFiltersStore();

  return (
    <MultiSelectFilter
      input={queryTitlesInput}
      setInput={setQueryTitlesInput}
      defaultValues={queryTitlesDefaultValues}
      selectLabel="Pesquisas"
      selectIcon={FileStack}
    />
  );
};

export default QueryTitlesFilter;