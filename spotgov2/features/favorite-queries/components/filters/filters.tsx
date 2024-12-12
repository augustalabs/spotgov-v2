import AdjudicatorsFilter from "./adjudicators-filter";
import QueryTitlesFilter from "./query-titles-filter";
import SearchFilter from "./search-filter";

const Filters = () => {
  return (
    <>
      <SearchFilter />
      <QueryTitlesFilter />
      <AdjudicatorsFilter />
    </>
  );
};

export default Filters;
