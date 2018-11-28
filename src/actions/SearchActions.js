import axios from 'axios';
import { 
	SEARCH_USER,
	SEARCH_WORD_CHANGED,
	SEARCH_SUCCESS,
  SEARCH_FAIL,
} from './types';

export const searchWordChanged = (text) => {
  return {
    type: SEARCH_WORD_CHANGED,
    payload: text
  };
};

export const searchUser = (token, queryWord) => {
  return (dispatch) => {
    dispatch({ type: SEARCH_USER });
    
    axios.get(`http://api.tahmin.io/v1/search/users/?query=${queryWord}`,
      { headers: { Authorization: `Token ${token}` } })
      .then(response => {
        SearchSuccess(dispatch, response.data);
      })
      .catch(() => SearchFail(dispatch));
  };
};

const SearchSuccess = (dispatch, queryWord) => {
  dispatch({
    type: SEARCH_SUCCESS,
    payload: queryWord
  });
};

const SearchFail = (dispatch) => {
  dispatch({
    type: SEARCH_FAIL
  });
};