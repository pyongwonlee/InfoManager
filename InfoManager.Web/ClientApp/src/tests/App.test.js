import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import App from '../App';
import initialState from '../store/initialState';
import configureStore from '../store/configureStore';

describe('The General App Testing', () => {
  it ('it should pass', () => {

  });

  it('renders without crashing', () => {
    const div = document.createElement('div');

    const store = configureStore(initialState);

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>, 
        div);
  });
});
