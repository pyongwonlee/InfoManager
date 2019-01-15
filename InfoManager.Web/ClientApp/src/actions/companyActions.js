import companyService from '../services/companyService';
import * as actionTypes from './actionTypes';

const companyActions = {
  getCompanies: () => {
    return (dispatch, getState) => {      
      dispatch({
        type: actionTypes.REQUEST_LOAD_COMPANIES 
      });

      companyService.getCompanies()
        .then(response => {
          dispatch({ 
            type: actionTypes.RECEIVE_LOAD_COMPANIES , 
            data: response.data 
          });
        }).catch (error => {
          console.error(error);
        });
    };
  },

  getCompany: (id) => {
    return (dispatch, getState) => {  
      if (id > 0) {    
        companyService.getCompany(id)
          .then(response => {
            dispatch({ 
              type: actionTypes.GET_COMPANY, 
              data: response.data
            });
          }).catch (error => {
            console.error(error);
          });
      } else {
        dispatch({ 
          type: actionTypes.GET_COMPANY, 
          data: {
            item: {
              companyId: 0,
              name: '',
              passwords: []  
            }
          }
        });
      }
    };
  },

  createCompany: (company) => {
    return (dispatch, getState) => { 
      companyService.createCompany(company)
        .then(response => {
          dispatch({
            type: actionTypes.CREATE_COMPANY,
            data: {
              success: true,
              errors: []
            }
          });
        }).catch (error => {
          dispatch({
            type: actionTypes.CREATE_COMPANY,
            data: {
              success: false,
              errors: ['Cannot create the company']
            }
          });
        });
    };
  },

  updateCompany: (id, company) => {
    return (dispatch, getState) => { 
      companyService.updateCompany(id, company)
        .then(response => {
          dispatch({
            type: actionTypes.UPDATE_COMPANY,
            data: {
              success: true,
              errors: []
            }
          });
        }).catch (error => {
          dispatch({
            type: actionTypes.UPDATE_COMPANY,
            data: {
              success: false,
              errors: ['Cannot update the company']
            }
          });
        });
    };
  },

  deleteCompany: (id) => {
    return (dispatch, getState) => { 
      companyService.deleteCompany(id)
        .then(response => {
          dispatch({
            type: actionTypes.DELETE_COMPANY,
            data: {
              success: true,
              errors: []
            }
          });
        }).catch (error => {
          dispatch({
            type: actionTypes.DELETE_COMPANY,
            data: {
              success: false,
              errors: ['Cannot delete the company']
            }
          });
        });
    };
  }
};

export default companyActions;
