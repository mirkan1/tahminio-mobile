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

// TODO
// make separate files; Login.js and SingUp.js

class LoginForm extends Component {
  state = { formStatus: 'login' };

  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }
  
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    const { username, password } = this.props;
    this.props.userLogin({ username, password });
  }

  onLogoutUser() {
    const { token } = this.props.user.data;

    this.props.logoutUser({ token });
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
        </View>
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
    if (this.props.user === null) {
      return (
        <Card>
          <CardSection>
            <Input 
              label="Username"
              placeholder="username123"
              onChangeText={this.onUsernameChange.bind(this)}
              value={this.props.username}
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
