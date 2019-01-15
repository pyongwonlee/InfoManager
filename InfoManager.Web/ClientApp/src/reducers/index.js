import { combineReducers } from 'redux';
import * as companyReducers from '../reducers/companyReducer';
import * as categoryReducers from '../reducers/categoryReducer';
import * as directorReducers from '../reducers/directorReducer';

const rootReducers = combineReducers({
  companyList: companyReducers.companyListReducer,
  categoryList: categoryReducers.categoryListReducer,
  categoryData: categoryReducers.categoryGetReducer,
  categoryCreate: categoryReducers.categoryCreateReducer,
  cateoryUpdate: categoryReducers.categoryUpdateReducer,
  categoryDelete: categoryReducers.categoryDeleteReducer,
  directorList: directorReducers.directorListReducer
});

export default rootReducers;