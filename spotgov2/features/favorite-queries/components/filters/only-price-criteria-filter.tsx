import { Checkbox } from "@/components/ui/checkbox";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";

const OnlyPriceCriteria = () => {
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
      />
      <label
        htmlFor="only-price-criteria"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Apenas contratos cujo critério de adjudicação é só o preço.
      </label>
    </div>
  );
};

export default OnlyPriceCriteria;
