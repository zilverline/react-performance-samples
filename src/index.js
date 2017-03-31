import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import exampleReducer from './exampleReducer'
import App from './App';
import './index.css';

const store = createStore(exampleReducer);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
