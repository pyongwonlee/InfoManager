import axios from 'axios';

const companyServiceBaseUrl = '/api/companies';

const companyService = {
  getCompanies: function() { 
    return axios.get(companyServiceBaseUrl);
  },
  getCompany: function(id) { 
    return axios.get(`${companyServiceBaseUrl}/${id}`);
  },
  createCompany: function(company) {
    return axios.post(companyServiceBaseUrl, company);
  },
  updateCompany: function(id, company) {
    return axios.put(`${companyServiceBaseUrl}/${id}`, company);
  },
  deleteCompany: function(id) {
    return axios.delete(`${companyServiceBaseUrl}/${id}`);
  }
};

export default companyService;