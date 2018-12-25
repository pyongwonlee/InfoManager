import React from 'react';
import ReactDOM from 'react-dom';
import DirectorList from '../components/Film/Director/DirectorList';

describe("DirectorList Component Tests: ", () => {
  let result;
  beforeAll(()=> {
    result = DirectorList();
  });

  it('DirectorList: returns', () => {
    expect(result).not.toBeNull();
    expect(result.type).toBe("div");
  });

  it("DirectorList: renders without crashing", () => {
    const div = document.createElement('div');
    ReactDOM.render(<DirectorList />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
