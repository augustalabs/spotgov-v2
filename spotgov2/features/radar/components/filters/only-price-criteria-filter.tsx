import { Checkbox } from "@/components/ui/checkbox";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";
import { useTranslations } from "next-intl";

const OnlyPriceCriteriaFilter = () => {
  const onlyPriceCriteriaTranslation = useTranslations(
    "radar.filters.onlyPriceCriteria",
  );

  const { onlyPriceCriteriaInput, setOnlyPriceCriteriaInput } =
    useFavoriteQueriesFiltersStore();

  const handleOnlyPriceCriteriaChange = () => {
    setOnlyPriceCriteriaInput(!onlyPriceCriteriaInput);
  };

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="only-price-criteria"
        checked={onlyPriceCriteriaInput}
        onClick={handleOnlyPriceCriteriaChange}
        className="border-input"
      />
      <label
        htmlFor="only-price-criteria"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {onlyPriceCriteriaTranslation("label")}
      </label>
    </div>
  );
};

export default OnlyPriceCriteriaFilter;
