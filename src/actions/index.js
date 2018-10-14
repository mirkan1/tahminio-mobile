import axios from 'axios';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER
  // PAGE_CHANGED
} from './types';

// export const pageChanged = (page) => {
//   return {
//     type: PAGE_CHANGED,
//     payload: page
//   }
// };

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED, // "email_changed"
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
     
    axios.post('http://api.tahmin.io/v1/users/login/', {
      'username': email,
      'password': password
    })
      .then(user => LoginUserSuccess(dispatch, user))
      .catch(() => { LoginUserFail(dispatch) });
  };
};

const LoginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
}

const LoginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })
}