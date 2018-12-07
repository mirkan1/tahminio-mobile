import React, { Component } from 'react';
import { View, FlatList, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { matchFetch, getMatchInfo } from '../actions';
import { Spinner, Base } from './common';
import { Actions } from 'react-native-router-flux';
import { SearchBar } from 'react-native-elements';
import MatchCard from './MatchCard';


class MatchPage extends Component {
  componentDidMount() {
    this.props.matchFetch();
  }

  onPageChange(match) {
    this.props.getMatchInfo({ match });
    Actions.MatchDetail();
  }

  showData() {
    // TODO
    // Learn FlatList better
    // val'i kullan unutma
    // Lig'e gore sirala:
    //   ayni ligdeki takimlar alt alta gelsinler
    
    // const league = [];
    // for (const i of "DATAYI_GIR") { league.includes(i.league.name) ? {} : league = league.concat(i.league.name) };
    
    const { render, match } = this.props;

    if (render) {
      return (
        <View style={{ width: Dimensions.get('window').width }}>
          <FlatList
            data={match}
            renderItem={({ item }) => this.renderRow(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
    return <Spinner size="large" />;
  }

  renderRow(match) {
    return (
      <MatchCard 
        match={match}
        onPress={() => this.onPageChange(match)}
      />
    );
  }

  render() {
    return (
      <Base>
        {this.showData()}
      </Base>
    );
  }
}

const mapStateTopProps = state => {
  return { 
    render: state.team.render,
    match: state.team.match
  };
};

export default connect(mapStateTopProps, { 
  matchFetch,
  getMatchInfo })(MatchPage);
