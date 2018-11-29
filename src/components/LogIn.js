import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
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

// TODO
// make separate files; Login.js and SingUp.js

class Login extends Component {
  state = { formStatus: 'login' };

  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }
  
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    //const { username, password } = this.props;
    var username = 'mirkan1'
    var password = 'anadolu123'
    this.props.userLogin({ username, password });
  }

  onLogoutUser() {
    const { token } = this.props.user.data;

    this.props.logoutUser({ token });
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
    return (
      <KeyboardAvoidingView behavior="padding">
      <Card>
        <CardSection>
          <Input 
            style={styles.inputStyle}
            label="Username"
            placeholder="username123"
            onChangeText={this.onUsernameChange.bind(this)}
            value={this.props.username}
            returnKeyType="next"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </CardSection>

        <CardSection>
          <Input
            style={styles.inputStyle}
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
            returnKeyType="go"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </CardSection>

        {this.renderError()}
        
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
      </KeyboardAvoidingView>
    );
  }
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  inputStyle: {
    height: 40,

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
})(Login);
