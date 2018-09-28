import React, { Component } from 'react';
import { ScrollView, Text, FlatList, View } from 'react-native';
import axios from 'axios';
import MatchDetail from './MatchDetail';

class MatchList extends Component {
	state = { 
		teams: [],
		away_team: [], 
		home_team: [], 
		league: [],
	};

	componentWillMount() {
		axios.get('http://api.tahmin.io/v1/matches/?format=json')
			.then(response => this.setState({ 
				teams: response.data, }));
				/*away_team: response.data.match.away_team, 
				home_team: response.data.match.home_team,
				league: response.data.match.league }));*/ // tek tek cekecekmisim amk xdxd
	};
	renderMatches() {
		return this.state.teams.map(team => 
			<MatchDetail key={team}
				home_team={team.home_team} 
				away_team={team.away_team} 
				league={team.league}/>
		);
	};

	render() {
		return (
			<ScrollView>
				{this.renderMatches()}
			</ScrollView>
		);
	};
};


export default MatchList;