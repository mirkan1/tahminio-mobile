import { View, Text } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner } from './common';
import { Icon, Button } from 'native-base';
import { followUser, unfollowUser } from '../actions';


class WantedUser extends Component {
  onFollowUser() {
    const { wantedUser, token } = this.props;
    this.props.followUser({wantedUser.id, token});
  }

  onUnfollowUser() {
    const { wantedUser, token } = this.props;
    this.props.followUser({wantedUser.id, token});
  }

  render() {
    const { wantedUser } = this.props;
    console.log(wantedUser)
    return (
      <View>
        <Text>{wantedUser.username}</Text>
        <Text>{wantedUser.email}</Text>
        <Text>{wantedUser.last_name}</Text>
        <Text>{wantedUser.bio}</Text>
        {/*<Text>{wantedUser.profile_photo}</Text>*/}
        {/*<Text>{wantedUser.trophies}</Text>*/}
        {!wantedUser.is_following
          ? {<Button 
              transparent
              onPress={this.onFollowUser.bind(this)}
            >
              <Icon name='menu' />
            </Button>}
          : {<Button 
              transparent
              onPress={this.onUnfollowUser.bind(this)}
            >
              <Icon name='person' />
            </Button>} 
        }
      </View>
    );
  }
}

const mapStateTopProps = state => {
  return {
    wantedUser: state.user.wantedUser,
    token: state.user.token,
  };
};

export default connect(mapStateTopProps, {
  followUser, unfollowUser,
})(WantedUser);
