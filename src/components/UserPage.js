import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
	userGetMe,
	logoutUser,
	userDeleteMe,
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
		          <Text style={{ fontSize: 10, textAlign: 'center' }}>Forgot your password or username?</Text>
		        </TouchableOpacity>
		      </CardSection>

          <CardSection style={{flex: 1, alignItems: 'center', justifyContent: 'center', margin: 10, }}>
		      <Text style={{ fontSize: 50, textAlign: 'center' }}>OR</Text>
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
      <ScrollView>

        <View style={{ flexDirection: 'row', marginTop: 25, alignItems: 'center',}}>
          <Image 
            source={{ uri: 
                user.profile_photo !== null
                ? user.profile_photo
                : 'https://upload.wikimedia.org/wikipedia/commons/9/97/Anonim.png'
            }}
            style={styles.profilPhoto}
          />
          <View style={{ flex: 2, }}>
            <Text>{user.first_name}</Text>
            <Text>{user.email}</Text>
            <Text>{user.last_name}</Text>
            <Text>{user.username}</Text>
            <Text>{user.bio}</Text>
          </View>
        </View>

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
          <Button onPress={this.onGetUserTrophies.bind(this)}>GetUserTrophies</Button>
        </CardSection>

        <CardSection>
        	{ !user.is_verified
            ? <Button onPress={this.onUserVerify.bind(this)}>Verify your account</Button>
        		: null
        	}
        </CardSection>

      </ScrollView>
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

const { width, height } = Dimensions.get("window");
const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  profilPhoto: {
    flex: 1,
    height: width/4,
    width: width/4,
    borderRadius: 64,
    borderWidth: 1,
    borderColor: 'black',
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
  userGetMe, logoutUser, userDeleteMe, userVerify, getUserTrophies,
})(UserPage);

