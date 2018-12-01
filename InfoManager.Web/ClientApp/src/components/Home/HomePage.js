import React from 'react';
import { connect } from 'react-redux';

const Home = props => (
  <div>
    <h1>Information Management</h1>
    <p>You can Manage:</p>
    <ul>
      <li>Credentials</li>
      <li>Movies</li>
      <li>Books</li>
      <li>Art Centers</li>
    </ul>
  </div>
);

export default connect()(Home);
