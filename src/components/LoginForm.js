import { View, Text, FlatList } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  emailChanged,
  passwordChanged,
  loginUser,
  logoutUser,
  searchWordChanged,
  searchUser
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import ListItem from './ListItem';

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  onLogoutUser() {
    const { token } = this.props.user.data;

    this.props.logoutUser({ token });
  }

  onSearchWordChange(text) {
    this.props.searchWordChanged(text);
  }

  onSearchButtonPress() {
    const { searchWord } = this.props;
    const { token } = this.props.user.data;
    this.props.searchUser(token, searchWord);
  }

  userLoggedIn() {
    const { user } = this.props;
      return (
        <View>
          <Text>{user.data.email}</Text>
          <Text>{user.data.first_name}</Text>
          <Text>{user.data.last_name}</Text>
          <Text>{user.data.username}</Text>
          <Text>{user.data.bio}</Text>
          <CardSection>
            <Button onPress={this.onLogoutUser.bind(this)}>Logout</Button>
          </CardSection>

          <CardSection>
            <Input 
              label="Search"
              placeholder="search"
              onChangeText={this.onSearchWordChange.bind(this)}
              value={this.props.search}
            />
          </CardSection>
          <CardSection>
            <Button onPress={this.onSearchButtonPress.bind(this)}>
              Search
            </Button>  
          </CardSection>   
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
    return <Spinner size="large" />;
  }

  renderRow(user) {
    // TODO
    // make it beautiful
    // maybe carry it to another spesific file named Search Results
    return (
      <CardSection>
        <Card>
          <Text>{user.id}</Text>
        </Card>
        <Card>
          <Text>{user.username}</Text>
        </Card>
        <Card>
          <Text>{user.profile_photo}</Text>
        </Card>
        <Card>
          <Text>{user.skill_point}</Text>
        </Card>
      </
      CardSection>
    );
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    );
  }

  render() {
    //console.log(this.props.searchedData)
    if (this.props.user === null) {
      return (
        <Card>
          <CardSection>
            <Input 
              label="Username"
              placeholder="username123"
              onChangeText={this.onEmailChange.bind(this)}
              value={this.props.email}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry
              label="Password"
              placeholder="password"
              onChangeText={this.onPasswordChange.bind(this)}
              value={this.props.password}
            />
          </CardSection>
          
          {this.renderError()}

          <CardSection>
            {this.renderButton()}
          </CardSection>
        </Card>
      );
  }

    return (
      <View>
        <CardSection>
          {this.userLoggedIn()}
        </CardSection>

        <CardSection>
          {this.searchDataFetched()}
        </CardSection>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};
const mapStateTopProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    user: state.auth.user,
    // import here onchange on click and stuff for search
    searchWord: state.search.searchWord,
    searchedData: state.search.searchedData,
  };
};

export default connect(mapStateTopProps, { 
  emailChanged, passwordChanged, loginUser, logoutUser, searchUser, searchWordChanged
})(LoginForm);
