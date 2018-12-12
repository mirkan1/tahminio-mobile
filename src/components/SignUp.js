import { View, Text } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  usernameChanged,
  emailChanged,
  passwordChanged,
  firstnameChanged,
  lastnameChanged,
  bioChanged,
  logoutUser,
  userSignUp,
} from '../actions';
import { Card, CardSection, Input, Spinner } from './common';
import { Button } from 'native-base';

class SignUp extends Component {
  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }

  onEmailChange(text) {
    this.props.emailChanged(text);
  }
  
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onFirstnameChange(text) {
    this.props.firstnameChanged(text);
  }

  onLastnameChange(text) {
    this.props.lastnameChanged(text);
  }

  onBioChange(text) {
    this.props.bioChanged(text);
  }

  onButtonPress() {
    const { 
      username, 
      email, 
      password,
      first_name,
      last_name,
      bio 
    } = this.props;
    this.props.userSignUp({ username, email, password, first_name, last_name, bio });
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
      <Button block style={{ marginLeft: 40, marginRight: 40, flex: 1 }}onPress={this.onButtonPress.bind(this)}>
        <Text style={{ textAlign: 'center', fontSize: 20, }}>Sign Up</Text>
      </Button>
    );
  }

  render() {
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
            label="Email"
            placeholder="email"
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


        <CardSection>
          <Input
            label="first_name"
            placeholder="David"
            onChangeText={this.onFirstnameChange.bind(this)}
            value={this.props.first_name}
          />
        </CardSection>

        <CardSection>
          <Input
            label="last_name"
            placeholder="LAST"
            onChangeText={this.onLastnameChange.bind(this)}
            value={this.props.last_name}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Biography"
            placeholder="tell me about yourself"
            onChangeText={this.onBioChange.bind(this)}
            value={this.props.bio}
          />
        </CardSection>


        {this.renderError()}
        
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
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
    email: state.user.email,
    password: state.user.password,
    first_name: state.user.first_name,
    last_name: state.user.last_name,
    bio: state.user.bio,
    error: state.user.error,
    loading: state.user.loading,
    user: state.user.user,
  };
};

export default connect(mapStateTopProps, { 
  usernameChanged, 
  emailChanged, 
  passwordChanged, 
  userSignUp, 
  logoutUser, 
  firstnameChanged, 
  lastnameChanged, 
  bioChanged
})(SignUp);
