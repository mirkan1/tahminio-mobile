import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { ButtonGroup, Divider } from 'react-native-elements';

class MatchDetail extends Component {
  // TODO
  // Insert style
  componentDidMount() {}

  render() {
    const { 
      away_team, home_team, league,
      handicap, first_half_score, iddaa_code,
      message_count, minute, prediction_count,
      datetime, score, key, } = this.props.teams;

    const buttons = ['One', 'Two', 'Three'];

    return (
      <View style={{ backgroundColor: '#FF0090' }}>
        <Text style={styles.paragraph}>
          {league.name}
        </Text>
        <View style={{ margin: 15, padding: 10, flexDirection: 'row', backgroundColor: '#fff' }}>
          <View style={{ flex: 1, }}>
            <Image
              source={{ uri: home_team.logo }}
              style={styles.thumbnailStyle}
            />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 25, flex:2, }}>
            <Text style={{ fontWeight: 'bold', }}>
              {home_team.name} {first_half_score}|{score} {away_team.name}
            </Text>
          </View>
          <View style={{ flex: 1, }}>
            <Image
              source={{ uri: away_team.logo }}
              style={styles.thumbnailStyle}
            />
          </View>
        </View>
          <ButtonGroup
            onPress={() => console.log('pressed')}
            selectedIndex={1}
            buttons={buttons}
            containerStyle={{height: 40 }}
          />
          <Divider style={{ backgroundColor: 'black' }} />
        <View style={{ flex: 2, backgroundColor: '#123' }}>
          <Card>
            <Text>HANDICAP: {handicap}</Text>
            <Text>IDDAA_CODE: {iddaa_code}</Text>
            <Text>MESSAGE_COUNT: {message_count}</Text>
            <Text>MINUTE: {minute}</Text>
            <Text>PREDICTION_COUNT: {prediction_count}</Text>
            <Text>DATETIME: {Date(datetime)}</Text>
            <Text>KEY: {key}</Text>
          </Card>
        </View>
      </View>
    );
  }
};

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  thumbnailStyle: {
    height: 80,
    width: 80,
  },
};

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