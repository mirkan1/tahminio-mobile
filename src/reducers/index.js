import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import PageReducer from './PageReducer';
import MatchReducer from './MatchReducer';
import SearchReducer from './SearchReducer';
import LeaderboardReducer from './LeaderboardReducer'

export default combineReducers({
  user: UserReducer,
  page: PageReducer,
  team: MatchReducer,
  search: SearchReducer,
  leaderboard: LeaderboardReducer,
});
