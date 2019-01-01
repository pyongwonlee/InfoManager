import directorService from '../services/directorService';

const requestLoadDirectorsType = 'REQUEST_LOAD_DIRECTORS';
const receiveLoadDirectorsType = 'RECEIVE_LOAD_DIRECTORS';
const initialState = { 
  isLoading: true,
  totalCount: 0,
  directors: [
  ] 
};

export const actionCreators = {
  getDirectors: () => async (dispatch, getState) => {
    dispatch({ type: requestLoadDirectorsType  });

    try {
      const response = await directorService.getDirectors();
      dispatch({ type: receiveLoadDirectorsType, data: response.data });
    } catch (error) {
      console.error(error);
    }
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  switch(action.type) {
    case requestLoadDirectorsType: {
      return {
        ...state,
        isLoading: true
      };
    } 
    case receiveLoadDirectorsType: {
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
