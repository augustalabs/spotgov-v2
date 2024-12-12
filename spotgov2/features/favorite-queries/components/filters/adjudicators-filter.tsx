import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { Landmark } from "lucide-react";
import MultiSelectFilter from "./multi-select-filter";

const AdjudicatorsFilter = () => {
  const { adjudicatorsInput, setAdjudicatorsInput, adjudicatorsDefaultValues } =
    useFavoriteQueriesFiltersStore();

  return (
    <MultiSelectFilter
      input={adjudicatorsInput}
      setInput={setAdjudicatorsInput}
      defaultValues={adjudicatorsDefaultValues}
      selectLabel="Adjudicantes"
      selectIcon={Landmark}
    />
  );
};

export default AdjudicatorsFilter;
