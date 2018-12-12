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
import { CardSection, Base } from './common';
import { Actions } from 'react-native-router-flux';
import Login from './Login';
import { Button } from 'native-base';

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

  renderForgot() {
    if (this.props.error !== '') {
      return(
        <View>
          <Text style={{ fontSize: 15, textAlign: 'center' }}>Forgot your password or username?</Text>
        </View>
      );
    }
  }

	renderPage() {
	  const { user } = this.props;
	  if (user === null) {
			return (
		    <View>
          <Login />
		        <TouchableOpacity onPress={() => Actions.ForgotInfo()}>

            {this.renderForgot()}
		          
		        </TouchableOpacity>

          <View style={{ flexDirection: "row", flex: 1, alignItems: 'center', marginLeft: 40, marginRight: 40, marginTop: 10, }}>
            <View style={{ flex: 2,borderBottomColor: 'black', borderBottomWidth: 1 }}>
            </View>

            <View style={{ flex: 1, }}>
		          <Text style={{ fontSize: 30, textAlign: 'center' }}>OR</Text>
		        </View>

            <View style={{ flex: 2, borderBottomColor: 'black', borderBottomWidth: 1, }}>
            </View>
          </View>

            <Button block style={{ marginLeft: 40, marginRight: 40, flex: 1, marginTop: 10, }}onPress={() => Actions.SignUp()}>
              <Text style={{ textAlign: 'center', fontSize: 20, }}>Sign Up</Text>
            </Button>
		  	</View>
		  );
	  }

	  return (
      <ScrollView>

        <View style={{ flexDirection: 'row', margin: 25, alignItems: 'center',}}>
          <Image 
            source={{ uri: 
                user.profile_photo !== null
                ? user.profile_photo
                : 'https://upload.wikimedia.org/wikipedia/commons/9/97/Anonim.png'
            }}
            style={styles.profilePhoto}
          />
          <View style={{ flex: 2, marginLeft: 75, }}>
            <Text>{user.first_name}</Text>
            <Text>{user.email}</Text>
            <Text>{user.last_name}</Text>
            <Text>{user.username}</Text>
            <Text>{user.bio}</Text>
          </View>
        </View>

        <CardSection>
          <Button block style={{ flex: 1 }} onPress={() => Actions.UpdateMe()}>
            <Text>Update Me</Text>
          </Button>
        </CardSection>
        <CardSection>
          <Button block style={{ flex: 1 }} onPress={this.onLogoutUser.bind(this)}>
            <Text>Logout</Text>
          </Button>
        </CardSection>
        <CardSection>
          <Button block style={{ flex: 1 }} onPress={this.onUserDeleteMe.bind(this)}>
            <Text>Delete yourself</Text>
          </Button>
        </CardSection>
        <CardSection>
          <Button block style={{ flex: 1 }} onPress={this.onGetUserTrophies.bind(this)}>
            <Text>GetUserTrophies</Text>
          </Button>
        </CardSection>

        <CardSection>
        	{ !user.is_verified
            ? <Button block style={{ flex: 1 }} onPress={this.onUserVerify.bind(this)}>
                <Text>Verify your account</Text>
              </Button>
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
  profilePhoto: {
    height: width/5,
    width: width/5,
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
    error: state.user.error,
  };
};

export default connect(mapStateTopProps, { 
  userGetMe, logoutUser, userDeleteMe, userVerify, getUserTrophies,
})(UserPage);

