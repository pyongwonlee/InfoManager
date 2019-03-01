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
    // expect(result.type).toBe('div');
  });

  it('DirectorList: renders without crashing', () => {
    const div = document.createElement('div');
    const props = {
      totalCount: 0,
      directors: [],
      actions: { 
        getDirectors: () => { 
          return [];
        }
      }
    };

    ReactDOM.render(<DirectorList {...props} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
