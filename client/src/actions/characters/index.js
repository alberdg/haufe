import axios from 'axios';
import { BASE_URL } from '../../constants';
import {
  FETCH_CHARACTERS_SUCCESS,
  FETCH_CHARACTERS_ERROR,
  RESET_CHARACTERS_LIST,
  FETCH_CHARACTER_DETAIL_SUCCESS,
  FETCH_CHARACTER_DETAIL_ERROR,
  RESET_CHARACTER_DETAIL,
  SET_FAVOURITE_CHARACTER_SUCCESS,
  SET_FAVOURITE_CHARACTER_ERROR,
} from './types';
import { dispatchError } from '../../utils';

export const resetCharacterDetail = () => {
  return {
    type: RESET_CHARACTER_DETAIL,
    payload: null
  };
}

export const resetCharactersList = () => {
  return {
    type: RESET_CHARACTERS_LIST,
    payload: []
  };
}

export const setFavouriteCharacter = (id, favourite, handleOk, handleKo) => {
  return async (dispatch) => {
    const url = `${BASE_URL}/api/characters/${id}`;
    try {
      const response = await axios.patch(url, { favourite }, { withCredentials: true });
      if (response && response.status === 200) {
        const payload = response.data && response.data.characterId ? true : false;
        dispatch({
          type: SET_FAVOURITE_CHARACTER_SUCCESS,
          payload
        });
        return handleOk();
      }
      dispatchError(SET_FAVOURITE_CHARACTER_ERROR, dispatch, handleKo);
    } catch (error) {
      dispatchError(SET_FAVOURITE_CHARACTER_ERROR, dispatch, handleKo);
    }
  };
}

export const fetchCharacterDetail = (id, handleOk, handleKo) => {
  return async (dispatch) => {
    const url = `${BASE_URL}/api/characters/${id}`;
    try {
      const response = await axios.get(url, { withCredentials: true });
      if (response && response.status === 200) {
        dispatch({
          type: FETCH_CHARACTER_DETAIL_SUCCESS,
          payload: response.data
        });
        return handleOk();
      }
      dispatchError(FETCH_CHARACTER_DETAIL_ERROR, dispatch, handleKo);
    } catch (error) {
      dispatchError(FETCH_CHARACTER_DETAIL_ERROR, dispatch, handleKo);
    }
  };
}

export const fetchCharacters = (page, handleOk, handleKo) => {
  return async (dispatch) => {
    const url = `${BASE_URL}/api/characters?page=${page}`;
    try {
      const response = await axios.get(url, { withCredentials: true, timeout: 1000 });
      if (response && response.status === 200) {
        dispatch({
          type: FETCH_CHARACTERS_SUCCESS,
          payload: response.data
        });
        return handleOk();
      }
      dispatchError(FETCH_CHARACTERS_ERROR, dispatch, handleKo);
    } catch (error) {
      dispatchError(FETCH_CHARACTERS_ERROR, dispatch, handleKo);
    }
  };
}
