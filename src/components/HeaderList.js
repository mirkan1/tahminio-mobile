import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { pageChanged } from '../actions';
import { Button } from './common';

class HeaderList extends Component {
  onPageChange(page="matches_page") {
    this.props.pageChanged(page);
  };

  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={styles.optionsStyle}>
          <Button onPress={this.onPageChange("options_page").bind(this)}>Options</Button>
        </View>
        <View style={styles.headerStyle}>
          <Button onPress={this.onPageChange("matches_page").bind(this)}>{props.headerText}</Button>
        </View>
        <View style={styles.loginStyle}>
          <Button onPress={this.onPageChange("login_page").bind(this)}>login</Button>
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
    flex: 2,
    alignItems: 'center'
  },
  headerStyle: {
    flex: 4,
    alignItems: 'center'
  },
  loginStyle: {
    flex: 2,
    alignItems: 'center'
  }
}

const mapStateTopProps = state => {
  return {
    page: state.page,
  }
}
export default connect(mapStateTopProps, { 
  pageChanged })(HeaderList);
