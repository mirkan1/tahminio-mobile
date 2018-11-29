import { 
  GET_ALL_TIME_LEADERBOARD,
  GET_ALL_TIME_LEADERBOARD_TOTAL_PAGE_NUM,
} from '../actions/types';

const INITIAL_STATE = {
  total_page: '',
  page: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_TIME_LEADERBOARD_TOTAL_PAGE_NUM:
    	return { ...state, total_page: actopn.payload };
    case GET_ALL_TIME_LEADERBOARD:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
