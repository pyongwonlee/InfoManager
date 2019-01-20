import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css';

import 'jquery/dist/jquery.js';
import 'popper.js/dist/esm/popper.js';
import 'bootstrap/dist/js/bootstrap.js';
import 'toastr/build/toastr.min.css';

import initialState from './store/initialState';

const store = configureStore(initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();
