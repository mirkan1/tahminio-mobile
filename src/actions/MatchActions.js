import axios from 'axios';
import _ from 'lodash';
import { 
  MATCH_FETCH, 
  MATCH_CLICKED,
  MATCH_INFO,
} from './types';

export const matchFetch = () => {
  return (dispatch) => {
    //dispatch({ type: MATCH_FETCH });

    axios.get('http://api.tahmin.io/v1/matches/?format=json')
      .then(response => {
        dispatch({
          type: MATCH_FETCH,
          payload: _.map(response.data, (item, key) => { 
            return { ...item, key }; 
          })
        });
      })
      .catch(err => { console.log(err); });
  };
};


export const clickedMatch = (value) => {
  return {
    type: MATCH_CLICKED,
    payload: value
  };
};

export const getMatchInfo = (info) => {
  return {
    type: MATCH_INFO,
    payload: info.match
  };
};
