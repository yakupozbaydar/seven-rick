import { Character } from "@/store/useCharacterStore";

class CharacterService {
  async getCharacter(id: number) {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`,
    );
    return response.json();
  }

  async getCharacters(): Promise<Character[]> {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return data.results;
  }

  async searchCharacter(name: string): Promise<Character[]> {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?name=${name}`,
    );
    const data = await response.json();

    return data.results;
  }
}

export default new CharacterService();
