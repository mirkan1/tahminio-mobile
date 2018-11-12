import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, BackHandler } from 'react-native';
//import { Button } from 'react-native-elements';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { pageChanged } from '../actions';
import LoginForm from './LoginForm';
//import Header from './Header';
import OptionsPage from './OptionsPage';
import MatchPage from './MatchPage';
import MatchDetail from './MatchDetail';


const ToggleBar = ({ pressStatus }) => {
  // TODO 
  // adjust it; make it show when click opotions bar, should be beautiful and animated 
  // Animated blabbla use it
  return (
    <View
      style={
        pressStatus
        ? styles.nonMainStyle
        : null
      }
    >
      <Text>{pressStatus ? "11111111111" : null}</Text>
      <Text>{pressStatus ? "22222222222" : null}</Text>
      <Text>{pressStatus ? "33333333333" : null}</Text>
      <Text>{pressStatus ? "44444444444" : null}</Text>
      <Text>{pressStatus ? "55555555555" : null}</Text>
    </View>
  );
};

class MainPage extends Component {
  state = { pressStatus: false };

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
      // if clicked back button first time and already rendered on a page before
      this.onPageChange(previousPage);
      return true;
    } else if (this.state.count === 0 && pageName !== 'match_page') {
        // If clicked back once and the page that user tries to go back is not MatchPage
        // gives count to +1 and go to previous page. Most probably to MainPage
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
        <Container>
        <Header>
          <Left>
            <Button 
              transparent
              onPress={() => this.onPageChange("options_page")}
            >
              <Icon name='menu' />
            </Button>
          </Left>

          <Body>
            <Button 
              transparent
              onPress={() => this.onPageChange("match_page")}
            >
              <Title>Tahmin-io</Title>
            </Button>
          </Body>
          
          <Right>
            <Button 
              transparent
              onPress={() => this.onPageChange("login_page")}
            >
              <Icon name='person' />
            </Button>
          </Right>
        </Header>
        <Content>
          {this.renderPage()}
        </Content>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Footer</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}

const styles = {
  nonMainStyle: {
    width: 225,
    height: 600,
    position: 'absolute',
    shadowColor: '#000',
    backgroundColor: 'red',
    opacity: 0.8,
    shadowOpacity: 0.2,
    shadowOffset: { height: 1 },
    transform: [{'translate': [0,0, 1]}]
  }
};

const mapStateTopProps = state => {
  return { 
    pages: state.page,
  };
};

export default connect(mapStateTopProps, { pageChanged })(MainPage);
