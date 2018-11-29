import { View, Text } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spinner } from './common';
import { Icon, Button } from 'native-base';
import { followUser, unfollowUser, getAnotherUserTrophies } from '../actions';


class WantedUser extends Component {
  state = { followStatus: null }

  componentDidMount() {
    this.setState({ followStatus: this.props.wantedUser.is_following })
  }

  onFollowUser() {
    const { wantedUser, token } = this.props;
    this.props.followUser(wantedUser.id, { token });
    this.setState({ followStatus: !this.state.followStatus })
  }

  onUnfollowUser() {
    const { wantedUser, token } = this.props;
    this.props.unfollowUser(wantedUser.id, { token });
    this.setState({ followStatus: !this.state.followStatus })
  }

  onGetAnotherUserTrophies() {
    const { id } = this.props.wantedUser;
    this.props.getAnotherUserTrophies(id);
  }

  renderFollowButton() {
    const { loading } = this.props;
    if (loading) {
      return <Spinner size="large" />;
    }
    if (!this.state.followStatus) {
      return (
        <Button 
          transparent
          onPress={this.onFollowUser.bind(this)}
        >
          <Icon name='add' />
        </Button>
      );
    }
    return (
      <Button 
        transparent
        onPress={this.onUnfollowUser.bind(this)}
      >
        <Icon name='remove' />
      </Button>
    );
  }

  render() {
    const { wantedUser } = this.props;
    return (
      <View>
        <Text>{wantedUser.username}</Text>
        <Text>{wantedUser.email}</Text>
        <Text>{wantedUser.last_name}</Text>
        <Text>{wantedUser.bio}</Text>
        {/*<Text>{wantedUser.profile_photo}</Text>*/}
        {/*<Text>{wantedUser.trophies}</Text>*/}
        {this.renderFollowButton()}
        <Button onPress={this.onGetAnotherUserTrophies.bind(this)}>
        <Icon name='trophy' />
        </Button>
      </View>
    );
  }
}

const mapStateTopProps = state => {
  return {
    wantedUser: state.user.wantedUser,
    token: state.user.token,
    loading: state.user.loading,
  };
};

export default connect(mapStateTopProps, {
  followUser, unfollowUser, getAnotherUserTrophies
})(WantedUser);
