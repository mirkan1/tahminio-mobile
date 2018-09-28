import React, { Component } from 'react';
import { View } from 'react-native';
//import axios from 'axios';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import MatchList from './components/MatchList';


class App extends Component {
	state = { info: [], loggedIn: null, loggedInForm: false }

	//componentWillMount() {
		// axios.post('http://api.tahmin.io/v1/users/login/', {
		// 	'username':'raq',
		// 	'password':'anadolu123'
		// })
		// 	.then(response => this.setState({ 
		// 		info: response, }))
		// 	.catch(error => {
		// 		console.log(error.response)
		// 	});
	//}

	// onLoginAccepted() {
	// 	return <MatchList />
	// }

	renderLogin() {
		if (this.state.loggedInForm) {
			return <LoginForm />;
		}
	}

	render() {
		console.log(this.state)
		return (
			<View>
				<Header headerText='Authentication' loginShow={() => this.setState({ loggedInForm: true })}/>
					{this.renderLogin()}
				<MatchList />
			</View>
		);
	}
}


export default App;