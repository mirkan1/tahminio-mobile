import axios from 'axios';
import _ from 'lodash';
import { 
} from './types';

export const userSignUp = ({ username, passport, email, first_name=null, last_name=null, bio=null }) => {
  // Description: Creates a new user with given data
  // Endpoint `POST /v1/users/signup/`
};

export const userLogin = () => {
  // Already done in .AuthActions.js
};

export const userGetMe = () => {
  // Description: Returns the information about authed user (current user)
  // Endpoint `GET /v1/users/me/`
  // Response: 200 and UserMe object
};

export const userDeleteMe = () => {
  // Description: Deletes the current user
  // Endpoint `DELETE /v1/users/me/`
  // Response: 204
};

export const userUpdateMe = ({ username, passport, email, first_name=null, last_name=null, bio=null , profile_photo=null }) => {
  // Note: You don't need to send every field. Sending the changing fields is enough.
  // Endpoint `PATCH /v1/users/me/`
  // Response: 200 and UserMe object
};

export const getAnotherUser = ({ user_id }) => {
  // Description: Returns the information about requested user
  // Endpoint `GET /v1/users/:user_id/`
  // Return: 200 and UserDetail object
};

export const userChangePassword = ({ old_password, new_password }) => {
  // Description: Changes the password of authed user
  // Endpoint `PATCH /v1/users/me/password/`
  // Return: 200 and UserMe object
};

export const followUser = ({ user_id }) => {
  // Description: Follows the given user
  // Endpoint `POST /v1/users/:user_id/follow/`
  // Return: 200
};

export const unfollowUser = ({ user_id }) => {
  // Description: Unfollows the given user
  // Endpoint `POST /v1/users/:user_id/unfollow/`
  // Return: 200
};

export const userVerify = ({ verification_key }) => {
  // Description: Verifies the user associated with the given code
  // Endpoint `GET /v1/users/activate/?key=:verification_key`
  // Return: 200
};

export const userSearch = ({ your_query }) => {
  // Description: Searchs the user by username
  // Endpoint `GET /v1/search/users/?query=:your_query`
  // Return 200 and list of SimpleUser objects
};


// Forgot password routine

export const requestPasswordReset = ({ user_identifier }) => {
  // Endpoint `POST /v1/users/forgot_password/`
  // `user_identifier` can be username or email
  // Response is 200 no matter what, for protecting user's privacy
  // After this step, an email will be send to the user, containing a link like this:
  // `tahmin.io/change-password/?key=ABCDE1234567`
  // You will use the key in the url to change the user's password
};

export const ChangePasswordWithKey = ({ key, password }) => {
  // Endpoint `POST /v1/users/change_password/`
  // Response:
  // 200 for successfull password change
  // 404 for invalid key
  // 400 for invalid password
};

export const getMinetTrophies = () => {
  // Endpoint `GET /v1/users/me/trophies/`
  // Response: 200 and list of Trophy objects
};

export const getUserTrophies = ({ user_id }) => {
  // Endpoint `GET /v1/users/:user_id/trophies/`
  // Response: 200 and list of Trophy objects
};

export const allTimeLeaderboard = ({ page_number="total_pages" }) => {
  // Endpoint `GET /v1/leaders/:page_number/`
  // `For total page number send a request to /v1/leaders/total_pages/`
  // Response 200 and list of SimpleUser objects
};

export const getMineProgress = () => {
  // `Authentication token is required in this endpoint`
  // Endpoint `GET /v1/users/me/progression/`
  // Response: 200 and list of TrophyProgression objects
};

export const getUserFeed = () => {
  // `Authentication token is required in this endpoint`
  // Endpoint `GET /v1/users/feed/`
  // Response: 200 and list of Prediction objects
};


