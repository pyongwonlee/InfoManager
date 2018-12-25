import React from 'react';

const Director = (props) => (
  <div className="row director-row">
    <div className="col-10 offset-1">
    <div className="card">
      <div className="card-body">
        {props.director.name}
      </div>
    </div>
    </div>
  </div>
);

export default Director;