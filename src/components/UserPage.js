import { View, Text, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	userGetMe,
	logoutUser,
	userDeleteMe,
	getAnotherUser,
	userVerify,
  getUserTrophies,
} from '../actions';
import { CardSection, Button, Base } from './common';
import { Actions } from 'react-native-router-flux';
import Login from './Login';

class UserPage extends Component {
	state = { count: 0 }
	
/*	componentDidMount() {
		if (this.state.count === 0) {
			console.log("updating info now")
		  const { token } = this.props;
		  this.props.userGetMe({ token });
		  this.setState({ count: this.state.count + 1 });
		}
	}*/

/*	renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
  }*/

	onLogoutUser() {
	  const { token } = this.props;
		this.props.logoutUser({ token });
  }

  onUserDeleteMe() {
  	// TODO
  	// make an alert function that ask if you want to delete your account
  	// demand the owner's password
  	const { token } = this.props;
		this.props.userDeleteMe({ token });
  }

  onGetAnotherUser() {
  	const { token } = this.props;
  	const user_id = 582;
		this.props.getAnotherUser( user_id, { token } );
  }

  onUserVerify() {
  	// TODO
  	// find out where to take verify key
  	const { verification_key } = 1234
  	this.props.userVerify({ verification_key })
  }

  onGetUserTrophies() {
    const { token } = this.props;
    this.props.getUserTrophies({ token });
  }

	renderPage() {
	  const { user } = this.props;
	  if (user === null) {
			return (
		    <View>
          <Login />
		      <CardSection>
		        <TouchableOpacity onPress={() => Actions.ForgotInfo()}>
		          <Text style={{ fontSize: 10 }}>Forgot your password or username?</Text>
		        </TouchableOpacity>
		      </CardSection>

          <CardSection style={{ alignItems: 'center', justifyContent: 'center', margin: 10, }}>
		      <Text style={{ fontSize: 50 }}>OR</Text>
          </CardSection>
		      
		      <CardSection style={{ alignItems: 'center', justifyContent: 'center' }}>
		        <Button onPress={() => Actions.SignUp()}>
		          Sign Up
		        </Button>
		      </CardSection>
		  	</View>
		  );
	  }

	  return (
      <View>
        <Text>{user.first_name}</Text>
        <Text>{user.email}</Text>
        <Text>{user.last_name}</Text>
        <Text>{user.username}</Text>
        <Text>{user.bio}</Text>
        <CardSection>
          <Button onPress={() => Actions.UpdateMe()}>Update Me</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onLogoutUser.bind(this)}>Logout</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onUserDeleteMe.bind(this)}>Delete yourself</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onGetAnotherUser.bind(this)}>getAnotherUser</Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onGetUserTrophies.bind(this)}>GetUserTrophies</Button>
        </CardSection>

        <CardSection>
        	{ !user.is_verified
            ? <Button onPress={this.onUserVerify.bind(this)}>Verify your account</Button>
        		: null
        	}
        </CardSection>

      </View>
    );
	}

	render() {
		return (
			<Base>
				{this.renderPage()}
			</Base>
		);
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
  userGetMe, logoutUser, userDeleteMe,
  getAnotherUser, userVerify, getUserTrophies,
})(UserPage);

