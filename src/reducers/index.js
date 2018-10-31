import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PageReducer from './PageReducer';
import MatchReducer from './MatchReducer';

export default combineReducers({
  auth: AuthReducer,
  page: PageReducer,
  team: MatchReducer,
});