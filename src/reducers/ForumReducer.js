import {
	MAKE_PREDICTION,
  IS_LOADING,
	GET_PREDICTION_LIST,
  UPVOTE_PREDICTION,
  UNDO_UPVOTE_PREDICTION,
} from '../actions/types';

const INITIAL_STATE = { 
  loading: false,
  predictions: null,
  upvoteState: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, loading: true };
    case GET_PREDICTION_LIST:
      return { ...state, loading: false, predictions: action.payload };
    case UPVOTE_PREDICTION:
      return { ...state };
    case UNDO_UPVOTE_PREDICTION:
      return { ...state };
    default:
      return state;
  }
};