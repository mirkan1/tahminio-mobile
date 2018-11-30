import React, { Component } from 'react';
import { View, FlatList, Dimensions, Text } from 'react-native';
import { getUserFeed } from '../actions';
import { Button, Spinner, Base } from './common';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import FeedList from './FeedList';

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

  showData() {
    const { feed, loading } = this.props;
    if (loading === false) {
      /*for (const fe of feed) {*/
        return (
          <View style={{ width: Dimensions.get('window').width }}>
            <FlatList
              data={feed}
              renderItem={({ item }) => this.renderRow(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
    /*}*/

    }
}

  renderRow(fe) {
    console.log(fe)
    return (
      <FeedList 
        post={fe}
 
      />
    );
  }

  render() {
      return (
        <Base>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 30 }}>FEEDS</Text>
          </View>
          {this.renderButton()}
          {this.showData()}
        </Base>
      );
  }
}

const styles = {

};

const mapStateTopProps = state => {
  return { 
    render: state.team.render, 
    token: state.user.token,
    loading: state.user.loading,
    feed: state.user.feed,
  };
};

export default connect(mapStateTopProps, { getUserFeed })(Feeds);