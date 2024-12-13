import Sort from "./sort";
import AdjudicatorsFilter from "./adjudicators-filter";
import QueryTitlesFilter from "./query-titles-filter";
import SavedFilter from "./saved-filter";
import SearchFilter from "./search-filter";

const Filters = () => {
  return (
    <div className="my-5 flex flex-wrap gap-2">
      <SearchFilter className="flex-grow basis-1/6" />
      <QueryTitlesFilter className="flex-grow basis-1/6" />
      <AdjudicatorsFilter className="flex-grow basis-1/6" />
      <SavedFilter className="flex-grow basis-1/6" />
      <Sort className="flex-grow basis-1/6" />
    </div>
  );
};

export default Filters;
