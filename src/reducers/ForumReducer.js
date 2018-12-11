import {
	MAKE_PREDICTION,
  IS_LOADING,
	GET_PREDICTION_LIST,
  UPVOTE_PREDICTION,
  UNDO_UPVOTE_PREDICTION,
  POST_MESSAGE_TO_MATCH,
  GET_LIST_OF_MESSAGES,
  ERROR_ACCURED,
} from '../actions/types';

const INITIAL_STATE = { 
  loading: false,
  predictions: null,
  upvoteState: false,
  match_messages: null,
  error: null,
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
    case POST_MESSAGE_TO_MATCH:
      return { ...state, };
    case GET_LIST_OF_MESSAGES:
      return { ...state, loding: false, match_messages: action.payload };
    case ERROR_ACCURED:
      return { ...state, loading: false, error: "Something went wrong" };
    default:
      return state;
  }
};