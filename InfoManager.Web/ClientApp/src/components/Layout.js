import React from 'react';
import NavMenu from './NavMenu';

export default props => (
  <div className="container-fluid"> 
    <NavMenu />
    <div className="mainArea" style={{marginTop: "30px"}}>
      {props.children}
      <hr />
      <p>&copy; 2018 - Personal Information Management by P. Lee</p>
    </div>
  </div>
);
