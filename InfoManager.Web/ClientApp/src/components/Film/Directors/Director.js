import React from 'react';
import PropTypes from 'prop-types';

const Director = (props) => {
  let movieList = props.director.movies ?
    props.director.movies.map((movie) => {
      return `${movie.title} (${movie.year})`;
    }).join() 
    : '';

  return (
    <div className="row director-row">
      <div className="col-10 offset-1">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <h4>{props.director.name}</h4>
          </div>
          <div className="row">
            <div className="col-1 text-right">
                <span className="badge badge-info">{props.director.movies ? props.director.movies.length : 0 }</span>
            </div>
            <div className="col-10">
                <div className="alert alert-info">{movieList}</div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

Director.propTypes = {
  director: PropTypes.shape({
    name: PropTypes.string.isRequired
  })
};

export default Director;