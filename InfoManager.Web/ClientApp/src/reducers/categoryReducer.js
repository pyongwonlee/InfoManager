import * as actionTypes from '../actions/actionTypes';

const initialListState = { 
    isLoading: true,
    totalCount: 0,
    categories: [] 
};

const initialItemState = {
    category: {
      categoryId: 0,
      name: '',
      companies: []
    }
};

const initialCreateState = {
  category: {
    name: ''
  },
  success: true,
  errors: []
};

const initialUpdateState = {
  category: {
    name: ''
  },
  success: true,
  errors: []
};

const initialDeleteState = {
  success: true,
  errors: []
};

export const categoryListReducer = (state = initialListState, action) => {
  switch (action.type) {
    case actionTypes.REQUEST_LOAD_CATEGORIES: {
      return {
        ...state,
        isLoading: true
      };
    }
    case actionTypes.RECEIVE_LOAD_CATEGORIES: {
      return {
        ...state,
        totalCount: action.data.totalCount,
        categories: action.data.items,
        isLoading: false
      };
    }
    default:
      return state;
  }
};

export const categoryGetReducer = (state = initialItemState, action) => {
  switch (action.type) {
    case actionTypes.GET_CATEGORY: {
      return {
        ...state,
        category: action.data.item
      };
    }
    default:
      return state;
  }
};

export const categoryCreateReducer = (state = initialCreateState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_CATEGORY: {
      return {
        ...state,
        success: action.data.success,
        errors: action.data.success
      };
    } 
    default:
      return state;
  }
}

export const categoryUpdateReducer = (state = initialUpdateState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_CATEGORY: {
      return {
        ...state,
        success: action.data.success,
        errors: action.data.success
      };
    } 
    default:
      return state;
  }
}

export const categoryDeleteReducer = (state = initialDeleteState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_CATEGORY: {
      return {
        ...state,        
        success: action.data.success,
        errors: action.data.success
      };
    } 
    default:
      return state;
  }
}
