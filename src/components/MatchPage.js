import axios from 'axios';
import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList } from 'react-native';
import ListItem from './ListItem';


class MatchPage extends Component {
  state = { render: false, teams: null };

  componentWillMount() {
		axios.get('http://api.tahmin.io/v1/matches/?format=json')
			.then(response => {
        this.setState({ 
          render: true,
          teams: _.map(response.data, (key, value) => {return {...key, value}})
        })
      })
      .catch(err => {console.log(err)})
      
      /*away_team: response.data.match.away_team, 
				home_team: response.data.match.home_team,
				league: response.data.match.league }));*/ // tek tek cekecekmisim amk xdxd
  };

  showData(){
    // TODO make it much more beautiful
    // Learn FlatList better
    // val'i kullan unutma
    if (this.state.render){
      return (
        <View>
        <FlatList
          data={this.state.teams}
          renderItem={({ item }) => <Text>{item.away_team.name}</Text>}
        />
        </View>
      )}
  }

  renderRow(match) {
    return <ListItem match={match} />;
  }

  render() {
    return (
      <View>
        {this.showData()}
        <Text>Nothing to show</Text>
      </View>
    )
  }
}

export default MatchPage;
