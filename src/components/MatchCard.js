import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { CardSection } from './common';

const MatchCard = ({ match, onPress }) => {
  const { away_team, home_team, score } = match;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.containerStyle}>

          <Image
            source={{ uri: 
                home_team.logo !== null
                ? home_team.logo
                : 'https://www.designevo.com/res/templates/thumb_small/blue-star-and-gray-soccer.png'
            }}
            style={styles.thumbnailStyle}
          />

          <View style={styles.textContainer}>
            <Text style={[styles.teamName, { paddingLeft: 20, textAlign: 'left', }]}>
              {home_team.name}
            </Text>
          </View>

          <View style={{ flex: 1, alignSelf: 'center', }}>
            <Text style={[styles.teamName, { textAlign: 'center', }]}>{score}</Text>
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.teamName, { paddingRight: 20, textAlign: 'right', }]}>
              {away_team.name}
            </Text>
          </View>

          <Image
            source={{ uri: 
                away_team.logo !== null
                ? away_team.logo
                : 'https://www.designevo.com/res/templates/thumb_small/blue-star-and-gray-soccer.png'
            }}
            style={styles.thumbnailStyle}
          />

      </View>
    </TouchableOpacity>
  );
};

const styles = {
  textContainer: {
    flex: 2,
    alignSelf: 'center',
  },
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderColor: '#eaeaea',
    borderRadius: 0.5,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    marginLeft: 15,
    marginRight: 10,
    paddingTop: 15,
    paddingBottom: 15,
  },
  teamName: {
    color: '#4d505b',
    fontWeight: 'bold', 
    fontSize: 18,
  },
  thumbnailStyle: {
    flex: 1,
    height: 60,
    width: 20,
  },
};

export default MatchCard;
