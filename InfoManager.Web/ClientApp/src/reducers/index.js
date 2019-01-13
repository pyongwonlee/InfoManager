import { combineReducers } from 'redux';
import * as categoryReducers from '../reducers/categoryReducer';
import {directorListReducer} from '../reducers/directorReducer';

const rootReducers = combineReducers({
  categoryList: categoryReducers.categoryListReducer,
  categoryData: categoryReducers.categoryGetReducer,
  categoryCreate: categoryReducers.categoryCreateReducer,
  cateoryUpdate: categoryReducers.categoryUpdateReducer,
  categoryDelete: categoryReducers.categoryDeleteReducer,
  directorList: directorListReducer
});

export default rootReducers;