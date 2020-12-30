import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import moxios from 'moxios';
import { BASE_URL } from '../../../constants';
import {
  SIGN_UP_ROUTE,
  SIGN_UP_BODY,
} from '../../../test';
import {
  signup,
  setSignupError,
  setName,
  setEmail,
  setPassword,
} from '../';
import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SET_NAME,
  SET_EMAIL,
  SET_PASSWORD,
  SET_SIGNUP_ERROR,
} from '../types'
const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const callback = () => {};

beforeAll(() => {
  moxios.install();
  moxios.stubRequest(SIGN_UP_ROUTE, {
    status: 201,
    response: SIGN_UP_BODY
  });
});

afterAll(() => moxios.uninstall());

describe('Sign up tests', () => {
  it('Signs user up', async () => {
    const name = 'Alberto';
    const email = 'test@test.com';
    const password ='password';

    const expectedActions = [
      { type: SIGNUP_SUCCESS, payload: SIGN_UP_BODY },
    ]
    const store = mockStore({ auth: {} });

    return store.dispatch(signup(name, email, password, callback, callback)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    });
  });

  it('Sets name field in store', () => {
    const payload = 'Alberto test';
    const expectedAction = { type: SET_NAME, payload };
    expect(setName(payload)).toEqual(expectedAction);
  });

  it('Sets email field in store', () => {
    const payload = 'test@haufe.com';
    const expectedAction = { type: SET_EMAIL, payload };
    expect(setEmail(payload)).toEqual(expectedAction);
  });

  it('Sets password field in store', () => {
    const payload = 'Albert0test$';
    const expectedAction = { type: SET_PASSWORD, payload };
    expect(setPassword(payload)).toEqual(expectedAction);
  });

  it('Sets signup error field to true in store', () => {
    const payload = true;
    const expectedAction = { type: SET_SIGNUP_ERROR, payload };
    expect(setSignupError(payload)).toEqual(expectedAction);
  });

  it('Sets signup error field to false in store', () => {
    const payload = false;
    const expectedAction = { type: SET_SIGNUP_ERROR, payload };
    expect(setSignupError(payload)).toEqual(expectedAction);
  });
});
