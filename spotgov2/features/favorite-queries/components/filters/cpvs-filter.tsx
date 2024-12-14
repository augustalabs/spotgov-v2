import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import MultiSelectFilter from "./multi-select-filter";
import { LucideScrollText } from "lucide-react";

// TODO: MAKE THIS WORK -> CHANGE API FUNCTION
const CpvsFilter = ({ className }: { className?: string }) => {
  const { cpvsInput, setCpvsInput, cpvsDefaultValues } =
    useFavoriteQueriesFiltersStore();

  return (
    <MultiSelectFilter
      input={cpvsInput}
      setInput={setCpvsInput}
      defaultValues={cpvsDefaultValues}
      selectLabel="CPV"
      selectIcon={LucideScrollText}
      className={className}
    />
  );
};

export default CpvsFilter;
