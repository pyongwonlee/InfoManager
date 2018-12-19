import React from 'react';
import { Redirect } from "react-router-dom";
import authService from '../../services/authService';

class Logout extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    authService.signOut(() => {});
  };

  render = () => {
    return (
     <Redirect to={'/'}/>
    );
  }
}

export default Logout;