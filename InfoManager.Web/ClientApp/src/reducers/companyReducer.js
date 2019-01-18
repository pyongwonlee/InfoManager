import * as actionTypes from '../actions/actionTypes';

const initialListState = { 
  isLoading: true,
  totalCount: 0,
  companies: [],
  success: true,
  errors: []
};

export const companyListReducer = (state= initialListState, action) => {
  switch(action.type) {
    case actionTypes.REQUEST_LOAD_COMPANIES: {
      return {
        ...state,
        isLoading: true
      };
    } 
    case actionTypes.RECEIVE_LOAD_COMPANIES: {
      return {
        ...state,
        totalCount: action.data.totalCount,
        companies: action.data.items,
        isLoading: false
      };
    }
    default:
      return state;
  }
};
