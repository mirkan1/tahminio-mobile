import React, { Component } from 'react';
import { Animated, Easing, Dimensions, ScrollView, Image, ImageBackground, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import Drawer from 'react-native-drawer'
import SlideBar from './SlideBar';

/*const {width, height } = Dimensions.get('window');
const imageWidth = 80;
var animatedValue = new Animated.Value();
var animatedBarValue = new Animated.Value(0);*/

class Base extends Content {
/*  state = { animation: 'close' }*/

/*  slideBar() {
    const barWidth = width / 1.25;

    if (this.state.animation === 'close') {
      animatedBarValue.setValue(0);
      Animated.timing(animatedBarValue, {
        toValue: barWidth,
        duration: 600,
        easing: Easing.linear
      }).start();
      this.setState({ animation: 'open'})
    } else {
      animatedBarValue.setValue(barWidth);
      Animated.timing(animatedBarValue, {
        toValue: 0,
        duration: 600,
        easing: Easing.linear
      }).start();
      this.setState({ animation: 'close'})
    }
  }*/

  render() {
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<SlideBar />}
        type="static"
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
        <Container>
          <Header>
            <Left>
              <Button 
                transparent
                onPress={() => this._drawer.open()}
              >
                <Icon name='menu' />
              </Button>
            </Left>

            <Body>
              <Button 
                transparent
                onPress={() => Actions.MatchPage()}
              >
                <Title>Tahmin-io</Title>
              </Button>
            </Body>
            
            <Right>
              <Button 
                transparent
                onPress={() => Actions.UserPage()}
              >
                <Icon name='person' />
              </Button>
            </Right>
          </Header>
          <Content>
            {this.props.children}
          </Content>
          <Footer>
            <FooterTab>
              <Button full>
                <Text>Footer</Text>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      </Drawer>
    );
  }
};

/*const styles = {
  OptionsBardStyle: {
    backgroundColor: '#123',
    height: height,
    width: animatedBarValue,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    flex: 1,
  },
  image: {
    height: imageWidth,
    width: imageWidth,
  },
  barStyles : {
    backgroundColor: '#123',
    height: 50,
    width: animatedBarValue,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
};*/

export { Base };
