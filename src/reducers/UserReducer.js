import { 
  USERNAME_CHANGED,
  EMAIL_CHANGED, 
  PASSWORD_CHANGED,
  FIRST_NAME_CHANGED,
  LAST_NAME_CHANGED,
  BIO_CHANGED,
  PROFILE_PHOTO_CHANGED,
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAIL, 
  USER_LOGIN,
  LOGOUT_USER,
  USER_SIGN_UP,
  USER_UPDATE_ME,
  USER_GET_ME,
  USER_DELETE_ME,
  GET_ANOTHER_USER,
  FOLLOW_PROCESS,
  FOLLOW_USER,
  UNFOLLOW_USER,
  USER_VERIFY,
  GET_USER_TROPHIES,
  GET_USER_FEED,
  REQUEST_PASSWORD_RESET,
} from '../actions/types';

const INITIAL_STATE = {
  token: null,
  username: '',
  email: '', 
  password: '',
  first_name: '',
  last_name: '',
  bio: '',
  profile_photo: '',
  user: null,
  error: '',
  loading: false,
  wantedUser: '',
  trophies: null,
  feed: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USERNAME_CHANGED:
      return { ...state, username: action.payload };
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };
    case FIRST_NAME_CHANGED:
      return { ...state, first_name: action.payload };
    case LAST_NAME_CHANGED:
      return { ...state, last_name: action.payload };
    case BIO_CHANGED:
      return { ...state, bio: action.payload };
    case PROFILE_PHOTO_CHANGED:
    // TODO dunno how to import a photo
      return { ...state, profile_photo: action.payload };
    case USER_LOGIN:
      return { ...state, loading: true, error: '' };
    case LOGIN_USER_SUCCESS:
      // After logged in with the help of second argument clears INITIAL_STATE
      return { ...state, ...INITIAL_STATE, user: action.payload.data , token: action.payload.data.token };  
    case LOGIN_USER_FAIL:
      return { ...state, ...INITIAL_STATE, error: 'Authentication Failed.' }; 
    case LOGOUT_USER:
      return { ...state, ...INITIAL_STATE };
    case USER_SIGN_UP:
      return { ...state, loading: true, error: '' };
    case USER_UPDATE_ME:
      return { ...state, loading: true, error: '' };
    case USER_GET_ME:
      return { ...state, loading: false, error: '' };
    case USER_DELETE_ME: // the same with the LOGOUT_USER
      return { ...state, ...INITIAL_STATE };
    case GET_ANOTHER_USER:
      return { ...state, wantedUser: action.payload.data, followStatus: action.payload.data.is_following };
    case FOLLOW_PROCESS:
      return { ...state, loading: true };
    case FOLLOW_USER:
      return { ...state, loading: false }; 
    case UNFOLLOW_USER:
      return { ...state, loading: false, };
    case USER_VERIFY:
      return { ...state, };
    case USER_VERIFY:
      return { ...state, trophies: action.payload };
    case GET_USER_TROPHIES:
      return { ...state, trophies: action.payload };
    case GET_USER_FEED:
      return { ...state, feed: action.payload, loading: false };
    case REQUEST_PASSWORD_RESET:
    // make
      return { ...state, ...INITIAL_STATE, error: 'A mail sent to your e-mail, Please check it' }
    default:
      return state;
  }
};
