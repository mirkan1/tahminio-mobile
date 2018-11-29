import { View, Text, FlatList } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getUserTrophies,
  getAnotherUserTrophies,

} from '../actions';
import { Card, CardSection, Input, Button, Spinner, Base } from './common';
import { Actions } from 'react-native-router-flux';

class TrophyPage extends Component {
  render() {
    return(
      <View style={{ alignItems: 'center', marginTop: 10 }}>
          <Text style={{ fontSize: 30 }}>TROPHY</Text>
      </View>
    );
  }
};

const mapStateTopProps = state => {
  return {
    user: state.user.user,
    token: state.user.token,
    loading: state.user.loading,
    trophies: state.user.trophies,
  };
};

export default connect(mapStateTopProps, { 
  getUserTrophies, getAnotherUserTrophies
})(TrophyPage);

