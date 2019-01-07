import axios from 'axios';

const categroyServiceBaseUrl = '/api/directors';

const categroyService = {
  getCategories: function() { 
    return axios.get(categroyServiceBaseUrl);
  }
};

export default categroyService;