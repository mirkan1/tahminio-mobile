import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';
import { pageChanged } from '../actions';
import LoginForm from './LoginForm';
import Header from './Header';
import OptionsPage from './OptionsPage';
import MatchPage from './MatchPage';
import MatchDetail from './MatchDetail';

class MainPage extends Component {
  onPageChange(page) {
    this.props.pageChanged({ page });
  }

  renderPage() {
    switch (this.props.page) {
      case 'options_page':
        return <OptionsPage />;
      case 'login_page':
        return <LoginForm />;
      case 'match_page':
        return <MatchPage />;
      case 'match_detail':
        return <MatchDetail />;
      default:
        return <MatchPage />;
    } 
  }

  render() {
    return (
      <View>
        <Header />
        {this.renderPage()}
      </View>
    );
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
};

const mapStateTopProps = state => {
  return { page: state.page.pageName };
};

export default connect(mapStateTopProps, { pageChanged })(MainPage);
