import { create } from "zustand";

type FavoriteQueriesFiltersStoreProps = {
  // Search for contracts by title or issuer name
  searchTextInput: string;
  setSearchTextInput: (value: string) => void;
  // Search for contracts by adjudicators
  adjudicatorsDefaultValues: string[];
  setAdjudicatorsDefaultValues: (value: string[]) => void;
  adjudicatorsInput: string[];
  setAdjudicatorsInput: (value: string[]) => void;
  // Search for contracts by query title
  queryTitlesInput: string[];
  setQueryTitlesInput: (value: string[]) => void;
  queryTitlesDefaultValues: string[];
  setQueryTitlesDefaultValues: (value: string[]) => void;
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
    queryTitlesInput: [],
    setQueryTitlesInput: (value) => set({ queryTitlesInput: value }),
    queryTitlesDefaultValues: [],
    setQueryTitlesDefaultValues: (value) =>
      set({ queryTitlesDefaultValues: value }),
  }));
