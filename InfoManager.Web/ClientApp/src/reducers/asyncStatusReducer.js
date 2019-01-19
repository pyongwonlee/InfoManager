import * as actionTypes from '../actions/actionTypes';
import initialState from '../store/initialState';

const actionTypesForAsyncEnd = (type) => {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export const asyncStatusReducer = (state=initialState, action) => {
  if (action.type === actionTypes.BEGIN_ASYNC_ACTION) {
      return {
        ...state,
        asyncActionsInProgress: state.asyncActionsInProgress + 1
      };
  } else if (actionTypesForAsyncEnd(action.type)) {
      return {
        ...state,
        asyncActionsInProgress: state.asyncActionsInProgress -1
      };
  } 
  
  return state;
}
