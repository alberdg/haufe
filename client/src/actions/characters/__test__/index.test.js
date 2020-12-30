import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios';
import { BASE_URL } from '../../../constants';

import {
  resetCharacterDetail,
  resetCharactersList,
  setFavouriteCharacter,
  fetchCharacterDetail,
  fetchCharacters,
} from '../';
import {
  FETCH_CHARACTERS_SUCCESS,
  RESET_CHARACTERS_LIST,
  FETCH_CHARACTER_DETAIL_SUCCESS,
  RESET_CHARACTER_DETAIL,
  SET_FAVOURITE_CHARACTER_SUCCESS,
  FETCH_CHARACTER_DETAIL_ERROR,
} from '../types';

import {
  CHARACTERS_LIST_RESPONSE,
  FETCH_CHARACTERS_LIST_ROUTE,
  FIRST_PAGE,
  CHARACTER_ID,
  SET_CHARACTER_FAVOURITE_ROUTE,
  DETAIL_CHARACTER_ID,
  FETCH_CHARACTER_DETAIL_ROUTE,
  CHARACTER_DETAIL_RESPONSE,
  NOT_FAVOURITE_CHARACTER_ID,
  NON_EXISTING_CHARACTER_ID,
  SET_CHARACTER_FAVOURITE_RESPONSE,
  SET_CHARACTER_NOT_FAVOURITE_ROUTE,
  FETCH_NOT_EXISTING_DETAIL_ROUTE,
} from '../../../test';
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const callback = () => {};


beforeAll(() => {
  moxios.install();
  moxios.stubRequest(SET_CHARACTER_FAVOURITE_ROUTE, {
    status: 200,
    response: SET_CHARACTER_FAVOURITE_RESPONSE
  });

  moxios.stubRequest(SET_CHARACTER_NOT_FAVOURITE_ROUTE, {
    status: 200,
    response: {}
  });

  moxios.stubRequest(FETCH_CHARACTER_DETAIL_ROUTE, {
    status: 200,
    response: CHARACTER_DETAIL_RESPONSE
  });

  moxios.stubRequest(FETCH_NOT_EXISTING_DETAIL_ROUTE, {
    status: 404,
    response: null
  });

  moxios.stubRequest(FETCH_CHARACTERS_LIST_ROUTE, {
    status: 200,
    response: CHARACTERS_LIST_RESPONSE
  });
});

afterAll(() => moxios.uninstall());

describe('Characters tests', () => {
  it('Resets character detail in store', () => {
    const payload = null;
    const expectedAction = { type: RESET_CHARACTER_DETAIL, payload };
    expect(resetCharacterDetail(payload)).toEqual(expectedAction);
  });

  it('Resets character list', () => {
    const payload = [];
    const expectedAction = { type: RESET_CHARACTERS_LIST, payload };
    expect(resetCharactersList(payload)).toEqual(expectedAction);
  });

  it('Set character as favourite', async () => {
    const favourite = true;
    const expectedActions = [
      { type: SET_FAVOURITE_CHARACTER_SUCCESS, payload: true },
    ]
    const store = mockStore({ characters: {} });

    return store.dispatch(setFavouriteCharacter(CHARACTER_ID, favourite, callback, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('Set character as no favourite', async () => {
    const favourite = false;
    const expectedActions = [
      { type: SET_FAVOURITE_CHARACTER_SUCCESS, payload: false },
    ]
    const store = mockStore({ characters: {} });

    return store.dispatch(setFavouriteCharacter(NOT_FAVOURITE_CHARACTER_ID, favourite, callback, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('Fetches a character detail', async () => {
    const expectedActions = [
      { type: FETCH_CHARACTER_DETAIL_SUCCESS, payload: CHARACTER_DETAIL_RESPONSE },
    ]
    const store = mockStore({ characters: {} });

    return store.dispatch(fetchCharacterDetail(DETAIL_CHARACTER_ID, callback, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('Fetches a non existing character detail', async () => {
    const expectedActions = [
      { type: FETCH_CHARACTER_DETAIL_ERROR, payload: null },
    ]
    const store = mockStore({ characters: {} });

    return store.dispatch(fetchCharacterDetail(NON_EXISTING_CHARACTER_ID, callback, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('Fetches a list of characters', () => {
    const expectedActions = [
      { type: FETCH_CHARACTERS_SUCCESS, payload: CHARACTERS_LIST_RESPONSE },
    ]
    const store = mockStore({ characters: {} });

    return store.dispatch(fetchCharacters(FIRST_PAGE, callback, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });
});
