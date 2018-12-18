import { View, Text, KeyboardAvoidingView, Animated } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  usernameChanged,
  passwordChanged,
  userLogin,
  logoutUser,
} from '../actions';
import { Card, CardSection, Input, Spinner } from './common';
import { Button } from 'native-base';

var _animate =  new Animated.Value(10) 

class Login extends Component {
  state = { formStatus: 'login'};

  startAnimationAQ() {
    // ONLY SPRING WORKS FOR SOME FUCKING REASON FIND WHY AND FIX AMK SEYINI
    // CANNOT ANIMATE SHIT!!!
    Animated.spring(_animate, {
      toValue: 1000,
      duration: 10,
      useNativeDriver: false, // <-- Add this
    }).start();
  }
        
  onUsernameChange(text) {
    this.props.usernameChanged(text);
  }
  
  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    //const { username, password } = this.props;
    var username = 'mirkan1';
    var password = 'anadolu123';
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

      <View>
        <Animated.View style={styles.myStyle} />

        <Button block style={{ marginLeft: 40, marginRight: 40, marginTop: 10, flex: 1 }} onPress={() => this.startAnimationAQ()}>
          <Text> click me </Text>
        </Button>

        <Button block style={{ marginLeft: 40, marginRight: 40, marginTop: 10, flex: 1 }} onPress={this.onButtonPress.bind(this)}>
          <Text style={{ textAlign: 'center', fontSize: 20, }}>Login</Text>
        </Button>
      </View>
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
        </Card>
        {this.renderError()}
        
        {this.renderButton()}
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
  },
  myStyle: {
    backgroundColor: 'red', width: _animate, height: _animate
  }
};

const mapStateToProps = state => {
  return {
    username: state.user.username,
    password: state.user.password,
    error: state.user.error,
    loading: state.user.loading,
    user: state.user.user,
  };
};

export default connect(mapStateToProps, { 
  usernameChanged, passwordChanged, userLogin, logoutUser, 
})(Login);
