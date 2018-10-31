import { 
	MATCH_FETCH, 
  MATCH_CLICKED,
  MATCH_RENDER, 
} from '../actions/types';

const INITIAL_STATE = { 
  match: null,
  render: false,
  teams: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MATCH_FETCH:
      return { ...state, render: true, match: action.payload};
    case MATCH_CLICKED:
    	return { ...state, teams: action.payload};
    case MATCH_RENDER:
    	return;
    default:
      return state;
  }
};