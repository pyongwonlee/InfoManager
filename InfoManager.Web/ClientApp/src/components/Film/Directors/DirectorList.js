import React from 'react';
import PropTypes from 'prop-types';
import Director from './Director';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions/directorActions'

class DirectorList extends React.Component {

  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
    totalCount: PropTypes.number.isRequired,
    directors: PropTypes.array,
    getDirectors: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.getDirectors();
  }

  render() {
    if (this.props.isLoading) {
      return (
        <div>
          <i className="fas fa-spinner"></i> Loading ...
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-10 offset-1">
              <h2>Directors</h2>
              <p className="text-info">(Total Count: {this.props.totalCount})</p>
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-5  offset-1">
              <a className="btn btn-primary" href="/director/create">Create a New Director</a>
            </div>
            <div className="col-5">
              <form className="form-inline">
                <div className="text-right" style={{width:"100%"}}>
                  <input name="searchTerm" className="form-control searchTerm" type="search" />
                  <button className="btn btn-info searchBtn" type="submit"><i className="fa fa-search"></i></button>
                </div>
              </form>
            </div>
          </div>
          {this.props.directors.map( (director, index) => <Director director={director} key={index} />)}
        </div>  
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    directors: state.directorList.directors,
    totalCount: state.directorList.totalCount,
    isLoading: state.directorList.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectorList);
