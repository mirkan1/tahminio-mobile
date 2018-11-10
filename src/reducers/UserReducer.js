import { 
  USERNAME_CHANGED,
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  BIO_CHANGED,
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAIL, 
  USER_LOGIN,
  LOGOUT_USER,
  USER_SIGN_UP,
} from '../actions/types';

const INITIAL_STATE = {
  username: '',
  email: '', 
  password: '',
  first_name: '',
  last_name: '',
  bio: '',
  user: null,
  error: '',
  loading: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
    //
      return { ...state, username: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case FIRST_NAME_CHANGED:
    //
      return { ...state, first_name: action.payload };
    case LAST_NAME_CHANGED:
    //
      return { ...state, last_name: action.payload };
    case BIO_CHANGED:
    //
      return { ...state, bio: action.payload };
    case USER_LOGIN:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      // After logged in with the help of second argument clears INITIAL_STATE
      return { ...state, ...INITIAL_STATE, user: action.payload };  
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false }; 
    case LOGOUT_USER:
      return { ...state, ...INITIAL_STATE, user: null };
    case USER_SIGN_UP:
    //
      return { ...state, loading: true, error: '' };
    default:
      return state;
  }
};
