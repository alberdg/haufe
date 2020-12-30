import {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SET_EMAIL,
  SET_PASSWORD,
  SET_LOGIN_ERROR,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
} from '../../actions/auth/types';

import {
  SIGNUP_SUCCESS
} from '../../actions/signup/types';

const INITIAL_STATE = {
  user: null,
  email: '',
  password: '',
  loginError: false,
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case LOGOUT_ERROR:
      return { ...state };
    case LOGIN_SUCCESS:
    case SIGNUP_SUCCESS:
      return { ...state, user: payload };
    case LOGIN_ERROR:
      return { ...state, loginError: true };
    case SET_EMAIL:
      return { ...state, email: payload };
    case SET_PASSWORD:
      return { ...state, password: payload };
    case SET_LOGIN_ERROR:
      return { ...state, user: null, loginError: payload };
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return { ...state };

  }
};

export default authReducer;
