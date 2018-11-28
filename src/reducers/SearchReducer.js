import { 
  SEARCH_USER,
  SEARCH_WORD_CHANGED,
  SEARCH_SUCCESS,
  SEARCH_FAIL,
} from '../actions/types';

const INITIAL_STATE = {
  user: null,
  searchWord: '',
  searchEnd: null,
  searchedData: null,
  loading: false,
  error: false,
}


export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_USER:
      return { ...state, searchEnd: action.payload, loading: true };
    case SEARCH_WORD_CHANGED:
      return { ...state, searchWord: action.payload };
    case SEARCH_SUCCESS:
      return { ...state, searchedData: action.payload, loading: false, error: false };
    case SEARCH_FAIL:
      return { ...state, error: true}
    default:
      return state;
  }
};
