import { View, Text, FlatList } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  searchWordChanged,
  searchUser
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

  
class UserSearchData extends Component {
  onSearchWordChange(text) {
    this.props.searchWordChanged(text);
  }
  onSearchButtonPress() {

    const { searchWord } = this.props;
    const { token } = this.props.user.data;
    this.props.searchUser(token, searchWord);
  }

  renderButton() {
    // TODO not working proporly
    // add loading to actions/SearchReducer.js
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onSearchButtonPress.bind(this)}>
        Search User
      </Button>
    );
  }

  searchDataFetched() {
    const { searchedData } = this.props;

    if (searchedData) {
      return (
        <View>
          <FlatList
            data={searchedData}
            renderItem={({ item }) => this.renderRow(item)}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      );
    }
  }

  renderRow(user) {
    //
    // TODO
    // make it beautiful
    // maybe carry it to another spesific file named Search Results
    return (
      <Card>
        <CardSection>
          <Text>{user.id}</Text>
        </CardSection>

        <CardSection>
          <Text>{user.username}</Text>
        </CardSection>
        
        <CardSection>
          <Text>{user.profile_photo}</Text>
        </CardSection>
        
        <CardSection>
          <Text>{user.skill_point}</Text>
        </CardSection>
      </Card>
    );
  };

  render() {
    return (
      <View>
        <CardSection>
           <Input 
             label="Search"
             placeholder="user123"
             onChangeText={this.onSearchWordChange.bind(this)}
             value={this.props.search}
           />
         </CardSection>

         <CardSection>
           {this.renderButton()}
         </CardSection>
         {this.searchDataFetched()}
       </View>
    )
  }
};

const mapStateTopProps = state => {
  return {
    error: state.user.error,
    loading: state.user.loading,
    user: state.user.user,
    // import here onchange on click and stuff for search
    searchWord: state.search.searchWord,
    searchedData: state.search.searchedData,
  };
};

export default connect(mapStateTopProps, { 
  searchUser, searchWordChanged
})(UserSearchData);
