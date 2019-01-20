import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

let emptyCateory = {  
  categoryId: 0,
  name: '',
  companies: []
};

export const categoryListReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOAD_CATEGORIES_SUCCESS: {
      return {
        ...state,
        totalCount: action.data.totalCount,
        categories: action.data.items
      };
    }
    default:
      return state;
  }
}

export const categoryGetReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY_BEGIN: {
      return {
        ...state,
        category: emptyCateory
      };
    }
    case actionTypes.GET_CATEGORY_SUCCESS: {
      return {
        ...state,
        category: action.data.item
      };
    }
    default:
      return state;
  }
}

export const categoryActionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CATEGORY: {
      return {
        ...state
      };
    }
    case actionTypes.UPDATE_CATEGORY: {
      return {
        ...state
      };
    } 
    case actionTypes.DELETE_CATEGORY: {
      return {
        ...state
      };
    } 
    default:
      return state;
  }
};
