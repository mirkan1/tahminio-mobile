import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  searchWordChanged,
  searchUser,
  getAnotherUser,
} from '../actions';
import { CardSection, Input, Button, Spinner, Base } from './common';
import { Divider } from 'react-native-elements';
  
class UserSearch extends Component {
  onSearchWordChange(text) {
    this.props.searchWordChanged(text);
  }
  onSearchButtonPress() {
    const { token, searchWord } = this.props;
    this.props.searchUser(token, searchWord);
  }

  renderButton() {
    // TODO not working proporly
    // add loading to actions/SearchReducer.js
    const { loading, error } = this.props
    if (loading) {
      return <Spinner size="large" />;
    }
    return (
      <View style={{ flex: 1 }}>
        {
          error == true
          ? <Text>No Such User Found</Text>
          : null
        }
        <Button onPress={this.onSearchButtonPress.bind(this)}>
          Search User
        </Button>
      </View>
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

  onAnotherUserClick(user) {
    const { token } = this.props;
    const user_id = user.id;
    this.props.getAnotherUser(user_id, { token });
  }

  renderRow(user) {
    //
    // TODO
    // make it beautiful
    // maybe carry it to another spesific file named Search Results
    return (
      <View>
        <TouchableOpacity
          onPress={() => this.onAnotherUserClick(user)}
          style={styles.resultStyle}
        > 
          <View style={{ flex: 2, flexDirection: 'column' }}>
            <Text>{user.id}</Text>
            <Text>{user.username}</Text>
            <Text>{user.skill_point}</Text>
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
        
        <Divider style={{ backgroundColor: 'black' }} />
      </View>
    );
  };

  render() {
    return (
      <Base>
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
       </Base>
    ); 
  }
};

const styles = {
  thumbnailStyle: {
    height: 80,
    width: 80,
  },
  resultStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 10,
    marginTop: 10,
  }
}
const mapStateToProps = state => {
  return {
    error: state.user.error,
    loading: state.search.loading,
    user: state.user.user,
    token: state.user.token,
    // import here onchange on click and stuff for search
    searchWord: state.search.searchWord,
    searchedData: state.search.searchedData,
    wantedUser: state.user.wantedUser,
    error: state.search.error,
  };
};

export default connect(mapStateToProps, { 
  searchUser, searchWordChanged, getAnotherUser
})(UserSearch);
