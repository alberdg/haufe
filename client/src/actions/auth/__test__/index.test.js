import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios';
import { BASE_URL } from '../../../constants';

import {
  login,
  logout,
  setEmail,
  setPassword,
  setLoginError,
} from '../';
import {
  SET_EMAIL,
  SET_LOGIN_ERROR,
  SET_PASSWORD,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
} from '../types'
import {
  SIGN_IN_BODY,
  SIGN_IN_ROUTE,
  SIGN_OUT_ROUTE,
} from '../../../test';
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const callback = () => {};

beforeAll(() => {
  moxios.install();
  moxios.stubRequest(SIGN_IN_ROUTE, {
    status: 200,
    response: SIGN_IN_BODY
  });

  moxios.stubRequest(SIGN_OUT_ROUTE, {
    status: 200,
    response: {}
  });
});

afterAll(() => moxios.uninstall());

describe('Auth tests', () => {
  it('Should log the user in', async () => {
    const email = 'test@test.com';
    const password = 'password';
    const expectedActions = [
      { type: LOGIN_SUCCESS, payload: SIGN_IN_BODY },
    ]
    const store = mockStore({ auth: {} });

    return store.dispatch(login(email, password, callback, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('Should log the user out', async () => {
    const expectedActions = [
      { type: LOGOUT_SUCCESS, payload: null },
    ]
    const store = mockStore({ auth: {} });

    return store.dispatch(logout()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('Should set login error flag to true', () => {
    const payload = true;
    const expectedAction = { type: SET_LOGIN_ERROR, payload };
    expect(setLoginError(payload)).toEqual(expectedAction);
  });

  it('Should set login error flag to false', () => {
    const payload = false;
    const expectedAction = { type: SET_LOGIN_ERROR, payload };
    expect(setLoginError(payload)).toEqual(expectedAction);
  });

  it('Should set login email field', () => {
    const payload = 'test@haufe.com';
    const expectedAction = { type: SET_EMAIL, payload };
    expect(setEmail(payload)).toEqual(expectedAction);
  });

  it('Should set login password field', () => {
    const payload = '$tr0ngPasswOrd';
    const expectedAction = { type: SET_PASSWORD, payload };
    expect(setPassword(payload)).toEqual(expectedAction);
  });
});
