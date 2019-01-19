import React from 'react';
import PropTypes from 'prop-types';
import DirectorRow from './DirectorRow';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import directorActions from '../../../actions/directorActions'

class DirectorList extends React.Component {

  static propTypes = {
    totalCount: PropTypes.number.isRequired,
    directors: PropTypes.array,
    actions: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.props.actions.getDirectors();
  }

  render() {
    const {totalCount, directors} = this.props;
    
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 offset-1">
            <h2>Directors</h2>
            <p className="text-info">(Total Count: {totalCount})</p>
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
          { directors.map((director, index) => 
              <DirectorRow director={director} key={index} />)
          }
      </div>  
    );
  }
}

const mapStateToProps = (state) => {
  return {
    directors: state.directorList.directors,
    totalCount: state.directorList.totalCount
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(directorActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DirectorList);
