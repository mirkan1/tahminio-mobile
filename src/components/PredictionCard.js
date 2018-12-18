import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { Text, View, Image, Dimensions, ScrollView, FlatList, StyleSheet } from 'react-native';
import {
  upvotePrediction,
  undoUpvotePrediction,
  getPrediction,
} from '../actions';
import { Button } from 'native-base';

class PredictionCard extends Component {
  state = { upvoted: false };

  componentDidMount() {
    this.setState({ upvoted: this.props.prediction.upvoted });
  }

	onUpvotePrediction(prediction_id) {
    const { token, match_id } = this.props;
    this.props.upvotePrediction(token, match_id, prediction_id );
    this.setState({ upvoted: !this.state.upvoted });
  }

  onUndoUpvotePrediction(prediction_id) {
    const { token, match_id } = this.props;
    this.props.undoUpvotePrediction(token, match_id, prediction_id );
    this.setState({ upvoted: !this.state.upvoted });
  }

  onGetPrediction(prediction_id) {
    const { token, match_id } = this.props;
    this.props.getPrediction({ token }, match_id, prediction_id);
  }

  renderUpvoteButton() {
    const { prediction } = this.props;
    console.log(this.state.upvoted);
    if (this.state.upvoted === false) {
      return (
        <Button 
          transparent
          onPress={() => this.onUpvotePrediction(prediction.id)}
        >
          <Icon name='add' />
        </Button>
      );
    } return (
        <Button 
          transparent
          onPress={() => this.onUndoUpvotePrediction(prediction.id)}
        >
          <Icon name='remove' />
        </Button>
      );
  }

  render() {
    // TODO styling
    const { prediction } = this.props;
    var prediction_upvoted = prediction.upvoted;
    return (
      <View style={{ margin: 5, flexDirection: 'row' }}>
        <View>
          <Text>{prediction.game}</Text>
          <Text>{prediction.id}</Text>
          <Text>{prediction.text}</Text>
          <Text>{prediction.user.username}</Text>
          <Text>user skill points: {prediction.user.skill_point}</Text>
          <Text>upvote count: {prediction.upvote_count}</Text>
          <Button 
            transparent
            onPress={() => this.onGetPrediction(prediction.id)}
          >
          <Text>GetPrediction</Text>
        </Button>
        </View>

        <View style={{ flex: 1 }}>
          {this.renderUpvoteButton()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateToProps = state => {
  return { 
    token: state.user.token,
    match_id: state.team.currentTeams.id,
    predictions: state.forum.predictions,
   };
};

export default connect(mapStateToProps, {
  upvotePrediction, undoUpvotePrediction, getPrediction,
})(PredictionCard);