import { STATE_KEY } from '../constants';
export const loadState = () => {
  try {
    const serializedString = localStorage.getItem(STATE_KEY);
    return (serializedString) ? JSON.parse(serializedString) : {};
  } catch (err) {
    return null;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (err) {
  }
}

export const dispatchError = (type, dispatch, handleKo) => {
  dispatch({
    type,
    payload: null
  });
  if (handleKo) {
    handleKo();
  }
}

export const dispatchAction = (type, payload) => {
  return { type, payload };
}
