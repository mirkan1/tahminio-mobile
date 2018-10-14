<<<<<<< HEAD
import { View, Text } from 'react-native'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common'

class LoginForm extends Component {
  onEmailChange (text) {
    this.props.emailChanged(text)
  }

  onPasswordChange (text) {
    this.props.passwordChanged(text)
  }

  onButtonPress () {
    const { email, password } = this.props
    this.props.loginUser({ email, password })
  }

  renderButton () {
    if (this.props.loading) {
      return <Spinner size="large" />
    }
    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    )
  }

  renderError () {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorTextStyle}>
            {this.props.error}
          </Text>
        </View>
      )
    }
  }

  render () {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@gmail.com"
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
    )
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
    loading: state.auth.loading
  }
}

export default connect(mapStateTopProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm)
=======
import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, Text } from 'react-native';
import { Button, Card, CardSection, Input, Spinner } from './common';
import MatchList from './MatchList';

class LoginForm extends Component {
	state = { 
		email: '',
		password: '',
		Error: '',
		loading: false,
		info: '',
	};

	onButtonPress() {
		const { email, password } = this.state;
		axios.post('http://api.tahmin.io/v1/users/login/', {
			'username': email,
			'password': password
		})
			.then(response =>  
				this.setState({ info: response, Error: 'LOGGED IN' }),
				this.onLoginSuccess.bind(this)
			)
			.catch(error => {
				return this.onLoginFail.bind(this)
			});
	}
	
	onLoginFail() {
		this.setState({ Error: 'Authentication Failed.', loading: false});
	}

	onLoginSuccess() {
		// this.setState({
		// 	email: '',
		// 	password: '',
		// 	loading: false,
		// 	Error: 'LOGGED IN', 
		// });
		if (this.state.Error === 'LOGGED IN') {
			return <MatchList />;
		}
	}

	renderButton() {	// Beautiful xd
		if (this.state.loading) {
			return <Spinner size='small' />;
		}
		
		return (
			<Button onPress={this.onButtonPress.bind(this)}>	
				Log in
			</Button>
		);
	}

	render() {
		console.log(this.state.email);
		return (
			<Card>
				<CardSection>
					<Input
						placeholder="user@gmail.com"
						label='Email'
						value={this.state.email}
						onChangeText={email => this.setState({ email })} 
					/>
				</CardSection>
 				<CardSection>
					<Input
						secureTextEntry
						placeholder="Password"
						label='Password'
						value={this.state.password}
						onChangeText={password => this.setState({ password })} 
					/>
				</CardSection>

 				<Text style={styles.ErrorTextStyle}>
 					{this.state.Error}
 				</Text>
				<CardSection>
					<Button onPress={this.onButtonPress.bind(this)}>
						Log in
					</Button>
				</CardSection>
				<CardSection>{this.onLoginSuccess()}</CardSection>
			</Card>
			
		);
	}
}

const styles = StyleSheet.create({
	ErrorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red',
	},
});


export default LoginForm;
>>>>>>> ddb56f666ec0a14b2e00cc5365f427aa7a796558
