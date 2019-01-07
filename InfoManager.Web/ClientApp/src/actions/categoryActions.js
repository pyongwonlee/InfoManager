import categroyService from '../services/categoryService';
import * as actionTypes from './actionTypes';

export const getCategories = () => async (dispatch, getState) => {
  dispatch({ 
    type: actionTypes.REQUEST_LOAD_CATEGORIES
  });

  try {
    const response = await categroyService.getCategories();
    dispatch({ 
      type: actionTypes.RECEIVE_LOAD_CATEGORIES, 
      data: response.data 
    });
  } catch (error) {
    console.error(error);
  }
};

export const createCategory = (category) => {
  return {
    type: actionTypes.CREATE_CATEGORY, 
    category
  };
};

