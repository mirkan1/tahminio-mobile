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
	//////////////////////////////////////////////////////////////
	// TODO														//
	// manage how to map matches under their league!			//
	//////////////////////////////////////////////////////////////

	renderMatches() {
		const { teams, league } = this.state;
		const wholeLeague = []
		// var lig = [];
		// for (let i=0;i<this.state.teams.length;i++) {
		// 	if (this.state.teams[i].league.name === this.state.teams[3].league.name) {
		// 		lig.push(this.state.teams[i].home_team.name)
		// 	}
		// };
		// var obj = {};
		function isEmpty(obj) {
			return Object.keys(obj).length === 0;
		};

		for (let i=0;i<teams.length;i++) {
			let value = league.filter(lig => lig === teams[i].league.name);
			if (isEmpty(value)) {
				league.push(teams[i].league.name);
				wholeLeague.push(teams[i].league.name);
			}
		};

		for (let i=0;i<league.length;i++) {
			league[i] = { [league[i]]: []}
		};

		teams.map(team => {
			for (let i=0;i<wholeLeague.length;i++) {
				if (team.league.name === wholeLeague[i]) {
					league[i][ [team.league.name] ].push(team.home_team.name);
					league[i][ [team.league.name] ].push(team.away_team.name);
				};
			}
		});

		// teams.map(team => {
		// 	for (let i=0;i<wholeLeague.length;i++) {
		// 		if (team.league.name === wholeLeague[i]) {
		// 			league.push(teams.map(team =>
		// 				<MatchDetail
		// 					key={team.id}
		// 					home_team={team.home_team} 
		// 					away_team={team.away_team} 
		// 					league={team.league}
		// 					score={team.first_half_score}
		// 				/>
		// 				)
		// 			)
		// 		}				
		// 	}
			
		// });

		// return wholeLeague.map(league =>
		// 	<MatchDetail
		// 		key={league}
		// 		team={this.state.teams}
		// 	/>
		// );

		return teams.map(team =>	// if team.lauage.id == 81 //
			<MatchDetail
				key={team.id}
				home_team={team.home_team} 
				away_team={team.away_team} 
				league={team.league}
				score={team.first_half_score}
			/>
		);
	}; 

	renderMatchesWithLeague() {
		const { teams, league } = this.state;

		const wholeLeague = [];
		for (let i=0;i<teams.length;i++) {
					let value = league.filter(lig => lig === teams[i].league.name);
					if (isEmpty(value)) {
						league.push(teams[i].league.name);
						wholeLeague.push(teams[i].league.name);
					}
				};

		function isEmpty(obj) {
			return Object.keys(obj).length === 0;
		};

		return wholeLeague.map(league => {
			const kasim = teams.filter(team => team.league.name === league);
			return kasim.map(team =>
				<MatchDetail
					key={team.id}
					home_team={team.home_team} 
					away_team={team.away_team} 
					league={team.league}
					score={team.first_half_score}
				/>
			)  
		})

		if (!isEmpty(teams)) {
			const kasim = teams.filter(team => team.league.id === 81); 
			return kasim.map(team => 
				<MatchDetail
					key={team.id}
					home_team={team.home_team} 
					away_team={team.away_team} 
					league={team.league}
					score={team.first_half_score}
				/>
			)
		};

		// teams.map(team => {
		// 	if (team.league.id === 81) {
		// 		return (
		// 			<MatchDetail
		// 				key={team.id}
		// 				home_team={team.home_team} 
		// 				away_team={team.away_team} 
		// 				league={team.league}
		// 				score={team.first_half_score}
		// 			/>
		// 		)
		// 	}
		// })
	}
	render() {
		return (
			<ScrollView>
        <Text>MATHLISH_VIEW</Text>
				{this.renderMatchesWithLeague()}
			</ScrollView>
		);
	};
};


export default MatchList;