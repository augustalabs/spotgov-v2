"use client";

import { Input } from "@/components/ui/input";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";

const SearchFilter = ({ className }: { className?: string }) => {
  const { searchTextInput, setSearchTextInput } =
    useFavoriteQueriesFiltersStore();

  return (
    <Input
      placeholder="Procurar contratos..."
      value={searchTextInput}
      onChange={(event) => setSearchTextInput(event.target.value)}
      className={className}
    />
  );
};

export default SearchFilter;
