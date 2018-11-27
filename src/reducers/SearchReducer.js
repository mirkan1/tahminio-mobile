import { 
  SEARCH_USER,
  SEARCH_WORD_CHANGED,
  SEARCH_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  searchWord: '',
  searchEnd: null,
  searchedData: null,
  loading: false,
}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_USER:
      return { ...state, searchEnd: action.payload, loading: true };
    case SEARCH_WORD_CHANGED:
      return { ...state, searchWord: action.payload };
    case SEARCH_SUCCESS:
      return { ...state, searchedData: action.payload, loading: false };
    default:
      return state;
  }
};
