import React, { Component } from 'react';
import { ScrollView } from 'react-native'; // like normal View but scrollable
import axios from 'axios';
import MatchDetail from './AlbumDetail';

class MatchList extends Component {
	state = {teams: []};

	componentWillMount() {
		//console.log("did it");		// use debug mode to see the console.log
		axios.get('http://api.tahmin.io/v1/matches/?format=json')
			.then(response => this.setState({teams: response.data[0]}));
	};

	renderMatches() {
		return (
			<MatchDetail team={this.state.teams} />
		);
	};

	render() {
		//console.log(this.state.teams.league);
		return (
			<ScrollView>
				{this.renderMatches()}
			</ScrollView>
		);
	};
};


export default MatchList;