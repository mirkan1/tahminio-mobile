'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardSection, Input, Button, Spinner, Base } from './common';
import { StyleSheet, View, Text } from 'react-native';
import { 
  getAllTimeLeaderboard,
} from '../actions';

class LeaderBoard extends Component {
	state = { page: 0 }

  nextPage() {
    const { page } = this.state;
    this.setState({ page : page+1 })
    this.props.getAllTimeLeaderboard(this.state.page);
    if (2 > 1) {
      return(
        <View>
          <Text>Page</Text>
        </View>
      );
    }
  }

  render() {
    console.log("total_page", this.props.total_page);
    console.log("page_state", this.state.page)
    console.log("page_props", this.props.page);
    return (
      <Base>
        <View style={{ alignItems: 'center', marginTop: 10 }}>
        	<Text style={{ fontSize: 30 }}>LEADERBOARD</Text>
        </View>

        {this.nextPage()}
        <Button onPress={this.nextPage.bind(this)}>
      </Button>
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
  getAllTimeLeaderboard, 
})(LeaderBoard);