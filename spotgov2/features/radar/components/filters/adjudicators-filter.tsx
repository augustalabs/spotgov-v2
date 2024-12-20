import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { Landmark } from "lucide-react";
import MultiSelectFilter from "./multi-select-filter";
import { useTranslations } from "next-intl";

const AdjudicatorsFilter = ({ className }: { className?: string }) => {
  const adjudicatorsTranslation = useTranslations("radar.filters.adjudicators");

  const { adjudicatorsInput, setAdjudicatorsInput, adjudicatorsDefaultValues } =
    useFavoriteQueriesFiltersStore();

  return (
    <MultiSelectFilter
      input={adjudicatorsInput}
      setInput={setAdjudicatorsInput}
      defaultValues={adjudicatorsDefaultValues}
      selectLabel={adjudicatorsTranslation("label")}
      searchPlaceholder={adjudicatorsTranslation("searchPlaceholder")}
      noResultsMessage={adjudicatorsTranslation("noResults")}
      selectIcon={Landmark}
      className={className}
    />
  );
};

export default AdjudicatorsFilter;
