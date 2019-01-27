import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

describe('The General App Testing', () => {
  it ('it should pass', () => {

  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
  });
});
