import { gql, request } from 'graphql-request';
import { CharacterListResponse } from '../interfaces/icharacter-list-response';
import { Character} from '../interfaces/icharacter';
import { RICK_AND_MORTY_GRAPHQL_ENDPOINT } from '../constants';

const getCharactersQuery = (page:number) => {
  return gql`
    {
      characters (page: ${page}){
        info {
          next,
          prev
          count
        }
        results {
          id,
          name,
          status,
          species,
          image,
          location {
            name
          }
          episode {
            name
          }
        }
      }
    }
  `
}

const getCharacterDetailQuery = (id: number) => {
  return gql`
    {
      character (id: ${id}) {
        name,
        status,
        species,
        image,
        location {
          name
        }
        episode {
          name
        }
      }
    }
  `
}

export const fetchCharacters = async (page: number = 1) => {
  const data = await request(RICK_AND_MORTY_GRAPHQL_ENDPOINT, getCharactersQuery(page))
  return transformData(data);
}

const transformData = (data: any) : CharacterListResponse => {
  const { info, results } = data.characters;
  const response: CharacterListResponse = {
    info,
    results: []
  };
  response.results = results.map((item: any) => {
    return { ...item, episode: item.episode[0] }
  });
  return response;
}

export const fetchCharacterDetail = async (id: number) : Promise<Character> => {
  const data = await request(RICK_AND_MORTY_GRAPHQL_ENDPOINT, getCharacterDetailQuery(id));
  const { character } = data;
  return { ...character, episode: character.episode[0] };
}
