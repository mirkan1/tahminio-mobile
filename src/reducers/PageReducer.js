import { PAGE_CHANGED } from '../actions/types';

const INITIAL_STATE = { 
  pageName: '',
  previousPage: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAGE_CHANGED:
      return { 
      	...state,
      	previousPage: state.previousPage === action.payload ? '' : state.pageName,
      	pageName: action.payload,
    };
    default:
      return state;
  }
};
