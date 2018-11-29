'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner, Base } from './common';
import { StyleSheet, View, Text } from 'react-native';
import { 
  getAllTimeLeaderboard,
  getLeaderboardPageNumber,
} from '../actions';

class LeaderBoard extends Component {
	state = { page: 0 }

  componentWillMount() {
    this.props.getLeaderboardPageNumber();
  }
  onRequestNextPage() {
    const { page } = this.state;
    this.setState({ page : page+1 })
    this.props.getAllTimeLeaderboard(page);
  }

  nextPage() {
    const { page } = this.state;
    if (page > 1) {
      return(
        <View>
          <Text>Page Num {page}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Base>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
        	<Text style={{ fontSize: 30 }}>LEADERBOARD</Text>
        </View>
        <Button onPress={this.onRequestNextPage.bind(this)}>
          nextpage
        </Button>
        {this.nextPage()}
      </Base>
    );
  }
}

const styles = StyleSheet.create({

});

const mapStateTopProps = state => {
  return {
    total_page: state.leaderboard.total_page,
    page: state.leaderboard.page,
  };
};

export default connect(mapStateTopProps, { 
  getAllTimeLeaderboard, getLeaderboardPageNumber
})(LeaderBoard);