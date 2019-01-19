import * as actionTypes from './actionTypes';

export function beginAsynAction() {
  return {
    type: actionTypes.BEGIN_ASYNC_ACTION
  };
}