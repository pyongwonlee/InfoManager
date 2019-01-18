import * as actionTypes from '../actions/actionTypes';

const initialListState = { 
    isLoading: true,
    totalCount: 0,
    categories: [],
    success: true,
    errors: []
};

const initialGetState = {  
  isLoading: true,
  category: {
    categoryId: 0,
    name: '',
    companies: []
  },
  success: true,
  errors: []
};

const initialActionState = {
  success: true,
  errors: []
};

export const categoryListReducer = (state = initialListState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_LOAD_CATEGORIES: {
      return {
        ...state,
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
    default:
      return state;
  }
}

export const categoryGetReducer = (state = initialGetState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
}

export const categoryActionsReducer = (state = initialActionState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CATEGORY: {
      return {
        ...state,
        success: action.data.success,
        errors: action.data.errors
      };
    }
    case actionTypes.UPDATE_CATEGORY: {
      return {
        ...state,
        success: action.data.success,
        errors: action.data.errors
      };
    } 
    case actionTypes.DELETE_CATEGORY: {
      return {
        ...state,
        success: action.data.success,
        errors: action.data.errors
      };
    } 
    default:
      return state;
  }
};
