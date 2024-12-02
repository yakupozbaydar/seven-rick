import { create } from "zustand";

export type Character = {
  id: number;
  name: string;
  image: string;
  episode: string[];
};

type CharacterStoreAction = {
  setSearchKey: (key: string) => void;
  addCharacter: (char: Character) => void;
  removeCharacter: (id: number) => void;
  setSearchInput: (input: string) => void;
};

type CharacterStoreState = {
  selectedCharacters: Character[];
  searchInput: string;
  searchKey: string;
};

export const useCharacterStore = create<
  CharacterStoreState & CharacterStoreAction
>((set) => ({
  selectedCharacters: [],

  searchInput: "",

  searchKey: "",

  addCharacter: (char) =>
    set((state) => ({
      selectedCharacters: [...state.selectedCharacters, char],
    })),

  removeCharacter: (id) =>
    set((state) => ({
      selectedCharacters: state.selectedCharacters.filter(
        (char) => char.id !== id,
      ),
    })),

  setSearchKey: (key) =>
    set(() => ({
      searchKey: key,
    })),

  // Using zustand store instead of useState to reduce re-renders
  setSearchInput: (input) =>
    set(() => ({
      searchInput: input,
    })),
}));
