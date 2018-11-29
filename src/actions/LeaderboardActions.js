import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  GET_ALL_TIME_LEADERBOARD,
  GET_ALL_TIME_LEADERBOARD_TOTAL_PAGE_NUM,
} from './types';
import { pageChanged } from './index';

export const getAllTimeLeaderboard = (page_number) => {
  // Endpoint `GET /v1/leaders/:page_number/`
  // `For total page number send a request to /v1/leaders/total_pages/`
  // Response 200 and list of SimpleUser objects
  return (dispatch) => {
    axios.get(`http://api.tahmin.io/v1/leaders/${page_number}/`)
      .then(response => {
          dispatch({
            type: GET_ALL_TIME_LEADERBOARD,
            payload: response.data
          })
      })
        .catch(error => console.log(error))
  };
}

export const getLeaderboardPageNumber = () => {
  return (dispatch) => {
    axios.get("http://api.tahmin.io/v1/leaders/total_pages/")
      .then(response => {
        dispatch({
          type: GET_ALL_TIME_LEADERBOARD_TOTAL_PAGE_NUM,
          payload: response.data.total_pages
        })
      })
        .catch(error => console.log(error));
  }
};

