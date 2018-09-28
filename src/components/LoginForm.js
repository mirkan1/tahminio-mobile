import React, { Component } from 'react';
import axios from 'axios';
import { StyleSheet, View, Text } from 'react-native';
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