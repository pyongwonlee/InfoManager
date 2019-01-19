import companyService from '../services/companyService';
import * as actionTypes from './actionTypes';
import {beginAsynAction} from './asyncStatusActions';

const companyActions = {
  getCompanies: () => {
    return (dispatch, getState) => {
      dispatch(beginAsynAction());

      return companyService.getCompanies()
        .then(response => {
          dispatch({ 
            type: actionTypes.LOAD_COMPANIES_SUCCESS , 
            data: response.data 
          });
        }).catch (error => {
          console.error(error);
        });
    };
  },

  getCompany: (id) => {
    return (dispatch, getState) => {  
      dispatch(beginAsynAction());

      return companyService.getCompany(id)
        .then(response => {
          dispatch({ 
            type: actionTypes.GET_COMPANY_SUCCESS, 
            data: response.data
          });
        }).catch (error => {
          console.error(error);
        }); 
    };
  },

  createCompany: (company) => {
    return (dispatch, getState) => { 
      dispatch(beginAsynAction());
      
      return companyService.createCompany(company)
        .then(response => {
          dispatch({
            type: actionTypes.CREATE_COMPANY_SUCCESS,
            data: {
              success: true,
              errors: []
            }
          });
        }).catch (error => {
          dispatch({
            type: actionTypes.CREATE_COMPANY_SUCCESS,
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
      dispatch(beginAsynAction());
      
      return companyService.updateCompany(id, company)
        .then(response => {
          dispatch({
            type: actionTypes.UPDATE_COMPANY_SUCCESS,
            data: {
              success: true,
              errors: []
            }
          });
        }).catch (error => {
          dispatch({
            type: actionTypes.UPDATE_COMPANY_SUCCESS,
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
      dispatch(beginAsynAction());
      
      return companyService.deleteCompany(id)
        .then(response => {
          dispatch({
            type: actionTypes.DELETE_COMPANY_SUCCESS,
            data: {
              success: true,
              errors: []
            }
          });
        }).catch (error => {
          dispatch({
            type: actionTypes.DELETE_COMPANY_SUCCESS,
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
