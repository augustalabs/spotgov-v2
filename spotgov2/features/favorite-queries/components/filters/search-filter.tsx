"use client";

import { Input } from "@/components/ui/input";
import { useFavoriteQueriesFiltersStore } from "@/stores/favorite-queries-filters-store";

const SearchFilter = () => {
  const { searchTextInput, setSearchTextInput } =
    useFavoriteQueriesFiltersStore();

  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Procurar pesquisas..."
        value={searchTextInput}
        onChange={(event) => setSearchTextInput(event.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};

export default SearchFilter;
