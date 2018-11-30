import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { CardSection, Card } from './common';
import { Icon, Button } from 'native-base';

class FeedList extends Component {
  state = { upvoted: null }

  renderUpvoteButton() {
    // TODO
    // include upvote function from ForumActions
    const { upvoted } = this.props.post;

    if (upvoted) {
      //this.setState({ upvote: true})
      return (
        <Button 
          transparent
          onPress={() => this.setState({ upvote: false })}
        >
          <Icon name='remove' />
        </Button>
      );
    }
    //this.setState({ upvote: false })
    return (
      <Button 
        transparent
        onPress={() => this.setState({ upvote: true })}
      >
        <Icon name='add' />
      </Button>
    );
  }

  render() {
    const {id, game, text, user, match, upvote_count, upvoted } = this.props.post;
    return (
      <TouchableWithoutFeedback onPress={() => console.log('pressed')}>
        <Card>
          <CardSection>
            <Text style={styles.titleStyle}>
              {id}
              {game}
              {text}
              {upvote_count}
              {upvoted}
            </Text>
            {this.renderUpvoteButton()}
          </CardSection>
        </Card>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    flex: 2,
    paddingLeft: 15
  },
  thumbnailContainerStyleLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 10
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
};


export default FeedList;