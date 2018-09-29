import React, { Component } from 'react';
import { View } from 'react-native';
//import axios from 'axios';
import { Header, Button, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import MatchList from './components/MatchList';
import OptionsList from './components/OptionsList';


class App extends Component {
	state = { info: [], loggedIn: null, loggedInForm: false, value: '' }

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

	renderLogin(v) {
		if (this.state.value === 'login') {
			return <LoginForm />;
		} else if (this.state.value === 'match') {
			return <MatchList />;
		} else if (this.state.value === 'options') {
			return <OptionsList />;
		}
	}

	render() {
		console.log(this.state)
		return (
			<View>
				<Header 
					headerText='Authentication' 
					loginShow={() => this.setState({value: 'login'})}
					matchesShow={() => this.setState({value: 'match'})}
					optionsShow={() => this.setState({value: 'options'})}
				/>
				{this.renderLogin()}
			</View>
		);
	}
}


export default App;