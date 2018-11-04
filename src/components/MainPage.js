import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, BackHandler } from 'react-native';
import { pageChanged } from '../actions';
import LoginForm from './LoginForm';
import Header from './Header';
import OptionsPage from './OptionsPage';
import MatchPage from './MatchPage';
import MatchDetail from './MatchDetail';

class MainPage extends Component {
  state = { count: 0 };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    // TODO a lil bug in here fix it later
    const { previousPage, pageName } = this.props.pages;

    if (previousPage !== '') {
      this.onPageChange(previousPage);
      return true;
    } else if (this.state.count === 0 && pageName !== 'match_page') {
        this.onPageChange(previousPage);
        this.setState({ count: 1 });
        return true;
    } else {
        this.setState({ count: 0 });
    }
  }

  onPageChange(page) {
    this.props.pageChanged({ page });
  }

  renderPage() {
    switch (this.props.pages.pageName) {
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
  return { pages: state.page };
};

export default connect(mapStateTopProps, { pageChanged })(MainPage);
