import categroyService from '../services/categoryService';
import * as actionTypes from './actionTypes';
import {beginAsynAction} from './asyncStatusActions';

const categoryActions = {
  getCategories: () => {
    return (dispatch, getState) => {      
      dispatch(beginAsynAction());

      return categroyService.getCategories()
        .then(response => {
          dispatch({
            type: actionTypes.LOAD_CATEGORIES_SUCCESS, 
            data: response.data 
          });
        }).catch (error => {
          console.error(error);
        });
    };
  },

  getCategory: (id) => {
    return (dispatch, getState) => {
      dispatch(beginAsynAction());
      dispatch ({
        type: actionTypes.GET_CATEGORY_BEGIN
      });

      return categroyService.getCategory(id)
        .then(response => {
          dispatch({
            type: actionTypes.GET_CATEGORY_SUCCESS, 
            data: response.data
          });
        }).catch (error => {
          console.error(error);
        });
    }
  },

  createCategory: (category) => {
    return (dispatch, getState) => { 
      return categroyService.createCategory(category)
        .then(response => {
          dispatch({
            type: actionTypes.CREATE_CATEGORY
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

  updateCategory: (id, category) => {
    return (dispatch, getState) => {       
      return categroyService.updateCategory(id, category)
        .then(response => {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY
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

  deleteCategory: (id) => {
    return (dispatch, getState) => {       
      return categroyService.deleteCategory(id)
        .then(response => {
          dispatch({
            type: actionTypes.DELETE_CATEGORY
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

export default categoryActions;

