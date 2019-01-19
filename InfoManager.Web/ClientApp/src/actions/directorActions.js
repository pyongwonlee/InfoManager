import directorService from '../services/directorService';
import * as actionTypes from './actionTypes';
import {beginAsynAction} from './asyncStatusActions';

const directorActions = {
  getDirectors: () => {
    return (dispatch, getState) => { 
      dispatch(beginAsynAction());
      
      return directorService.getDirectors()
        .then(response => {
          dispatch({ 
            type: actionTypes.LOAD_DIRECTORS_SUCCESS, 
            data: response.data 
          });
        }).catch (error => {
          console.error(error);
        });
    }
  }
};

export default directorActions;