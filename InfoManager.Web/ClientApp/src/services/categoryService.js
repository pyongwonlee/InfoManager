import axios from 'axios';

const categroyServiceBaseUrl = '/api/categories';

const categroyService = {
  getCategories: function() { 
    return axios.get(categroyServiceBaseUrl);
  },
  getCategory: function(id) { 
    return axios.get(`${categroyServiceBaseUrl}/${id}`);
  },
  createCategory: function(category) {
    return axios.post(categroyServiceBaseUrl, category);
  },
  updateCategory: function(id, category) {
    return axios.put(`${categroyServiceBaseUrl}/${id}`, category);
  },
  deleteCategory: function(id) {
    return axios.delete(`${categroyServiceBaseUrl}/${id}`);
  }
};

export default categroyService;