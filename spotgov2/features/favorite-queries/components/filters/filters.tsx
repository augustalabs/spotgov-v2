import AdjudicatorsFilter from "./adjudicators-filter";
import QueryTitlesFilter from "./query-titles-filter";
import SearchFilter from "./search-filter";

const Filters = () => {
  return (
    <div className="my-5 flex flex-wrap gap-2">
      <SearchFilter />
      <QueryTitlesFilter />
      <AdjudicatorsFilter />
    </div>
  );
};

export default Filters;
