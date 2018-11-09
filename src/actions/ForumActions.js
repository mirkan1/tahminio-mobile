import axios from 'axios';
import _ from 'lodash';
import { 
} from './types';

/*matchFetch
clickedMatch
getMatchInfo*/
export const matchFetch = () => {
  // Already done in .MatchActions.js
};

export const makePrediction = ({ match_id, text }) => {
	// AUTH_REQ
  // Description: Creates a prediction about the given match
	// Endpoint `POST /v1/matches/:match_id/predictions/`
	// `NOTE*: "game" is required and it must be from available games list`
	// Response 201 and Prediction object
};

export const getListPrediction = ({ match_id }) => {
  // Description: Returns a list of Prediction objects of today
	// Endpoint `GET /v1/matches/:match_id/predictions/`
	// Response: 200 and list of Prediction objects
};

export const getPrediction = ({ match_id, prediction_id }) => {
  // Description: Returns the requested prediction
	// Endpoint `GET /v1/matches/:match_id/predictions/:prediction_id/`
	// Response: 200 and a Prediction object
};

export const updatePrediction = ({ match_id, prediction_id }) => {
	// AUTH_REQ
  // Description: Updates the requested prediction
	// Endpoint `PATCH /v1/matches/:match_id/predictions/:prediction_id/`
	// Response: 200 and a Prediction object
};

export const postMessageToMatch = ({ match_id, text }) => {
  // AUTH_REQ
	// Description: Posts a message to the match's thread
	// Endpoint `POST /v1/matches/:match_id/messages/`
	// Response: 201 and a message object
};

export const getListOfMessages = () => {
  // AUTH_REQ
  // Description: Returns a list of Prediction objects of today
	// Endpoint `GET /v1/matches/:match_id/messages/`
	// Response: 200 and list of Message objects
};

export const updateMessage = ({ match_id, message_id, new_message }) => {
  // AUTH_REQ
  // Description: Updates the given message to the match's thread
	// Endpoint `PATCH /v1/matches/:match_id/messages/:message_id/`
	// Response: 200 and a message object
};

export const getMessage = ({ match_id, message_id }) => {
  // Description: Returns the requested message
	// Endpoint `GET /v1/matches/:match_id/messages/:message_id/`
	// Response: 200 and a Message object
};

export const upvotePrediction = ({ match_id, prediction_id }) => {
  // Description: Upvotes the given prediction
	// Endpoint `POST /v1/matches/:match_id/predictions/:prediction_id/upvote/`
	// Response: 200
};

export const undoUptovePrediction = ({ match_id, prediction_id }) => {
  // Description: Undo upvotes the given prediction
	// Endpoint `POST /v1/matches/:match_id/predictions/:prediction_id/undoupvote/`
	// Response: 200
};

export const getAMatch = ({ match_id }) => {
  // Already done in .AuthActions.js
};

export const getAvailableGames = ({ match_id }) => {
  // Description: Returns the available game types for prediction
	// Endpoint `GET /v1/matches/:match_id/games/`
	// Response 200 and list of Game objects
};

export const getMatchlistMeta = () => {
  // Description: Returns the metadata of the matchlist. For now it only contains dates.
	// Endpoint `GET /v1/matches/meta/`
	// Response 200 and
};
