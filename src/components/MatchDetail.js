import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList } from 'react-native';

class MatchDetail extends Component {
  // TODO
  // Insert match detail here of the clicked match
  componentDidMount() {};

  render() {
    const { away_team, home_team, league } = this.props.teams
    return (
      <View>
        <Text>===MATCHDETAIL PAGE===</Text>
        <Text>LEAGUE: {league.name}</Text>
        <Text>HOME_TEAM: {home_team.name}</Text>
        <Text>AWAY_TEAM: {away_team.name}</Text>
        <Text>HANDICAP: {this.props.teams.handicap}</Text>
        <Text>FIRST_HALF_SCORE: {this.props.teams.first_half_score}</Text>
        <Text>IDDAA_CODE: {this.props.teams.iddaa_code}</Text>
        <Text>MESSAGE_COUNT: {this.props.teams.message_count}</Text>
        <Text>MINUTE: {this.props.teams.minute}</Text>
        <Text>PREDICTION_COUNT: {this.props.teams.prediction_count}</Text>
        <Text>DATETIME: {this.props.teams.datetime}</Text>
        <Text>SCORE: {this.props.teams.score}</Text>
        <Text>KEY: {this.props.teams.key}</Text>
      </View>
    )
  }
}

const mapStateTopProps = state => {
  return { teams: state.team.currentTeams };
}
export default connect(mapStateTopProps, {})(MatchDetail);
