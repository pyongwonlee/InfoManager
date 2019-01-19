import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export const companyListReducer = (state= initialState, action) => {
  switch(action.type) {
    case actionTypes.LOAD_COMPANIES_SUCCESS: {
      return {
        ...state,
        totalCount: action.data.totalCount,
        companies: action.data.items
      };
    }
    default:
      return state;
  }
};
