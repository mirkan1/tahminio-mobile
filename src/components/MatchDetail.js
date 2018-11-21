import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image } from 'react-native';
import { Card } from 'react-native-paper';
import { ButtonGroup, Divider } from 'react-native-elements';

const MatchCard = ({ home_team, away_team, first_half_score, score }) => {
  return (
    <View style={styles.matchCardStyle}>
          <View style={{ flex: 1, }}>
            <Image
              source={{ uri: home_team.logo }}
              style={styles.thumbnailStyle}
            />
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 25, flex:2, }}>
            <Text style={{ fontWeight: 'bold', textAlign: 'center', }}>
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
  );
};


class MatchDetail extends Component {
  // TODO
  // Insert style

  render() {
    const { 
      away_team, home_team, league,
      handicap, first_half_score, iddaa_code,
      message_count, minute, prediction_count,
      datetime, score, key, } = this.props.teams;

    const buttons = ['One', 'Two', 'Three'];

    return (
      <View style={{ backgroundColor: '#fff'}}>
        <Text style={styles.paragraph}>
          {league.name}
        </Text>
        
        <Divider style={{ backgroundColor: 'black' }} />

        <MatchCard 
          home_team={home_team} 
          away_team={away_team} 
          first_half_score={first_half_score} 
          score={score} 
        />
        <View style={{ flex: 2, backgroundColor: '#123', marginTop: 125 }}>
          <ButtonGroup
            onPress={() => console.log('pressed')}
            selectedIndex={1}
            buttons={buttons}
            containerStyle={{height: 40 }}
          />

          <Divider style={{ backgroundColor: 'black' }} />
          
          <Card>
            <Text>HANDICAP: {handicap}</Text>
            <Text>IDDAA_CODE: {iddaa_code}</Text>
            <Text>MESSAGE_COUNT: {message_count}</Text>
            <Text>MINUTE: {minute}</Text>
            <Text>PREDICTION_COUNT: {prediction_count}</Text>
            <Text>DATETIME: {datetime}</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  thumbnailStyle: {
    height: 80,
    width: 80,
  },
  matchCardStyle: {
    margin: 15, 
    padding: 10, 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    position: 'absolute', 
    marginTop: 50, 
    borderRadius: 4, 
    borderWidth: 0.5, 
    borderColor: 'black'
  }
};

const mapStateTopProps = state => {
  return { teams: state.team.currentTeams };
};

export default connect(mapStateTopProps, {})(MatchDetail);