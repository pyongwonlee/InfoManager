import { combineReducers } from 'redux';
import * as companyReducers from '../reducers/companyReducer';
import * as categoryReducer from '../reducers/categoryReducer';
import * as directorReducers from '../reducers/directorReducer';
import * as asyncStatusReducer from '../reducers/asyncStatusReducer';

const rootReducers = combineReducers({
  companyList: companyReducers.companyListReducer,
  categoryList: categoryReducer.categoryListReducer,
  categoryData: categoryReducer.categoryGetReducer,
  categoryActions: categoryReducer.categoryActionsReducer,
  directorList: directorReducers.directorListReducer,
  asyncStatus: asyncStatusReducer.asyncStatusReducer
});

export default rootReducers;