import { create } from "zustand";

type FavoriteQueriesFiltersStoreProps = {
  searchTextInput: string;
  setSearchTextInput: (value: string) => void;
};

export const useFavoriteQueriesFiltersStore =
  create<FavoriteQueriesFiltersStoreProps>((set) => ({
    searchTextInput: "",
    setSearchTextInput: (value) => set({ searchTextInput: value }),
  }));
