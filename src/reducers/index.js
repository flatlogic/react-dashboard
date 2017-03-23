import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import navigation from './navigation';

export default combineReducers({
  user,
  runtime,
  navigation,
});
