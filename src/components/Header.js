import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { pageChanged } from '../actions';
import { Button } from './common';


class Header extends Component {
  onPageChange (page) {
    this.props.pageChanged({ page }); // changes pageName
  };

  render () {
    return (
      <View style={styles.viewStyle}>
        <View style={styles.optionsStyle}>
          <Button onPress={() => this.onPageChange('options_page')}>Options</Button>
        </View>
        <View style={styles.headerStyle}>
          <Button onPress={() => this.onPageChange('match_page')}>tahminio</Button>
        </View>
        <View style={styles.loginStyle}>
          <Button onPress={() => this.onPageChange('login_page')}>
            {this.props.user === null ? "Login" : "Profile"}
          </Button>
        </View>
      </View>
    )
  }
}

const styles = {
  viewStyle: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  },
  optionsStyle: {
    flex: 1,
    alignItems: 'center'
  },
  headerStyle: {
    flex: 2,
    alignItems: 'center'
  },
  loginStyle: {
    flex: 1,
    alignItems: 'center'
  }
}

const mapStateTopProps = state => {
  return { 
    page: state.page.pageName,
    user: state.auth.user
  };
}
export default connect(mapStateTopProps, { pageChanged })(Header);
