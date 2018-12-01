import React, { Component } from 'react';
import { View, FlatList, Dimensions, Text } from 'react-native';
import { getUserFeed } from '../actions';
import { Button, Spinner, Base } from './common';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import FeedList from './FeedList';

// TODO
// WHEN YOU SLIDE TOP TO BOTTOM FROM TOP IT SHOULD REFRESH THE PAGE

class Feeds extends Component {
	componentWillMount() {
    const { token } = this.props;
    if (token !== null) {
      this.props.getUserFeed({ token });
    }
  }

  renderData() {
    if (this.props.loading) {
      return <Spinner size="large"/>;
    }
/*    return (
      <Button onPress={this.onFetchFeeds.bind(this)}>
        Fetch Feeds
      </Button>
    );*/
  }

  showData() {
    const { feed, loading } = this.props;
    if (loading === false) {
        return (
          <View style={{ width: Dimensions.get('window').width }}>
            <FlatList
              data={feed}
              renderItem={({ item }) => this.renderRow(item)}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        );
    }
  }

  renderRow(feed) {
    return (
      <FeedList 
        post={feed}
      />
    );
  }

  render() {
    const { token } = this.props;
    if (token === null) {
      return (
        <Base>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{ fontSize: 30 }}>You need to Login to see feeds</Text>
          </View>
        </Base>
      );
    }
    return (
      <Base>
        {this.showData()}
        <View style={{ marginTop: Dimensions.get("window").height / 1.75 }}>
          {this.renderData()}
        </View>
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
