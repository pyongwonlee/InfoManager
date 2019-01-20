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
      return companyService.createCompany(company)
        .then(response => {
          dispatch({
            type: actionTypes.CREATE_COMPANY
          });
        }).catch (error => {
          if(error.response.data && error.response.data.errors){
            throw new Error(error.response.data.errors[0]);
          } else {
            throw new Error('Cannot create a category.');
          }
        });
    };
  },

  updateCompany: (id, company) => {
    return (dispatch, getState) => { 
      return companyService.updateCompany(id, company)
        .then(response => {
          dispatch({
            type: actionTypes.UPDATE_COMPANY
          });
        }).catch (error => {
          if(error.response.data && error.response.data.errors){
            throw new Error(error.response.data.errors[0]);
          } else {
            throw new Error('Cannot create a category.');
          }
        });
    };
  },

  deleteCompany: (id) => {
    return (dispatch, getState) => {       
      return companyService.deleteCompany(id)
        .then(response => {
          dispatch({
            type: actionTypes.DELETE_COMPANY
          });
        }).catch (error => {
          if(error.response.data && error.response.data.errors){
            throw new Error(error.response.data.errors[0]);
          } else {
            throw new Error('Cannot create a category.');
          }
        });
    };
  }
};

export default companyActions;
