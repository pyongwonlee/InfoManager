import React from 'react';
import ReactDOM from 'react-dom';
import { DirectorList } from '../components/Film/Directors/DirectorList';

describe('DirectorList Component Tests: ', () => {
  let result;
  beforeAll(()=> {
    result = new DirectorList();
  });

  it('DirectorList: returns', () => {
    expect(result).not.toBeNull();
    expect(result.type).toBe('div');
  });

  it('DirectorList: renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DirectorList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
