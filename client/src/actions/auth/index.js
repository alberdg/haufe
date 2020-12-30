import axios from 'axios';
import { BASE_URL } from '../../constants';
import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_EMAIL,
  SET_PASSWORD,
  SET_LOGIN_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_ERROR,
} from './types';
import { dispatchError } from '../../utils';

export const logout = () => {
  return async (dispatch) => {
    const url = `${BASE_URL}/api/users/signout`;
    try {
      const response = await axios.post(url, { withCredentials: true });
      if (response && response.status === 200) {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: null
        });
        return;
      }
      dispatchError(LOGOUT_ERROR, dispatch);
    } catch (error) {
      dispatchError(LOGOUT_ERROR, dispatch);
    }
  };
}

export const setLoginError = payload => {
  return {
    type: SET_LOGIN_ERROR,
    payload
  };
}
export const setEmail = payload => {
  return {
    type: SET_EMAIL,
    payload
  };
}

export const setPassword = payload => {
  return {
    type: SET_PASSWORD,
    payload
  };
}

export const login = (email, password, handleOk, handleKo) => {
  return async (dispatch) => {
    const url = `${BASE_URL}/api/users/signin`;
    try {
      const response = await axios.post(url, { email, password }, { withCredentials: true });
      if (response && response.status === 200) {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: response.data
        });
        return handleOk();
      }
      dispatchError(LOGIN_ERROR, dispatch, handleKo);
    } catch (error) {
      dispatchError(LOGIN_ERROR, dispatch, handleKo);
    }
  };
}
