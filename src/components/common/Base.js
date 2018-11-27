import React, { Component } from 'react';
import { Animated, Easing, Dimensions, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

state = { status: null}

const OptionsBar = () => {
  // TODO
  // learn Animated.View from medium page that I bookmarked
  return (
    <Animated.View style={styles.OptionsBardStyle}>
      <Button 
        transparent
        onPress={() => toggleBar()}
      >
        <Icon name='menu' />
      </Button>
      <Text style={{ marginLeft: 15, color: '#fff' }}>Option1</Text>
      <Text style={{ marginLeft: 15, color: '#fff' }}>Option2</Text>
      <Text style={{ marginLeft: 15, color: '#fff' }}>Option3</Text>
      <Text style={{ marginLeft: 15, color: '#fff' }}>Option4</Text>
    </Animated.View>
  );
};

const toggleBar = () => {
  if (state.status === null) {
    state.status = 'optionsBar';
    return Actions.MatchPage();
  } else {
    state.status = null;
    return Actions.MatchPage();
  }
  
};

const {width, height } = Dimensions.get('window');
const imageWidth = 80;
var animatedValue = new Animated.Value();
var animatedBarValue = new Animated.Value(0);

class Base extends Content {
  state = { animation: 'open' }

  componentWillMount() {
    //this.setState({ animatedValue: new Animated.Value() })
    //animationValue = new Animated.Value()
    //animatedBarValue = new Animated.Value()
  }

  componentDidMount() {
    this.startAnimation();
    //this.startBarAnimation();
  }

  startAnimation() {
    animatedValue.setValue(width);
    Animated.timing(
      animatedValue,
      {
        toValue: -imageWidth,
        duration: 6000,
        easing: Easing.linear,
      }
    ).start(() => this.startAnimation());
  }

  startBarAnimation() {
    const barWidth = width / 1.25;
    if (this.state.animation === 'open') {
      animatedBarValue.setValue(0);
      Animated.timing(animatedBarValue, {
        toValue: barWidth,
        duration: 600,
        easing: Easing.linear
      }).start();
      this.setState({ animation: 'close'})
    } else {
      animatedBarValue.setValue(barWidth);
      Animated.timing(animatedBarValue, {
        toValue: 0,
        duration: 600,
        easing: Easing.linear
      }).start();
      this.setState({ animation: 'open'})
    }
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button 
              transparent
              onPress={() => this.startBarAnimation()}
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
            <OptionsBar />
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
