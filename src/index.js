import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Root from './components/Root'
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css'

document.title = `${process.env.REACT_APP_NAME}, ${process.env.REACT_APP_VERSION}`;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// const store = createStore(
//   reducer,
//   composeEnhancers(
//     applyMiddleware(logger)
//   )
// )

const configureStore = preloadedState => {
  const store = createStore(
    reducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        thunk
      )
    )
  );
  return store;
};

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));

registerServiceWorker()


