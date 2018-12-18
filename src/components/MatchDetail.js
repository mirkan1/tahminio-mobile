import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, Image, Dimensions, ScrollView, FlatList, Picker, TouchableOpacity, Easing, Animated } from 'react-native';
import { Card, CardSection, Spinner, } from './common';
import { Icon, Button } from 'native-base';
import { ButtonGroup, Divider, SearchBar } from 'react-native-elements';
import { 
  getListPrediction,
  upvotePrediction,
  undoUpvotePrediction,
  postMessageToMatch,
  getListOfMessages,
  getListPredictionOptions,
  makePrediction,
  getAvailableGames,
} from '../actions';
import PredictionCard from './PredictionCard';

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
  state = { 
    selectedIndex: 0, 
    value: '', 
    predictValue: "Handikap",
  }

  onChangeText(value) {
    this.setState({ value })
  }

  componentDidMount() {
    const { token, match_id } = this.props;
    this.props.getListPrediction({ token }, match_id);
    this.props.getAvailableGames( match_id );
    //this.props.getListOfMessages(token, match_id);
  }

  onPostMessageToMatchPress() {
    const { token, match_id } = this.props;
    const { value } = this.state;
    this.props.postMessageToMatch(token, match_id, value);
  }

  onGetListPredictionOptions() {
    const { match_id } = this.props;
    this.props.getListPredictionOptions(match_id);
  }

  onMakePrediction(game) {
    const { token, match_id } = this.props;
    this.props.makePrediction({ token }, match_id, text="sikti", game);
  }

  predictListItem(item) {
    const { availableGames } = this.props;
    let keys = Object.keys(availableGames[this.state.predictValue]);
    let values = Object.values(availableGames[this.state.predictValue]);
    let reversedData = {};
    let key = 'LOL';

    for (let i=0; i<keys.length; i++) {
      reversedData[values[i]] = keys[i];
      if (reversedData[values[i]] === item) {
        key = values[i];
      }
    }

    return (
      <TouchableOpacity onPress={() => this.onMakePrediction(item)}
        style={{ flex: 1, borderWidth: 1, borderRadius: 2, borderColor: 'black', margin: 5, padding: 20, alignItems: 'center', }}
        keyExtractor={(item, index) => index.toString()}
      >
        <Text style={{ alignSelf: 'center', fontSize: 16, }}>{item}</Text>
        <Text style={{ alignSelf: 'center', fontSize: 16, color: 'blue' }}>{key}</Text>
      </TouchableOpacity>
    );
  }

  predictionsList() {
    // TODO not sure if refreshes after new prediciton come
    const { availableGames, predictions, loading, prediction_options } = this.props;

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
        <View style={{ flexDirection: 'column', }}>
          <Text>No prediction yet. Create one</Text>

        {/* RENDER TO ANOTHER PAGE TO MAKE A PREDICT IF DID NOT MAKE PREDICT YET*/}
          <Button onPress={() => this.onGetListPredictionOptions()}>
            <Text>Click to predict</Text>
          </Button>
        {/* user should be able to pick one of the desired prediction
            check mackolik.com and make like it
            ---TRY REACT HOOKS---
        */}
          { availableGames !== null
            ? <View>
                <Picker
                  selectedValue={this.state.predictValue}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => this.setState({predictValue: itemValue})}>
                  <Picker.Item label={Object.keys(availableGames)[0]} value={Object.keys(availableGames)[0]} />
                  <Picker.Item label={Object.keys(availableGames)[1]} value={Object.keys(availableGames)[1]} />
                  <Picker.Item label={Object.keys(availableGames)[2]} value={Object.keys(availableGames)[2]} />
                  <Picker.Item label={Object.keys(availableGames)[3]} value={Object.keys(availableGames)[3]} />
                  <Picker.Item label={Object.keys(availableGames)[4]} value={Object.keys(availableGames)[4]} />
                  <Picker.Item label={Object.keys(availableGames)[5]} value={Object.keys(availableGames)[5]} />
                  <Picker.Item label={Object.keys(availableGames)[7]} value={Object.keys(availableGames)[7]} />
                  <Picker.Item label={Object.keys(availableGames)[8]} value={Object.keys(availableGames)[8]} />
                </Picker>

                <FlatList
                  data={Object.keys(availableGames[this.state.predictValue])}
                  numColumns={3}
                  renderItem={({item}) => this.predictListItem(item)} 
                />
              </View>
            : <Text>NOPE</Text>
          }
        </View>
      );
    }
  }

  messagesList() {
    const { match_messages, loading } = this.props;
    if (match_messages !== null && match_messages.lenght > 0) {
      return (
        <View style={{ width: Dimensions.get('window').width }}>
          <FlatList
            data={match_messages}
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
        <View style={{ flexDirection: 'row', }}>
          <SearchBar
            style={{ flex: 5 }}
            value={this.state.value}
            onChangeText={this.onChangeText.bind(this)}
            placeholder='Bir Yorum yap' 
          />
          <Button large style={{ flex: 1 }} onPress={() => this.onPostMessageToMatchPress()}>
            <Text>Post</Text>
          </Button>

        </View>
      );
    }
    //TODO make messagelist postMessageToMatch
    // this.props.postMessageToMatch(token, match_id, text)
  }

  renderRow(item) {
    return (
      <PredictionCard prediction={item} />
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
          <View>
            {this.messagesList()}
          </View>
        );
    }
  }

  updateIndex(selectedIndex) {
    if (selectedIndex===1) {
      const { token, match_id } = this.props;
      this.props.getListPrediction(token, match_id);
    };
    this.setState({ selectedIndex: selectedIndex });
  }

  /*popUpPrediction() {
    const { value } = this.props;
    Animated.timing(this._width, {
      toValue: value,
    }).start();
  }*/

  render() {
    const { 
      away_team, home_team, league, first_half_score,
      minute, datetime, score, } = this.props.teams;
    const { height, width } = Dimensions.get("window");
    const buttons = ['Maç bilgisi', 'Tahminler', 'Mesajlar'];
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
    elevation: 2,
  },
  details: { 
    width: width-30, 
    height: height*3,//height/1.8,
    flexWrap: 'nowrap', 
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

const mapStateToProps = state => {
  return { 
    token: state.user.token,
    teams: state.team.currentTeams,
    match_id: state.team.currentTeams.id,
    loading: state.forum.loading,
    predictions: state.forum.predictions,
    match_messages: state.forum.match_messages,
    prediction_options: state.forum.prediction_options,
    availableGames: state.forum.availableGames,
   };
};

export default connect(mapStateToProps, { 
  getListPrediction, postMessageToMatch, getListOfMessages, 
  getListPredictionOptions, makePrediction, getAvailableGames
})(MatchDetail);