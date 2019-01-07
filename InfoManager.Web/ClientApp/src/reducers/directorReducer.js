import * as actionTypes from '../actions/actionTypes';

const initialState = { 
  isLoading: true,
  totalCount: 0,
  directors: [
  ] 
};

export const directorListReducer = (state, action) => {
  state = state || initialState;

  switch(action.type) {
    case actionTypes.REQUEST_LOAD_DIRECTORS: {
      return {
        ...state,
        isLoading: true
      };
    } 
    case actionTypes.RECEIVE_LOAD_DIRECTORS: {
      return {
        ...state,
        totalCount: action.data.totalCount,
        directors: action.data.items,
        isLoading: false
      };
    }
    default:
      return state;
  }
};
