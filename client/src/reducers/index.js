import { combineReducers } from 'redux';
import authReducer from './auth';
import charactersReducer from './characters';
import signupReducer from './signup';

const rootReducer = combineReducers({
  auth: authReducer,
  characters: charactersReducer,
  signup: signupReducer,
});
export default rootReducer;
