import directorService from '../services/directorService';
import * as actionTypes from './actionTypes';

const directorActions = {
  getDirectors: () => {
    return (dispatch, getState) => {      
      dispatch({
        type: actionTypes.REQUEST_LOAD_DIRECTORS  
      });
      
      directorService.getDirectors()
        .then(response => {
          dispatch({ 
            type: actionTypes.RECEIVE_LOAD_DIRECTORS, 
            data: response.data 
          });
        }).catch (error => {
          console.error(error);
        });
    }
  }
};

export default directorActions;