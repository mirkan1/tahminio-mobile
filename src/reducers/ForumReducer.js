import {
	MAKE_PREDICTION,
  IS_LOADING,
	GET_PREDICTION_LIST,

} from '../actions/types';

const INITIAL_STATE = { 
  loading: false,
  predictions: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case IS_LOADING:
      return { ...state, loading: true };
    case GET_PREDICTION_LIST:
      return { ...state, loading: false, predictions: action.payload}
    default:
      return state;
  }
};