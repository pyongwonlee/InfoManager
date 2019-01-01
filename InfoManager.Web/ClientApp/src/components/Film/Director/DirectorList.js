import React from 'react';
import Director from './Director';
import directorService from '../../../services/directorService';

class DirectorList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      totalCount: 2,
      directors: [
        {name: 'AAA'},
        {name: 'BBB'}
      ]
    };
  }

  componentDidMount() {
    directorService.getDirectors()
      .then(response => {
        this.setState({
          isLoading: false,
          totalCount: response.data.totalCount,
          directors: response.data.items
        });
      })
      .catch(error => {
        if (error.response) {
          console.log('directorService.getDirectors', error.response);
        }
      });
  }

  render() {
    if (this.state.isLoading) {
      return <div><i class="fas fa-spinner"></i> Loading ...</div>
    } else {
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
}

export default DirectorList;