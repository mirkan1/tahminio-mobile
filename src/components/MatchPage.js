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
        console.log(response)
        this.setState({ 
          render: true,
          teams: _.map(response.data, (item, key) => {return {...item, key}})
        })
      })
      .catch(err => {console.log(err)})
  };

  showData(){
    // TODO
    // Fix key error:
    //   VirtualizedList: missing keys for items, make sure to specify a key property 
    //   on each item or provide a custom keyExtractor.
    // Learn FlatList better
    // val'i kullan unutma
    // Lig'e gore sirala:
    //   ayni ligdeki takimlar alt alta gelsinler
    if (this.state.render){
      return (
        <View>
        <FlatList
          data={this.state.teams}
          renderItem={({ item }) => this.renderRow(item)}//<Text>{item.away_team.name}</Text>}
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
