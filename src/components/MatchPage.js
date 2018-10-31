import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList } from 'react-native';
import { matchFetch, pageChanged, getMatchInfo } from '../actions';
import ListItem from './ListItem';


class MatchPage extends Component {
  componentDidMount() {
    this.props.matchFetch();
  };

  onPageChange(page, match) {
    this.props.pageChanged({ page }); // changes pageName
    this.props.getMatchInfo({ match });

  };

  showData(){
    // TODO
    // Fix key error:
    //   VirtualizedList: missing keys for items, make sure to specify a key property 
    //   on each item or provibde a custom keyExtractor.
    // Learn FlatList better
    // val'i kullan unutma
    // Lig'e gore sirala:
    //   ayni ligdeki takimlar alt alta gelsinler
    const { render, match } = this.props;

    if (render){
      return (
        <View>
        <FlatList
          data={match}
          renderItem={({ item }) => this.renderRow(item)}//<Text>{item.away_team.name}</Text>}
        />
        </View>
    )} else {
        return <Text>Nothing to show</Text>;
      }

  }


  renderRow(match) {
    return (
      <ListItem 
        match={match}
        onPress={() => this.onPageChange('match_detail', match)}
      />
    )
  };

  render() {
    return (
      <View>
        {this.showData()}
      </View>
    )
  }
}

const mapStateTopProps = state => {
  return { render: state.team.render, match: state.team.match };
}
export default connect(mapStateTopProps, { 
  matchFetch,
  pageChanged,
  getMatchInfo })(MatchPage);
