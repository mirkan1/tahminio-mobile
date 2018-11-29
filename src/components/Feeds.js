'use strict';

import React, { Component } from 'react';
import { getUserFeed } from '../actions';
import {
  StyleSheet,
  View,
} from 'react-native';
import { Button, Spinner, Base } from './common';
import { Actions } from 'react-native-router-flux';

class Feeds extends Component {
	onFetchFeeds() {
    const { token } = this.props;
    this.props.getUserFeed({ token })
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onFetchFeeds.bind(this)}>
        Fetch Feeds
      </Button>
    );
  }

  render() {
      return (
        <Base>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 30 }}>FEEDS</Text>
          </View>
          {this.renderButton()}
        </Base>
      );
  }
}

const styles = StyleSheet.create({

});

const mapStateTopProps = state => {
  return { 
    render: state.team.render, 
    token: state.user.token,
    loading: state.user.loading,

  };
};

export default connect(mapStateTopProps, { getUserFeed })(Feeds);