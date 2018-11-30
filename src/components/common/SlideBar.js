import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ListItem, Container, Content, Text } from 'native-base';


const SlideBar = () => {
  return (
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
            onPress={() => {Actions.OptionsPage();}}>
            <Text>Options</Text>
          </ListItem>
          <ListItem
            button
            onPress={() => {Actions.UserSearch();}}>
            <Text>User Search</Text>
          </ListItem>
          <ListItem
            button
            onPress={() => {Actions.LeaderBoard();}}>
            <Text>LeaderBoard</Text>
          </ListItem>
          <ListItem
            button
            onPress={() => {Actions.Feeds();}}>
            <Text>Feeds</Text>
          </ListItem>
      </Content>
    </Container>
  );
};

export default SlideBar;
