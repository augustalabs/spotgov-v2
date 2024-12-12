import { create } from "zustand";

type FavoriteQueriesFiltersStoreProps = {
  searchTextInput: string;
  setSearchTextInput: (value: string) => void;
  adjudicatorsDefaultValues: string[];
  setAdjudicatorsDefaultValues: (value: string[]) => void;
  adjudicatorsInput: string[];
  setAdjudicatorsInput: (value: string[]) => void;
};

export const useFavoriteQueriesFiltersStore =
  create<FavoriteQueriesFiltersStoreProps>((set) => ({
    searchTextInput: "",
    setSearchTextInput: (value) => set({ searchTextInput: value }),
    adjudicatorsDefaultValues: [],
    setAdjudicatorsDefaultValues: (value) =>
      set({ adjudicatorsDefaultValues: value }),
    adjudicatorsInput: [],
    setAdjudicatorsInput: (value) => set({ adjudicatorsInput: value }),
  }));
