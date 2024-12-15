import Sort from "./sort";
import AdjudicatorsFilter from "./adjudicators-filter";
import QueryTitlesFilter from "./query-titles-filter";
import SavedFilter from "./saved-filter";
import SearchFilter from "./search-filter";
import CpvsFilter from "./cpvs-filter";
import AddColumnButton from "../custom-columns/add-column-button";

const className = "min-w-36 flex-grow basis-1/6";

const Filters = () => {
  return (
    <div className="my-5 flex flex-wrap gap-2">
      <SearchFilter className={className} />
      <QueryTitlesFilter className={className} />
      <CpvsFilter className={className} />
      <AdjudicatorsFilter className={className} />
      <SavedFilter className={className} />
      {/* TODO: ADD BASEPRICE DUAL RANGE FILTER */}
      <Sort className={className} />
      <AddColumnButton className={className} />
    </div>
  );
};

export default Filters;
