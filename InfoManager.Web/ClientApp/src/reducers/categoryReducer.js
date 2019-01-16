import * as actionTypes from '../actions/actionTypes';

const initialState = { 
    isLoading: true,
    totalCount: 0,
    categories: [],
    category: {
      categoryId: 0,
      name: '',
      companies: []
    },
    success: true,
    errors: []
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_LOAD_CATEGORIES: {
      return {
        ...state,
        isLoading: true,
        success: true,
        errors: []
      };
    }
    case actionTypes.RECEIVE_LOAD_CATEGORIES: {
      return {
        ...state,
        totalCount: action.data.totalCount,
        categories: action.data.items,
        isLoading: false,
        success: true,
        errors: []
      };
    }       
    case actionTypes.REQUEST_GET_CATEGORY: {
      return {
        ...state,
        isLoading: true,
        success: true,
        errors: []
      };
    }
    case actionTypes.RECEIVE_GET_CATEGORY: {
      return {
        ...state,
        category: action.data.item,
        isLoading: false,
        success: true,
        errors: []
      };
    }
    case actionTypes.CREATE_CATEGORY: {
      return {
        ...state,
        success: action.data.success,
        errors: action.data.errors,
        isLoading: false
      };
    } 
    case actionTypes.UPDATE_CATEGORY: {
      return {
        ...state,
        success: action.data.success,
        errors: action.data.errors,
        isLoading: false
      };
    } 
    case actionTypes.DELETE_CATEGORY: {
      return {
        ...state,        
        success: action.data.success,
        errors: action.data.errors,
        isLoading: false
      };
    } 
    default:
      return state;
  }
};

export default categoryReducer;
