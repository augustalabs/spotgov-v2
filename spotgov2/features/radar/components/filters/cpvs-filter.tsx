import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import MultiSelectFilter from "./multi-select-filter";
import { LucideScrollText } from "lucide-react";
import { useTranslations } from "next-intl";

const CpvsFilter = ({ className }: { className?: string }) => {
  const cpvTranslation = useTranslations("radar.filters.cpv");

  const { cpvsInput, setCpvsInput, cpvsDefaultValues } =
    useFavoriteQueriesFiltersStore();

  return (
    <MultiSelectFilter
      input={cpvsInput}
      setInput={setCpvsInput}
      defaultValues={cpvsDefaultValues}
      selectLabel={cpvTranslation("label")}
      searchPlaceholder={cpvTranslation("searchPlaceholder")}
      noResultsMessage={cpvTranslation("noResults")}
      selectIcon={LucideScrollText}
      className={className}
    />
  );
};

export default CpvsFilter;
