import axios from 'axios';

const categroyServiceBaseUrl = '/api/categories';

const categroyService = {
  getCategories: function() { 
    return axios.get(categroyServiceBaseUrl);
  }
};

export default categroyService;