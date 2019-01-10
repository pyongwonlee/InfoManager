import { combineReducers } from 'redux';
import * as categoryReducers from '../reducers/categoryReducer';
import {directorListReducer} from '../reducers/directorReducer';

const rootReducers = combineReducers({
  categoryList: categoryReducers.categoryListReducer,
  categoryCreate: categoryReducers.categoryCreateReducer,
  directorList: directorListReducer
});

export default rootReducers;