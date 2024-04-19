/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import { IntlReducer as Intl, IntlProvider } from 'react-redux-multilingual';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import translations from './translations';

import AppContainer from './containers/app';
import { initMap } from './actions';
import { mapReducer } from './reducers';
import rootSaga from './sagas/map_saga';
// import registerServiceWorker from './registerServiceWorker';
import { getQueryParam } from './utils';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
});

const rootReducer = combineReducers({ Intl, map: mapReducer });

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));

const locale = getQueryParam('locale', 'en');

store.dispatch({
  type: 'SET_LOCALE',
  locale,
});

sagaMiddleware.run(rootSaga);

render(
  <Provider store={store}>
    <IntlProvider translations={translations} locale={locale}>
      <AppContainer />
    </IntlProvider>
  </Provider>,
  document.getElementById('root'),
);

store.dispatch(initMap());

// registerServiceWorker();
