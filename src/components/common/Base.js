import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';

const Base = ({ children }) => {
  return (
    <Container>
      <Header>
        <Left>
          <Button 
            transparent
            onPress={() => Actions.OptionsPage()}
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
  textStyle : {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  buttonStyle: {
    flex: 1, 
    alignSelf: 'stretch', 
    backgroundColor: '#fff', 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff', 
    marginLeft: 5,
    marginRight: 5,
  }
};

export { Base }; // { Button: Button } also posible
