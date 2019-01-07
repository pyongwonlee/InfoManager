import directorService from '../services/directorService';
import * as actionTypes from './actionTypes';

export const actionCreators = {
  getDirectors: () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.REQUEST_LOAD_DIRECTORS  });

    try {
      const response = await directorService.getDirectors();
      dispatch({ type: actionTypes.RECEIVE_LOAD_DIRECTORS, data: response.data });
    } catch (error) {
      console.error(error);
    }
  }
};
