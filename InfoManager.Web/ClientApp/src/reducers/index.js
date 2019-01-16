import { combineReducers } from 'redux';
import * as companyReducers from '../reducers/companyReducer';
import categoryReducer from '../reducers/categoryReducer';
import * as directorReducers from '../reducers/directorReducer';

const rootReducers = combineReducers({
  companyList: companyReducers.companyListReducer,
  categoryData: categoryReducer,
  directorList: directorReducers.directorListReducer
});

export default rootReducers;