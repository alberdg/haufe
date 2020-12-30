import React from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import { loadState, saveState } from './utils';

const Root = ({ children, initialState = null }) => {
  const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
  const persistedState = initialState || loadState();
  const store = createStoreWithMiddleware(reducers, persistedState);

  store.subscribe(() => saveState(store.getState()));
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}
export default Root;
