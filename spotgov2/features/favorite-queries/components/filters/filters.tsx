import Sort from "./sort";
import AdjudicatorsFilter from "./adjudicators-filter";
import QueryTitlesFilter from "./query-titles-filter";
import SavedFilter from "./saved-filter";
import SearchFilter from "./search-filter";

const Filters = () => {
  return (
    <div className="my-5 flex flex-wrap gap-2">
      <SearchFilter />
      <QueryTitlesFilter />
      <AdjudicatorsFilter />
      <SavedFilter />
      <Sort />
    </div>
  );
};

export default Filters;
