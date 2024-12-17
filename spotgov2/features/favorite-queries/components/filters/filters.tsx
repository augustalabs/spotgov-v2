import Sort from "./sort";
import AdjudicatorsFilter from "./adjudicators-filter";
import QueryTitlesFilter from "./query-titles-filter";
import SavedFilter from "./saved-filter";
import SearchFilter from "./search-filter";
import CpvsFilter from "./cpvs-filter";
import AddColumnButton from "../custom-columns/add-column-button";
import BasePriceFilter from "./base-price-filter";
import DateRangeFilter from "./date-range-filter";
import OnlyPriceCriteriaFilter from "./only-price-criteria-filter";

const className = "min-w-48 flex-grow basis-56";

type FiltersProps = {
  queryIds: string[];
};

const Filters = ({ queryIds }: FiltersProps) => {
  return (
    <div className="my-5 space-y-4">
      <div className="flex flex-wrap gap-2">
        <SearchFilter className={className} />
        <QueryTitlesFilter className={className} />
        <CpvsFilter className={className} />
        <AdjudicatorsFilter className={className} />
        <SavedFilter className={className} />
        <DateRangeFilter className={className} />
        <BasePriceFilter className={className} />
        <Sort className={className} />
        <AddColumnButton className={className} />
        {/* TODO: Implement export button when backend is ready */}
        {/* <ExportButton className={className} queryIds={queryIds} /> */}
      </div>
      <OnlyPriceCriteriaFilter />
    </div>
  );
};

export default Filters;
