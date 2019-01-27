import React from 'react';
import PropTypes from 'prop-types';
import NavMenu from './NavMenu';

const Layout = (props) => { 
  return(
    <div className="container-fluid"> 
      <NavMenu />
      <div className="mainArea" style={{marginTop: '30px'}}>
        {props.children}
        <hr />
        <p>&copy; {new Date().getFullYear()} - Personal Information Management by P. Lee</p>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

export default Layout;