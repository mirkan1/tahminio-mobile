import {
	MAKE_PREDICTION,
  IS_LOADING,
	GET_PREDICTION_LIST,
  UPVOTE_PREDICTION,
  UNDO_UPVOTE_PREDICTION,
  POST_MESSAGE_TO_MATCH,
  GET_LIST_OF_MESSAGES,
  ERROR_ACCURED,
  GET_PREDICTION_OPTIONS,
  GET_AVAILABLE_GAMES,
  GET_PREDICTION,
} from '../actions/types';

const INITIAL_STATE = { 
  loading: false,
  predictions: null,
  upvoteState: false,
  match_messages: null,
  error: null,
  prediction_options: null,
  availableGames: null,
  selectedPrediction: null,
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
    case GET_PREDICTION_OPTIONS:
      return { ...state, prediction_options: action.payload, error: null };
    case GET_AVAILABLE_GAMES:
      return { ...state, availableGames: action.payload, error: null }
    case GET_PREDICTION:
      return { ...state, selectedPrediction: action.payload, error: null }
    default:
      return state;
  }
};