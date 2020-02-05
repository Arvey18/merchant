import {combineReducers} from 'redux';

import apiCallProgress from './api-call-progress';
import user from './users';
import merchants from './merchants';
import search from './search';

const rootReducer = combineReducers({
  apiCallProgress,
  user,
  merchants,
  search,
});

export default rootReducer;
