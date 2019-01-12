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
    }
  },

  createCategory: (category) => {
    return {
      type: actionTypes.CREATE_CATEGORY, 
      category
    };
  }
};

export default categoryActions;

