import { 
  MATCH_FETCH, 
  MATCH_CLICKED,
  MATCH_RENDER,
  MATCH_INFO, 
} from '../actions/types';

const INITIAL_STATE = { 
  match: null,
  render: false,
  teams: '',
  currentTeams: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case MATCH_FETCH:
      return { ...state, render: true, match: action.payload };
    case MATCH_CLICKED:
      return { ...state, teams: action.payload };
    case MATCH_INFO:
      return { ...state, currentTeams: action.payload };
    default:
      return state;
  }
};
