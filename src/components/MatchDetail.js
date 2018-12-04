import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, Dimensions, ScrollView, FlatList } from 'react-native';
import { Card, CardSection, Spinner, } from './common';
import { Icon, Button } from 'native-base';
import { ButtonGroup, Divider } from 'react-native-elements';
import { 
  getListPrediction,
  upvotePrediction,
  undoUpvotePrediction,
} from '../actions';

const MatchCard = ({ home_team, away_team, first_half_score, score }) => {
  return (
    <View style={styles.matchCardStyle}>

      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
      <Image
            source={{ uri: 
                home_team.logo !== null
                ? home_team.logo
                : 'https://www.designevo.com/res/templates/thumb_small/blue-star-and-gray-soccer.png'
            }}
            style={styles.thumbnailStyle}
          />

            <Text style={[styles.teamName, { textAlign: 'center', }]}>
              {home_team.name}
            </Text>
      </View>

      <View style={{ flex: 1, alignSelf: 'center', }}>
        <Text style={[styles.teamName, { textAlign: 'center', }]}>{score}</Text>
      </View>

      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
          <Image
            source={{ uri: 
                away_team.logo !== null
                ? away_team.logo
                : 'https://www.designevo.com/res/templates/thumb_small/blue-star-and-gray-soccer.png'
            }}
            style={styles.thumbnailStyle}
          />

            <Text style={[styles.teamName, { textAlign: 'center', }]}>
              {away_team.name}
            </Text>
        </View>
    </View>
  );
};


class MatchDetail extends Component {
  state = { selectedIndex: 0 }

  componentWillMount() {
    const { token, match_id } = this.props;
    this.props.getListPrediction(token, match_id);
  }

  predictionsList() {
    // TODO not sure if refreshes after new prediciton come
    const { predictions, loading } = this.props;
    if (predictions.length > 0) {
      return (
        <View style={{ width: Dimensions.get('window').width }}>
          <FlatList
            data={predictions}
            renderItem={({ item }) => this.renderRow(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    } else if (loading) {
      return (
        <Spinner size="large" />
      );
    } else {
      return (
        <Text>No prediction yet. Create one</Text>
      );
    }
  }

  onUpvotePrediction(prediction) {
    const { token, match_id } = this.props;
    const prediction_id = prediction.id;
    this.props.upvotePrediction(token, match_id, prediction_id );
  }

  onUndoUpvotePrediction(prediction) {
    const { token, match_id } = this.props;
    const prediction_id = prediction.id;
    this.props.undoUpvotePrediction(token, match_id, prediction_id );
  }

  renderRow(prediction) {
    var prediction_upvoted = prediction.upvoted;
    // TODO make class on diffirent page
    // mage state that see if upvoted or not and update the icon to upvote or not
    return (
      <View style={{ margin: 5, flexDirection: 'row' }}>
        <View>
          <Text>{prediction.game}</Text>
          <Text>{prediction.text}</Text>
          <Text>{prediction.user.username}</Text>
          <Text>user skill points: {prediction.user.skill_point}</Text>
          <Text>upvote count: {prediction.upvote_count}</Text>
        </View>

        <View style={{ flex: 1}}>
          { prediction_upvoted === false
              ? ( <Button 
                    transparent
                    onPress={() => this.onUpvotePrediction(prediction)}
                  >
                    <Icon name='add' />
                  </Button>
                )
              : ( <Button 
                    transparent
                    onPress={() => this.onUndoUpvotePrediction(prediction)}
                  >
                    <Icon name='remove' />
                  </Button>
                )
          }
        </View>
      </View>

    );
  }

  renderSection() {
    const { 
      handicap, iddaa_code, message_count, 
      prediction_count, key, id } = this.props.teams;
    switch (this.state.selectedIndex) {
      case 0:
        return (
          <Card>
            <CardSection>
              <Text>HANDICAP: {handicap}</Text>
            </CardSection>
            <CardSection>
              <Text>MATCH ID: {id}</Text>
            </CardSection>
            <CardSection>
              <Text>IDDAA_CODE: {iddaa_code}</Text>
            </CardSection>
            <CardSection>
              <Text>MESSAGE_COUNT: {message_count}</Text>
            </CardSection>
            <CardSection>
              <Text>PREDICTION_COUNT: {prediction_count}</Text>
            </CardSection>
            <CardSection>
              <Text>KEY: {key}</Text>
            </CardSection>
          </Card>
        );
      case 1:
        return (
          <View>
          {this.predictionsList()}
          </View>
        );
      case 2:
        return (
          <Text>3</Text>
        );
    }
  }

  updateIndex(selectedIndex) {
    if (selectedIndex===1) {
      const { token, match_id } = this.props;
      this.props.getListPrediction(match_id);
     // this.componentWillMount();
    };
    this.setState({ selectedIndex: selectedIndex });
  }

  render() {
    const { 
      away_team, home_team, league, first_half_score,
      minute, datetime, score, } = this.props.teams;
    const { height, width } = Dimensions.get("window");
    const buttons = ['Maç bilgisi', 'Tahminler', 'Three'];
    return (
      <View style={{ marginTop: -62, backgroundColor: '#fff', height: height }}>

        <View style={{ position: 'absolute', backgroundColor: '#3f51b5', width: width, height: height/5-30, }}>
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

        <View style={{ marginTop: 15, position: 'absolute', marginTop: height/3.6, width: width, }}>
          <Text style={styles.paragraph}>
            {minute !== null ? `suan maçda ${minute}ıncı dakika oynanıyor` : `maç henüz başlamadı`}
          </Text>
        </View>

        <View style={styles.details}>
          <ButtonGroup
            onPress={this.updateIndex.bind(this)}
            selectedIndex={this.state.selectedIndex}
            buttons={buttons}
            containerStyle={{ height: 40 }}
          />

          <Divider style={{ backgroundColor: 'black' }} />

          {this.renderSection()}
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
    flex: 2,
    height: 60,
    width: 60,
  },
  matchCardStyle: {
    justifyContent: 'space-between', 
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
    width: width-30, 
    height: height/1.8,
    marginTop: height/3, 
    padding: 10, 
    alignSelf: 'center',
    borderRadius: 6, 
    borderWidth: 0.1, 
    borderColor: 'black',
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "grey",
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 8,
  },
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderColor: '#eaeaea',
    borderRadius: 0.5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginLeft: 15,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  teamName: {
    color: '#4d505b',
    fontWeight: '200', 
    fontSize: 18,
  },
};

const mapStateTopProps = state => {
  return { 
    token: state.user.token,
    teams: state.team.currentTeams,
    match_id: state.team.currentTeams.id,
    loading: state.forum.loading,
    predictions: state.forum.predictions,
   };
};

export default connect(mapStateTopProps, { 
  getListPrediction, 
  upvotePrediction,
  undoUpvotePrediction,
})(MatchDetail);