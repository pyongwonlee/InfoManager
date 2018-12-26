import React from 'react';
import Director from './Director';

class DirectorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      totalCount: 2,
      directors: [
        {name: 'AAA'},
        {name: 'BBB'}
      ]
    };
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-10 offset-1">
            <h2>Directors</h2>
            <p className="text-info">(Total Count: {this.state.totalCount})</p>
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
        {this.state.directors.map( (director, index) => <Director director={director} key={index} />)}
      </div>  
    );
  }
}

export default DirectorList;