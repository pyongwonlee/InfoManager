import React from 'react';
import Director from './Director';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actionCreators } from '../../../actions/Directors'

class DirectorList extends React.Component {

  componentDidMount() {
    this.props.getDirectors();
  }

  render() {
    if (this.props.isLoading) {
      return <div><i className="fas fa-spinner"></i> Loading ...</div>
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

export default connect(
  state => state.directorList,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(DirectorList);