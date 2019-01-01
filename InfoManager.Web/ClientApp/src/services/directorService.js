import axios from 'axios';

const directorServiceBaseUrl = '/api/directors';

const directorService = {
  getDirectors: function() { 
    return axios.get(directorServiceBaseUrl);
  }
};

export default directorService;