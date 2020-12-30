import {
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  SET_NAME,
  SET_EMAIL,
  SET_PASSWORD,
  SET_SIGNUP_ERROR,
} from '../../actions/signup/types';

import {
  LOGOUT_SUCCESS,
} from '../../actions/auth/types';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: '',
  signupError: false,
};

const signupReducer = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, user: payload };
    case SIGNUP_ERROR:
      return { ...state, signupError: true };
    case SET_SIGNUP_ERROR:
      return { ...state, signupError: payload };
    case SET_NAME:
      return { ...state, name: payload };
    case SET_EMAIL:
      return { ...state, email: payload };
    case SET_PASSWORD:
      return { ...state, password: payload };
    case LOGOUT_SUCCESS:
      return INITIAL_STATE;
    default:
      return { ...state };
  }
};

export default signupReducer;
