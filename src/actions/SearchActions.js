import axios from 'axios';
import { 
	SEARCH_USER,
	SEARCH_WORD_CHANGED,
	SEARCH_SUCCESS 
} from './types';

export const searchWordChanged = (text) => {
  return {
    type: SEARCH_WORD_CHANGED,
    payload: text
  };
};

export const searchUser = (token, queryWord) => {
  console.log('TOKEN:', token);
  return (dispatch) => {
    dispatch({ type: SEARCH_USER });
    axios.get(`http://api.tahmin.io/v1/search/users/?query=${queryWord}`,
      { headers: { Authorization: `Token ${token}` } })
      .then(response => {
        SearchSuccess(dispatch, response.data);
      })
      .catch(error => console.log("Search error", error));
      // GIVES ERROR
      // Error: Request failed with status code 500
      /* {
        LoginUserSuccess(dispatch, user)
      })
			.catch(() => LoginUserFail(dispatch)); */
  };
};

const SearchSuccess = (dispatch, queryWord) => {
  // TODO sometimes gives unexpected login error
  dispatch({
    type: SEARCH_SUCCESS,
    payload: queryWord
  });
  //Actions.main();   // MAGIC AQU
};