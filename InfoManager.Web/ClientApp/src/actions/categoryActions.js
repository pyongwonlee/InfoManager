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
      dispatch(beginAsynAction());

      return categroyService.createCategory(category)
        .then(response => {
          dispatch({
            type: actionTypes.CREATE_CATEGORY_SUCCESS,
            data: {
              success: true,
              errors: []
            }
          });
        }).catch (error => {
          dispatch({
            type: actionTypes.CREATE_CATEGORY_SUCCESS,
            data: {
              success: false,
              errors: ['Cannot create the category']
            }
          });
        });
    };
  },

  updateCategory: (id, category) => {
    return (dispatch, getState) => { 
      dispatch(beginAsynAction());
      
      return categroyService.updateCategory(id, category)
        .then(response => {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY_SUCCESS,
            data: {
              success: true,
              errors: []
            }
          });
        }).catch (error => {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY_SUCCESS,
            data: {
              success: false,
              errors: ['Cannot update the category']
            }
          });
        });
    };
  },

  deleteCategory: (id) => {
    return (dispatch, getState) => { 
      dispatch(beginAsynAction());
      
      return categroyService.deleteCategory(id)
        .then(response => {
          dispatch({
            type: actionTypes.DELETE_CATEGORY_SUCCESS,
            data: {
              success: true,
              errors: []
            }
          });
        }).catch (error => {
          dispatch({
            type: actionTypes.DELETE_CATEGORY_SUCCESS,
            data: {
              success: false,
              errors: ['Cannot delete the category']
            }
          });
        });
    };
  }
};

export default categoryActions;

