import React, { Component } from 'react';
import { Animated, Easing, Dimensions, ScrollView, Image, ImageBackground, StatusBar } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { List, ListItem, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

state = { status: null}


const {width, height } = Dimensions.get('window');
const imageWidth = 80;
var animatedValue = new Animated.Value();
var animatedBarValue = new Animated.Value(0);

class Base extends Content {
  state = { animation: 'close' }

  componentWillMount() {
    //this.setState({ animatedValue: new Animated.Value() })
    //animationValue = new Animated.Value()
    //animatedBarValue = new Animated.Value()
  }

  slideBar() {
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
  }

  OptionsBar() {
    // TODO
    // learn Animated.View from medium page that I bookmarked
    return (
      <Animated.View style={styles.OptionsBardStyle}>
        <Container>
          <Content>
            <ImageBackground
              source={{
                uri: 'https://screenshotscdn.firefoxusercontent.com/images/1cedb56a-e229-4daf-8c8c-354e2a14d24a.png'
              }}
              style={{
                height: 120,
                alignSelf: "stretch",
                justifyContent: "center",
                alignItems: "center"
              }}>
              <Text>TAHMINIO</Text>
              <Image
                square
                style={{ height: 80, width: 70 }}
                source={{ uri: 'https://raw.githubusercontent.com/lucasbento/react-native-actions/master/common/media/logo.png' }}
              />
            </ImageBackground>
              <ListItem
                button
                onPress={() => {this.slideBar(); Actions.OptionsPage();}}>
                <Text>Options</Text>
              </ListItem>
              <ListItem
                button
                onPress={() => {this.slideBar(); Actions.WantedUser();}}>
                <Text>User Search</Text>
              </ListItem>
          </Content>
        </Container>
      </Animated.View>
    );
  };

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button 
              transparent
              onPress={() => this.slideBar()}
            >
              <Icon name='menu' />
            </Button>
          </Left>

          <Body>
            <Button 
              transparent
              onPress={
                this.state.animation === 'open'
                ? null
                : () => Actions.MatchPage()
              }
            >
              <Title>Tahmin-io</Title>
            </Button>
          </Body>
          
          <Right>
            <Button 
              transparent
              onPress={
                this.state.animation === 'close'
                ? () => Actions.UserPage()
                : () => {this.slideBar(); Actions.UserPage();}
              }
            >
              <Icon name='person' />
            </Button>
          </Right>
        </Header>
        <Content>
          <ScrollView horizontal>
            {/*<Animated.Image
              style={[
                styles.image,
                { left: animatedValue },
                ]}
                source={{ uri: 'https://raw.githubusercontent.com/lucasbento/react-native-actions/master/common/media/logo.png' }}
            />
            <Animated.View
              style={styles.barStyles}
              delay={100}
            />*/}
            {this.OptionsBar()}
            {this.props.children}
          </ScrollView>
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
};

const styles = {
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
};

export { Base };
