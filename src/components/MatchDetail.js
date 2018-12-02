import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, Dimensions } from 'react-native';
import { Card } from 'react-native-paper';
import { ButtonGroup, Divider } from 'react-native-elements';

const MatchCard = ({ home_team, away_team, first_half_score, score }) => {
  return (
    <View style={styles.matchCardStyle}>
      <View style={{ flex: 1, }}>
        <Image
          source={{ uri: 
            home_team.logo !== null
            ? home_team.logo
            : 'https://www.designevo.com/res/templates/thumb_small/blue-star-and-gray-soccer.png'
          }}
          style={styles.thumbnailStyle}
        />
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 25, flex:2, }}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center', }}>
          {home_team.name} {first_half_score}|{score}
        </Text>
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 25, flex:1, }}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
          First Half Score: {first_half_score} Score: {score}
        </Text>
      </View>


      <View style={{ flexDirection: 'row-reverse', justifyContent: 'center', alignItems: 'center', paddingTop: 25, flex:2, }}>
        <Text style={{ fontWeight: 'bold', textAlign: 'center', }}>
          {away_team.name}
        </Text>
      </View>

      <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
        <Image
          source={{ uri: 
            away_team.logo !== null
            ? away_team.logo
            : 'https://www.designevo.com/res/templates/thumb_small/blue-star-and-gray-soccer.png'
          }}
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
    const { height, width } = Dimensions.get("window");
    const buttons = ['One', 'Two', 'Three'];
    return (
      <View style={{ marginTop: -62, backgroundColor: '#fff' }}>

        <View style={{ position: 'absolute', backgroundColor: '#b7dbad', width: width, height: height/5, }}>
          <View style={{ marginTop: 15 }}>
            <Text style={styles.paragraph}>
              {league.name}
            </Text>

            <Text style={styles.paragraph}>
              maç {datetime}'da oynanacak
            </Text>
          </View>
        </View>

        <MatchCard 
          home_team={home_team} 
          away_team={away_team} 
          first_half_score={first_half_score} 
          score={score} 
        />

        <View style={styles.details}>
          <ButtonGroup
            onPress={() => console.log('pressed')}
            selectedIndex={1}
            buttons={buttons}
            containerStyle={{ height: 40 }}
          />

          <Divider style={{ backgroundColor: 'black' }} />
          
          <Card>
            <Text>HANDICAP: {handicap}</Text>
            <Text>IDDAA_CODE: {iddaa_code}</Text>
            <Text>MESSAGE_COUNT: {message_count}</Text>
            <Text>MINUTE: {minute}</Text>
            <Text>PREDICTION_COUNT: {prediction_count}</Text>
            <Text>KEY: {key}</Text>
          </Card>
        </View>
      </View>
    );
  }
};

const { height, width } = Dimensions.get("window");
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
    marginTop: 80,
    padding: 10, 
    flexDirection: 'row', 
    backgroundColor: '#fff', 
    position: 'absolute', 
    borderRadius: 6, 
    borderWidth: 0.1, 
    borderColor: 'black',
    shadowColor: 'grey',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  details: { 
    backgroundColor: '#ffee51', 
    width: width-12, 
    height: height/2,
    marginTop: height/3, 
    marginLeft: 6,
    borderRadius: 6, 
    borderWidth: 0.1, 
    borderColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
};

const mapStateTopProps = state => {
  return { teams: state.team.currentTeams };
};

export default connect(mapStateTopProps, {})(MatchDetail);