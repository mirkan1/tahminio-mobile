import { View, Text, FlatList } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  usernameChanged,
  passwordChanged,
  userLogin,
  logoutUser,
} from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';
import ListItem from './ListItem';
import UserSearchData from './UserSearchData';
import SignUp from './SignUp';
import Login from './Login';
import UpdateMe from './UpdateMe';

// TODO
// onLogoutUser doesnt work
// UpdateMe.js could not be rendered for some reason

class LoginForm extends Component {
  state = { formStatus: 'default' };

  onLogoutUser() {
    const { token } = this.props;
    this.props.logoutUser({ token });
  }

  onUpdateMePress() {
    // const { token } = this.props;
    // this.onLogoutUser();
    this.setState({ formStatus: 'update' });
  }

  userLoggedIn() {
    const { user } = this.props;
    return (
      <View>
        <Text>{user.data.first_name}</Text>
        <Text>{user.data.email}</Text>
        <Text>{user.data.last_name}</Text>
        <Text>{user.data.username}</Text>
        <Text>{user.data.bio}</Text>
        <CardSection>
          <Button onPress={() => this.onUpdateMePress()}>Update Me</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onLogoutUser.bind(this)}>Logout</Button>
        </CardSection>
      </View>
    );
  }

  formStatus() {
    switch (this.state.formStatus) {
      case 'login':
        return <Login />;
      case 'signUp':
        return <SignUp />;
      case 'update':
        return <UpdateMe />;
      default:
        return(
          <View>
            <CardSection>
              <Button onPress={() => this.setState({ formStatus: 'login' })}>
                Login
              </Button>
            </CardSection>

              <Text>OR</Text>
            
            <CardSection>
              <Button onPress={() => this.setState({ formStatus: 'signUp' })}>
                Sign Up
              </Button>
            </CardSection>
        </View>
        );
    }
  }

  render() {
    if (this.props.user === null) {
      return (
        <View>
          {this.formStatus()}
        </View>
      );
  }

    return (
      <View>
        <CardSection>
          {this.userLoggedIn()}
        </CardSection>
        <UserSearchData />
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
    token: state.user.token,
    username: state.user.username,
    password: state.user.password,
    error: state.user.error,
    loading: state.user.loading,
    user: state.user.user,
  };
};

export default connect(mapStateTopProps, { 
  usernameChanged, passwordChanged, userLogin, logoutUser, 
})(LoginForm);
