import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { matchFetch, pageChanged, getMatchInfo } from '../actions';
import { Spinner } from './common';
import ListItem from './ListItem';


class MatchPage extends Component {
  componentDidMount() {
    this.props.matchFetch();
  }

  onPageChange(page, match) {
    // Changes page to MatchDetail and takes argument of the clicked match
    this.props.pageChanged({ page });
    this.props.getMatchInfo({ match });
  }

  showData() {
    // TODO
    // Fix key error:
    //   VirtualizedList: missing keys for items, make sure to specify a key property 
    //   on each item or provide a custom keyExtractor.
    // Learn FlatList better
    // val'i kullan unutma
    // Lig'e gore sirala:
    //   ayni ligdeki takimlar alt alta gelsinler
    
    // const league = [];
    // for (const i of "DATAYI_GIR") { league.includes(i.league.name) ? {} : league = league.concat(i.league.name) };
    
    const { render, match } = this.props;

    if (render) {
      return (
        <View>
          <FlatList
            data={match}
            renderItem={({ item }) => this.renderRow(item)}
          />
        </View>
      );
    }
    return <Spinner size="large" />;
  }

  renderRow(match) {
    return (
      <ListItem 
        match={match}
        onPress={() => this.onPageChange('match_detail', match)}
      />
    );
  }

  render() {
    return (
      <View>
        {this.showData()}
      </View>
    );
  }
}

const mapStateTopProps = state => {
  return { render: state.team.render, match: state.team.match };
};

export default connect(mapStateTopProps, { 
  matchFetch,
  pageChanged,
  getMatchInfo })(MatchPage);
