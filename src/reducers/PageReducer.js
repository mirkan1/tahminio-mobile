import { PAGE_CHANGED } from '../actions/types';

const INITIAL_STATE = { 
  pageName: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PAGE_CHANGED:
      return { ...state, pageName: action.payload };
    default:
      return state;
  }
};
