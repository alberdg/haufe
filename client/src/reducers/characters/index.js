import {
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_ERROR,
  RESET_CHARACTERS_LIST,
  FETCH_CHARACTER_DETAIL_SUCCESS,
  FETCH_CHARACTER_DETAIL_ERROR,
  RESET_CHARACTER_DETAIL,
  SET_FAVOURITE_CHARACTER_SUCCESS,
} from '../../actions/characters/types';
import { LOGOUT_SUCCESS } from '../../actions/auth/types';
const INITIAL_STATE = {
  characters: [],
  info: {},
  fetchCharactersError: false,
  characterDetail: null,
  favouriteCharacter: false,
};

const charactersReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case SET_FAVOURITE_CHARACTER_SUCCESS:
      return { ...state, favouriteCharacter: payload };
    case FETCH_CHARACTER_DETAIL_SUCCESS:
      return { ...state, characterDetail: payload.character, favouriteCharacter: payload.favourite };
    case FETCH_CHARACTER_DETAIL_ERROR:
    case RESET_CHARACTER_DETAIL:
      return { ...state, characterDetail: null };
    case FETCH_CHARACTERS_SUCCESS:
      return { ...state, characters: [ ...state.characters, ...payload.results ], info: payload.info };
    case FETCH_CHARACTERS_ERROR:
      return { ...state, fetchCharactersError: true };
    case RESET_CHARACTERS_LIST:
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return { ...state };
  }
};

export default charactersReducer;
