import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

export const directorListReducer = (state= initialState, action) => {
  switch(action.type) {
    case actionTypes.LOAD_DIRECTORS_SUCCESS: {
      return {
        ...state,
        totalCount: action.data.totalCount,
        directors: action.data.items
      };
    }
    default:
      return state;
  }
};
