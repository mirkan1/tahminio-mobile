import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
// or any pure javascript modules available in npm
//import { Card } from 'react-native-paper';


class MatchDetail extends Component {
  // TODO
  // Insert style
  componentDidMount() {}

  render() {
    const { 
      away_team, home_team, league,
      handicap, first_half_score, iddaa_code,
      message_count, minute, prediction_count,
      datetime, score, key, } = this.props.teams
    return (
      <View>
        <Text>===MATCHDETAIL PAGE===</Text>
        <Text>LEAGUE: {league.name}</Text>
        <Text>HOME_TEAM: {home_team.name}</Text>
        <Text>AWAY_TEAM: {away_team.name}</Text>
        <Text>HANDICAP: {handicap}</Text>
        <Text>FIRST_HALF_SCORE: {first_half_score}</Text>
        <Text>IDDAA_CODE: {iddaa_code}</Text>
        <Text>MESSAGE_COUNT: {message_count}</Text>
        <Text>MINUTE: {minute}</Text>
        <Text>PREDICTION_COUNT: {prediction_count}</Text>
        <Text>DATETIME: {Date(datetime)}</Text>
        <Text>SCORE: {score}</Text>
        <Text>KEY: {key}</Text>
      </View>
    );
  }
}

const mapStateTopProps = state => {
  return { teams: state.team.currentTeams };
};

export default connect(mapStateTopProps, {})(MatchDetail);

/*
export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>
          Change code in the editor and watch it change on your phone! Save to get a shareable url.
        </Text>
        <Card style={{ margin: 15, padding: 8 }}>
          <Text style={{ paddingLeft: 70, fontWeight: 'bold' }}>
            Arsenal 1-2 Kasimpasa
          </Text>
        </Card>
        <View style={{ flex: 2,backgroundColor: '#123', paddingTop: 20}}>
          <Card>
            <Text>VIEW2</Text>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

*/