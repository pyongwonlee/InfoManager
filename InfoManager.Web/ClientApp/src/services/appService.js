import axios from 'axios';

const appServiceBaseUrl = '/api/app';

const appService = {
  getInfo: function() { 
    return axios.get(`${appServiceBaseUrl}/info`);
  },
};

export default appService;