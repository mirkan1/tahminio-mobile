import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image, TouchableOpacity } from 'react-native';
import { getMatchInfo, getAnotherUser } from '../actions';
import { CardSection, Card } from './common';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Icon, Button } from 'native-base';

class FeedList extends Component {
  state = { upvoted: false }

  componentWillMount() {
/*    const { upvoted } = this.props.post;
    this.setState({ upvoted: upvoted });*/
  }
  renderUpvoteButton() {
    // TODO
    // include upvote function from ForumActions
    // ./actions/ForumActions/upvotePrediction doest work
    const { upvoted } = this.state;
    if (upvoted) {
      //this.setState({ upvoted: true })
      return (
        <Button 
          transparent
          onPress={() => this.setState({ upvoted: false })}
        >
          <Icon name='remove' />
        </Button>
      );
    }
    //this.setState({ upvoted: false })
    return (
      <Button 
        transparent
        onPress={() => this.setState({ upvoted: true })}
      >
        <Icon name='add' />
      </Button>
    );
  }

  onPageChange(match) {
    this.props.getMatchInfo({ match });
    Actions.MatchDetail();
  }

  onAnotherUserClick(user) {
    const { token } = this.props;
    const user_id = user.id;
    this.props.getAnotherUser(user_id, { token });
  }

  render() {
    console.log(this.props.post)
    const {id, game, text, user, match, upvote_count, upvoted } = this.props.post;
    const { away_team, home_team } = this.props.post.match;
    return (
      <Card>
        <View style={{ alignItems: 'center', marginTop: 10, borderRadius: 1, borderColor: 'black', borderWidth: 2, marginLeft: 125, marginRight: 125}}>
          <Text style={{ fontSize: 30 }}>{game}</Text>
        </View>
        <CardSection style={{ alignItems: 'center' }}>
          <Text style={styles.titleStyle}>
            {text}
            {upvote_count}
            {upvoted}
          </Text>
        {this.renderUpvoteButton()}
        </CardSection>

        <TouchableOpacity onPress={() => this.onPageChange(this.props.post.match)}>
          <View>
            <CardSection>
              <Image
                source={{ uri: 
                    home_team.logo !== null
                    ? home_team.logo
                    : 'https://www.designevo.com/res/templates/thumb_small/blue-star-and-gray-soccer.png'
                  }}
                style={styles.thumbnailStyle}
              />
              <Text style={styles.titleStyle}>
                {home_team.name}
              </Text>
              <Text style={styles.titleStyle}>
                {away_team.name}
              </Text>
              <Image
                source={{ uri: 
                    away_team.logo !== null
                    ? away_team.logo
                    : 'https://www.designevo.com/res/templates/thumb_small/blue-star-and-gray-soccer.png'
                  }}
                style={styles.thumbnailStyle}
              />
            </CardSection>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => this.onAnotherUserClick(user)}
          style={styles.resultStyle}
        > 
          <View style={{ flex: 2, flexDirection: 'column' }}>
            <Text>UserID: {user.id}</Text>
            <Text>Username: {user.username}</Text>
            <Text>Skill Points: {user.skill_point}</Text>
          </View>

          <View style={{ flex: 1, flexDirection: 'row-reverse' }}>
            <Image
              source={{ uri: 
                user.profile_photo !== null
                ? user.profile_photo
                : 'https://www.designevo.com/res/templates/thumb_small/blue-star-and-gray-soccer.png'
              }}
              style={styles.thumbnailStyle}
            />
          </View>
        </TouchableOpacity>
      </Card>
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
  resultStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
};

const mapStateTopProps = state => {
  return {
    token: state.user.token,
  };
};


export default connect(mapStateTopProps, { getMatchInfo, getAnotherUser })(FeedList);