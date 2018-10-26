import { View, Text } from 'react-native';
import React, { Component } from "react";
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, logoutUser } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common';

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

  renderError() {
    if (this.props.error) {
      return (
        <View style={{backgroundColor: 'white'}}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      );
    }
  };

  onLogoutUser() {
    const { token } = this.props.user.data;

    this.props.logoutUser({ token })
  };

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
  };

  render() {
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
    )} else {
      return (
      <CardSection>
        {this.userLoggedIn()}
      </CardSection>
    )};
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}
const mapStateTopProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading,
    user: state.auth.user,
  }
}

export default connect(mapStateTopProps, { 
  emailChanged, passwordChanged, loginUser, logoutUser
})(LoginForm);