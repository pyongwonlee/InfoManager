import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './NavMenu.css';
import authService from '../services/authService';

export default props => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <Link className="navbar-brand" to='/'>InfoManager</Link>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <NavLink className="nav-link glyphicon" activeClassName="active" to='/' exact> <i className="fas fa-home"></i> Home <span className="sr-only">(current)</span></NavLink>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-lock"></i> Credentials
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="/"><i className="fas fa-layer-group"></i> Category</a>
            <a className="dropdown-item" href="/"><i className="fas fa-building"></i> Company</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="/"><i className="fas fa-key"></i> Passeword</a>
          </div>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-video"></i> Movies
          </a>
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <a className="dropdown-item" href="/director"><i className="fas fa-user"></i> Director</a>
            <div className="dropdown-divider"></div>
            <a className="dropdown-item" href="/movie"><i className="fas fa-film"></i> Movies</a>
          </div>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link glyphicon" activeClassName="active" to={'/about'} title="About"> <i className="fas fa-info-circle"></i></NavLink>
        </li>
        <li className="nav-item">
          <Link to="/logout"  title="Logout" className={ authService.isAuthenticated() ? "nav-link" : "nav-link disabled"}><i className="fas fa-sign-out-alt"></i></Link>
        </li>
      </ul>
    </div>
  </nav>
);
