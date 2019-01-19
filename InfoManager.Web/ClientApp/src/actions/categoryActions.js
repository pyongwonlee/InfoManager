import categroyService from '../services/categoryService';
import * as actionTypes from './actionTypes';

const categoryActions = {
  getCategories: () => {
    return (dispatch, getState) => {      
      dispatch({
        type: actionTypes.REQUEST_LOAD_CATEGORIES  
      });

      categroyService.getCategories()
        .then(response => {
          dispatch({
            type: actionTypes.RECEIVE_LOAD_CATEGORIES, 
            data: response.data 
          });
        }).catch (error => {
          console.error(error);
        });
    };
  },

  getCategory: (id) => {
    return (dispatch, getState) => {
      dispatch({
        type: actionTypes.REQUEST_GET_CATEGORY
      });

      categroyService.getCategory(id)
        .then(response => {
          dispatch({
            type: actionTypes.RECEIVE_GET_CATEGORY, 
            data: response.data
          });
        }).catch (error => {
          console.error(error);
        });
    }
  },

  createCategory: (category) => {
    return (dispatch, getState) => { 
      categroyService.createCategory(category)
        .then(response => {
          dispatch({
            type: actionTypes.CREATE_CATEGORY,
            data: {
              success: true,
              errors: []
            }
          });
        }).catch (error => {
          dispatch({
            type: actionTypes.CREATE_CATEGORY,
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
      categroyService.updateCategory(id, category)
        .then(response => {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY,
            data: {
              success: true,
              errors: []
            }
          });
        }).catch (error => {
          dispatch({
            type: actionTypes.UPDATE_CATEGORY,
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
      categroyService.deleteCategory(id)
        .then(response => {
          dispatch({
            type: actionTypes.DELETE_CATEGORY,
            data: {
              success: true,
              errors: []
            }
          });
        }).catch (error => {
          dispatch({
            type: actionTypes.DELETE_CATEGORY,
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

