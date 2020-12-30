import { BASE_URL } from '../constants';
export const SIGN_IN_ROUTE = `${BASE_URL}/api/users/signin`;
export const SIGN_OUT_ROUTE = `${BASE_URL}/api/users/signout`;
export const NOT_FAVOURITE_CHARACTER_ID = 14;
export const NON_EXISTING_CHARACTER_ID = 1234;
export const SET_CHARACTER_FAVOURITE_RESPONSE = {
    'characterId': '13',
    'userId': '5fe755ec036dce19a069f823',
    'id': '5fec4f2ddc2e18785ed4a416'
}
export const SET_CHARACTER_NOT_FAVOURITE_ROUTE = `${BASE_URL}/api/characters/${NOT_FAVOURITE_CHARACTER_ID}`;
export const FETCH_NOT_EXISTING_DETAIL_ROUTE = `${BASE_URL}/api/characters/${NON_EXISTING_CHARACTER_ID}`;
export const SIGN_UP_ROUTE = `${BASE_URL}/api/users/signup`;
export const SIGN_UP_BODY = {
  name: 'Alberto',
  email: 'albertogodar81@gmail.com',
  id: '5fe755ec036dce19a069f823'
};
export const CHARACTER_ID = 13;
export const SET_CHARACTER_FAVOURITE_ROUTE = `${BASE_URL}/api/characters/${CHARACTER_ID}`;
export const FIRST_PAGE = 1;
export const FETCH_CHARACTERS_LIST_ROUTE = `${BASE_URL}/api/characters?page=${FIRST_PAGE}`;
export const CHARACTERS_LIST_RESPONSE = {
  info: {
      next: 2,
      prev: null,
      count: 671
  },
  results: [
      {
          id: '1',
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          location: {
            name: 'Earth (Replacement Dimension)'
          },
          episode: {
            name: 'Pilot'
          }
      },
      {
          id: '2',
          name: 'Morty Smith',
          status: 'Alive',
          species: 'Human',
          image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
          location: {
            name: 'Earth (Replacement Dimension)'
          },
          episode: {
            name: 'Pilot'
          }
      }
    ]
};

export const SIGN_IN_BODY = {
  name: 'Alberto',
  email: 'albertogodar81@gmail.com',
  id: '5fe755ec036dce19a069f823'
};

export const DETAIL_CHARACTER_ID = 1;
export const FETCH_CHARACTER_DETAIL_ROUTE = `${BASE_URL}/api/characters/${DETAIL_CHARACTER_ID}`
export const CHARACTER_DETAIL_RESPONSE = {
    character: {
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        location: {
          name: 'Earth (Replacement Dimension)'
        },
        episode: {
          name: 'Pilot'
        }
    },
    favourite: true
};
