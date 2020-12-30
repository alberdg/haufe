import { Character } from './icharacter';

export interface CharacterListResponse {
  info: {
    next: string,
    prev: string,
    count: number,
  },
  results: Character[];
}
