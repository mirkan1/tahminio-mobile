import _ from 'lodash';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
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
  USER_UPDATE_ME,
  USER_GET_ME,
  USER_DELETE_ME,
  GET_ANOTHER_USER,
  FOLLOW_USER,
  FOLLOW_PROCESS,
  UNFOLLOW_USER,
  USER_VERIFY,
  GET_USER_TROPHIES,
  GET_USER_FEED,
  REQUEST_PASSWORD_RESET,
} from './types';
import { pageChanged } from './index';

export const usernameChanged = (text) => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
};

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const firstnameChanged = (text) => {
  return {
    type: FIRST_NAME_CHANGED,
    payload: text
  };
};

export const lastnameChanged = (text) => {
  return {
    type: LAST_NAME_CHANGED,
    payload: text
  };
};

export const bioChanged = (text) => {
  return {
    type: BIO_CHANGED,
    payload: text
  };
};

export const logoutUser = ({ token }) => {
  return (dispatch) => {
    dispatch({ type: LOGOUT_USER });
    axios.get('http://api.tahmin.io/v1/users/logout/',
      { headers: { Authorization: `Token ${token}` } })
      .then(() => Actions.UserPage())
      .catch(() => Actions.UserPage());
      // GIVES ERROR
      // Error: Request failed with status code 500
      /* {
        LoginUserSuccess(dispatch, user)
      })
      .catch(() => LoginUserFail(dispatch)); */
  };
};

export const userSignUp = ({ username, password, email, first_name, last_name, bio }) => {
  // Description: Creates a new user with given data
  // Endpoint `POST /v1/users/signup/`
  return (dispatch) => {
    dispatch({ type: USER_SIGN_UP });

    axios.post(`http://api.tahmin.io/v1/users/signup/`, {
        username: username,
        password: password,
        email: email,
        first_name: first_name,
        last_name: last_name,
        bio: bio
    })
      .then(user => {
        LoginUserSuccess(dispatch, user);
      })
      .catch(() => LoginUserFail(dispatch));
  };
};

export const userLogin = ({ username, password }) => {
  return (dispatch) => {
    dispatch({ type: USER_LOGIN });

    axios.post('http://api.tahmin.io/v1/users/login/', {
      username: username,
      password: password
    })
      .then(user => {
        LoginUserSuccess(dispatch, user);
      })
      .catch(() => LoginUserFail(dispatch));
  };
};

const LoginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const LoginUserSuccess = (dispatch, user) => {
  // TODO sometimes gives unexpected login error
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  Actions.UserPage();
};

export const userGetMe = ({ token }) => {
  // Description: Returns the information about authed user (current user)
  // Endpoint `GET /v1/users/me/`
  // Response: 200 and UserMe object
  return (dispatch) => {
    dispatch({ type: USER_GET_ME });

    axios.get('http://api.tahmin.io/v1/users/me/', {
      headers: 
      { 
        Authorization: `Token ${token}`
      }
    })
      .then(user => {
        LoginUserSuccess(dispatch, user);
      })
      .catch((err) => console.log(err))
  };
};

export const userDeleteMe = ({ token }) => {
  // Description: Deletes the current user
  // Endpoint `DELETE /v1/users/me/`
  // Response: 204
  return (dispatch) => {
    dispatch({ type: USER_DELETE_ME });

    axios.delete(`http://api.tahmin.io/v1/users/me/`, { 
      headers: 
      { 
        Authorization: `Token ${token}`
      }
    })
      .then(() => {
        Actions.UserPage();
        //LoginUserSuccess(dispatch, user);
      })
      .catch((err) => console.log(err))
  };
};

export const userUpdateMe = ({ token, username=null, password=null, email=null, first_name=null, last_name=null, bio=null , profile_photo=null }) => {
  // Note: You don't need to send every field. Sending the changing fields is enough.
  // Endpoint `PATCH /v1/users/me/`
  // Response: 200 and UserMe object
  return (dispatch) => {
    dispatch({ type: USER_UPDATE_ME });

    axios.patch(`http://api.tahmin.io/v1/users/me/`,
      {
      "username": username,
      //"password": password,
      "email": email,
      "first_name": first_name,
      "last_name": last_name,
      "bio": bio,
      //"profile_photo": profile_photo
      },
      {
      headers: {
        Authorization: `Token ${token}` 
      },
    })
      .then(user => {
        LoginUserSuccess(dispatch, user);
      })
      .catch(() => LoginUserFail(dispatch));
  };
};

export const getAnotherUser = ( user_id, { token } ) => {
  // Description: Returns the information about requested user
  // Endpoint `GET /v1/users/:user_id/`
  // Return: 200 and UserDetail object
  return (dispatch) => {
    axios.get(`http://api.tahmin.io/v1/users/${user_id}/`, { 
      headers: 
      { 
        Authorization: `Token ${token}`
      }
    })
      .then(user_detail => {
        dispatch({ 
          type: GET_ANOTHER_USER,
          payload: user_detail
        }),
        Actions.WantedUser();
      })
      .catch(
        // return to the same page with and error
        error => console.log(error));
  };
};

export const userChangePassword = ({ old_password, new_password, token }) => {
  // Description: Changes the password of authed user
  // Endpoint `PATCH /v1/users/me/password/`
  // Return: 200 and UserMe object
  return (dispatch) => {
    dispatch({ type: USER_CHANGE_PASSWORD });

    axios.patch(`http://api.tahmin.io/v1/users/me/password/`, { 
      headers: 
      {
        Authorization: `Token ${token}`,
        "old_password": old_password,
        "new_password": new_password
      }
    })
      .then(user_detail => {
        console.log(user_detail)
        // render to the user profile page
      })
      .catch(
        // return to the same page with and error
        error => console.log(error));
  };
};

export const followUser = (user_id, { token }) => {
  // Description: Follows the given user
  // Endpoint `POST /v1/users/:user_id/follow/`
  // Return: 200
  return (dispatch) => {
    dispatch({ type: FOLLOW_PROCESS })

    axios.post(`http://api.tahmin.io/v1/users/${user_id}/follow/`, { 
      headers: 
      { 
        Authorization: `Token ${token}`
      }
    })
      .then(() => {
        dispatch({ 
          type: FOLLOW_USER
        });
      })
      .catch((err) => console.log(err));
  };
};

export const unfollowUser = (user_id, { token }) => {
  // Description: Unfollows the given user
  // Endpoint `POST /v1/users/:user_id/unfollow/`
  // Return: 200
  return (dispatch) => {
    dispatch({ type: FOLLOW_PROCESS })

    axios.post(`http://api.tahmin.io/v1/users/${user_id}/unfollow/`, { 
      headers: 
      { 
        Authorization: `Token ${token}`
      }
    })
      .then(() => {
        dispatch({ 
          type: UNFOLLOW_USER
        });
      })
      .catch((err) => console.log(err));
  };
};

export const userVerify = ({ verification_key }) => {
  // Description: Verifies the user associated with the given code
  // Endpoint `GET /v1/users/activate/?key=:verification_key`
  // Return: 200

  // - Not verified in time -> User failed to activate his account within 12 hours.
  // - Verification not found -> Verification key is not found in the database.
  return (dispatch) => {
    dispatch({ type: USER_VERIFY });

    axios.get(`http://api.tahmin.io/v1/users/activate/?key=:${verification_key}`)
      .then(() => {
        // render to the user profile
      })
      .catch(
        // return to the same page with and error
        error => console.log(error));
  };
};

// Forgot password routine

export const requestPasswordReset = (user_identifier) => {
  // Endpoint `POST /v1/users/forgot_password/`
  // `user_identifier` can be username or email
  // Response is 200 no matter what, for protecting user's privacy
  // After this step, an email will be send to the user, containing a link like this:
  // `tahmin.io/change-password/?key=ABCDE1234567`
  // You will use the key in the url to change the user's password
  return (dispatch) => {
    axios.post(`http://api.tahmin.io/v1/users/forgot_password/`, { 
      user_identifier: user_identifier
    })
      .then(response => {
        console.log(response.data),
        dispatch({ type: REQUEST_PASSWORD_RESET });
      })
  };
};

export const changePasswordWithKey = ({ key, password }) => {
  // Endpoint `POST /v1/users/change_password/`
  // Response:
  // 200 for successfull password change
  // 404 for invalid key
  // 400 for invalid password
  // `tahmin.io/change-password/?key=ABCDE1234567`
  return (dispatch) => {
    dispatch({ type: CHANGE_PASSWORD_WITH_KEY });

    axios.post(`http://api.tahmin.io/v1/users/change_password/`, { 
      headers:
      { 
        key: key,
        password: password
      }
    })
      .then(() => {
        // render to the user profile
      })
      .catch(
        // return to the same page with and error
        error => console.log(error));
  };
};

export const getUserTrophies = () => {
  // DOES NOT WORK AT ALL
  // Endpoint `GET /v1/users/me/trophies/`
  // Response: 200 and list of Trophy objects
  return (dispatch) => {
    axios.get(`http://api.tahmin.io/v1/users/me/trophies`)
      .then(response => {
        console.log(response.data),
        dispatch({
          type: GET_USER_TROPHIES,
          payload: response.data
        }),
        Actions.TrophyPage();
      })
      .catch(
        // return to the same page with and error
        error => console.log(error));
  };
};

export const getAnotherUserTrophies = (user_id) => {
  // Endpoint `GET /v1/users/:user_id/trophies/`
  // Response: 200 and list of Trophy objects
  return (dispatch) => {
    axios.get(`http://api.tahmin.io/v1/users/${user_id}/trophies`)
      .then(response => {
        dispatch({
          type: GET_ANOTHER_USER_TROPHIES,
          payload: response.data
        }),
        Actions.TrophyPage();
      })
      .catch(
        // return to the same page with and error
        error => console.log(error));
  };
};

export const getUserTrophyProgress = ({ token }) => {
  // AUTH_REQ
  // Endpoint `GET /v1/users/me/progression/`
  // Response: 200 and list of TrophyProgression objects
  return (dispatch) => {
    dispatch({ type: GET_USER_TROPHY_PROGRESS });

    axios.get(`http://api.tahmin.io/v1/uesrs/me/progression`, { 
      headers: 
      { 
        Authorization: `Token ${token}`
      }
    })
      .then((TrophyProgression) => {
        console.log(TrophyProgression)
        // render to the user profile
      })
      .catch(
        // return to the same page with and error
        error => console.log(error));
  };
};

export const getUserFeed = ({ token }) => {
  // AUTH_REQ
  // Endpoint `GET /v1/users/feed/`
  // Response: 200 and list of Prediction objects
  return (dispatch) => {
    dispatch({ type: USER_UPDATE_ME }); // Render button

    axios.get(`http://api.tahmin.io/v1/users/feed/`, { 
      headers: 
      { 
        // Authorization: `Token ${token}`
        Authorization: `Token d2fd1d30641a7a0b839ea4565f06f654456236fe`
      }
    })
      .then((response) => {
        dispatch({ 
          type: GET_USER_FEED,
          payload: _.map(response.data, (item, key) => { 
            return { ...item, key }; 
          })
        })
      })
      .catch(error => console.log(error));
  };
};


