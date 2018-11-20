import { View, Text, FlatList } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
  userGetMe,
  logoutUser,
} from '../actions';
import { Card, CardSection, Input, Button, Spinner, Base } from './common';
import UserSearchData from './UserSearchData';
import { Actions } from 'react-native-router-flux';

class UserPage extends Component {
	state = { count: 0}
	
/*	componentDidMount() {
		if (this.state.count === 0) {
			console.log("updating info now")
		  const { token } = this.props;
		  this.props.userGetMe({ token });
		  this.setState({ count: this.state.count + 1 });
		}
	}*/

	renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
  }

	onLogoutUser() {
	  const { token } = this.props;
		this.props.logoutUser({ token });
  }

	renderPage() {
	  const { user } = this.props;
	  if (user === null) {
			return (
		    <View>
		      <CardSection>
		        <Button onPress={() => Actions.Login()}>
		          Login
		        </Button>
		      </CardSection>

		      <Text>OR</Text>
		      
		      <CardSection>
		        <Button onPress={() => Actions.SignUp()}>
		          Sign Up
		        </Button>
		      </CardSection>
		  	</View>
		  );
	  }
	  //console.log(user.data)
	  return (
      <View>
        <Text>{user.data.first_name}</Text>
        <Text>{user.data.email}</Text>
        <Text>{user.data.last_name}</Text>
        <Text>{user.data.username}</Text>
        <Text>{user.data.bio}</Text>
        <CardSection>
          <Button onPress={() => Actions.UpdateMe()}>Update Me</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onLogoutUser.bind(this)}>Logout</Button>
        </CardSection>
        <UserSearchData />
      </View>
    );
	}

	render() {
		return (
			<Base>
				{this.renderPage()}
			</Base>
		) 
	}
};

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateTopProps = state => {
  return {
    user: state.user.user,
    token: state.user.token,
    loading: state.user.loading,
  };
};

export default connect(mapStateTopProps, { 
  userGetMe, logoutUser
})(UserPage);

