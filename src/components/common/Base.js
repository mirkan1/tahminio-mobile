import React, { Component } from 'react';
import { View, Animated } from 'react-native';
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

const Base = ({ children }) => {
  if (state.status === 'optionsBar') {
    return (
      <OptionsBar />
    );
  }
  return (
    <Container>
      <Header>
        <Left>
          <Button 
            transparent
            onPress={() => toggleBar()}
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
        {children}
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
};

const styles = {
  OptionsBardStyle: {
    visibility: 'hidden', 
    position: 'relative',
    flex: 1,
    height: 120,
    width: 240,
    alignSelf: 'stretch', 
    backgroundColor: '#000', 
    //borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff', 
    // marginLeft: 5,
    // marginRight: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  }
};

export { Base }; // { Button: Button } also posible
