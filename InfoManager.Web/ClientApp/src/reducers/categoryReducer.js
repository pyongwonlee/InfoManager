import * as actionTypes from '../actions/actionTypes';

const initialListState = { 
    isLoading: true,
    totalCount: 0,
    categories: [] 
};

const initialCreateState = {
  category: null
};

export const categoryListReducer = (state, action) => {
  state = state || initialListState;

  switch (action.type) {
    case actionTypes.REQUEST_LOAD_CATEGORIES: {
      return {
        ...state,
        isLoading: true
      };
    } 
    case actionTypes.RECEIVE_LOAD_CATEGORIES: {
      return {
        ...state,
        totalCount: action.data.totalCount,
        categories: action.data.items,
        isLoading: false
      };
    }
    default:
      return state;
  }
};

export const categoryCreateReducer = (state, action) => {
  state = state || initialCreateState;

  switch (action.type) {
    case actionTypes.CREATE_CATEGORY: {
      return {
        ...state
      };
    } 
    default:
      return state;
  }
}
