import axios from 'axios';
import { BASE_URL } from '../../constants';
import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SET_NAME,
  SET_EMAIL,
  SET_PASSWORD,
  SET_SIGNUP_ERROR,
} from './types';
import { dispatchError, dispatchAction } from '../../utils';

export const setSignupError = payload => dispatchAction(SET_SIGNUP_ERROR, payload);
export const setName = payload => dispatchAction(SET_NAME, payload);
export const setEmail = payload => dispatchAction(SET_EMAIL, payload);
export const setPassword = payload => dispatchAction(SET_PASSWORD, payload);

export const signup = (name, email, password, handleOk, handleKo) => {
  return async (dispatch) => {
    const url = `${BASE_URL}/api/users/signup`;
    debugger;
    try {
      const response = await axios.post(url, { name, email, password }, { withCredentials: true });
      if (response && response.status === 201) {
        dispatch({
          type: SIGNUP_SUCCESS,
          payload: response.data
        });
        return handleOk();
      }
      dispatchError(SIGNUP_ERROR, dispatch, handleKo);
    } catch (error) {
      dispatchError(SIGNUP_ERROR, dispatch, () => handleKo(error));
    }
  };
}
