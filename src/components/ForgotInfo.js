import React, { Component } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Text } from 'react-native';
import { connect } from 'react-redux';
import { usernameChanged, requestPasswordReset } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class ForgotInfo extends Component {
  onInfoChange(user_identifier) {
    this.props.usernameChanged(user_identifier);
  }

  onButtonPress() {
    const { user_identifier } = this.props;
    this.props.requestPasswordReset(user_identifier);
  }

  renderResponse() {
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

  render() {
    return (
  		<KeyboardAvoidingView behavior="padding">
        <Card>
          <CardSection>
            {this.renderResponse()}
          </CardSection>

          <CardSection>
            <Input 
              style={styles.inputStyle}
              label="Username or e-mail"
              placeholder="Username or e-mail"
              onChangeText={this.onInfoChange.bind(this)}
              value={this.props.user_identifier}
              returnKeyType="go"
              autoCorrect={false}
              autoCapitalize="none"
            />
          </CardSection>

          <CardSection>
            <Button onPress={this.onButtonPress.bind(this)}>
              Go
            </Button>
          </CardSection>
        </Card>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  inputStyle: {
    height: 40,

  },
});

const mapStateToProps = state => {
  return {
    user_identifier: state.user.username,
    error: state.user.error,
  };
};

export default connect(mapStateToProps, { 
  usernameChanged, requestPasswordReset,
})(ForgotInfo);