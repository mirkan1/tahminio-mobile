import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import PageReducer from './PageReducer';
import MatchReducer from './MatchReducer';
import SearchReducer from './SearchReducer';
import LeaderboardReducer from './LeaderboardReducer';
import ForumReducer from './ForumReducer';

export default combineReducers({
  user: UserReducer,
  page: PageReducer,
  team: MatchReducer,
  search: SearchReducer,
  leaderboard: LeaderboardReducer,
  forum: ForumReducer,
});
