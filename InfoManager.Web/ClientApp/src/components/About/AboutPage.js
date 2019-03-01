import React from 'react';
import appService from '../../services/appService';

class AboutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      version: '',
      errorMessage: ''
    };
  }
  async componentDidMount() {
    try {
      const response = await appService.getInfo(); 
      this.setState(() => {
        return {        
        version: response.data.version,
        errorMessage: ''
        }
      })
    } catch (e) {
      this.setState({        
        version: '',
        errorMessage: 'Cannot retrieve the version'
      })
    }
  };
  showError() {
    if (this.state.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.state.errorMessage}
        </div>
      );
    } else {
      return(
        <div></div>
      );
    }
  }
  render() {
    return (
      <div>
        <h2>Personal Information Management System</h2>
        <hr />
        {this.showError()}
        <div className="alert alert-info">
          <ul>
            <li>
              Tech: React, Redux, Web API  
            </li>
            <li>              
              Version: {this.state.version}
            </li>
          </ul>
        </div>
      </div>
    );
  }
} 

export default AboutPage;