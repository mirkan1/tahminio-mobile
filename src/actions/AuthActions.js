import axios from 'axios';
import { 
  EMAIL_CHANGED, 
  PASSWORD_CHANGED, 
  LOGIN_USER_SUCCESS, 
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
} from './types';

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
			.then(user => {
        LoginUserSuccess(dispatch, user)
      })
			.catch(() => LoginUserFail(dispatch));
  };
};

const LoginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
}

const LoginUserSuccess = (dispatch, user) => {
  // TODO sometimes gives unexpected login error
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  //Actions.main();   // MAGIC AQU
};

export const logoutUser = ({ token }) => {
  console.log("TOKEN:", token);
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    axios.get('http://api.tahmin.io/v1/users/logout/',
      { headers: { Authorization: `Token ${token}` } })
      .then(response => console.log("tokenla logged in", response))
      .catch(error => console.log(error.response))
      // GIVES ERROR
      // Error: Request failed with status code 500
      /* {
        LoginUserSuccess(dispatch, user)
      })
			.catch(() => LoginUserFail(dispatch)); */
  }
}