import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { CardSection } from './common';

const MatchCard = ({ match, onPress }) => {
  const { away_team, home_team } = match;
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View>
        <CardSection>
          <Image
            source={{ uri: 
                home_team.logo !== null
                ? home_team.logo
                : 'https://www.designevo.com/res/templates/thumb_small/blue-star-and-gray-soccer.png'
            }}
            style={styles.thumbnailStyle}
          />
          <View style={{ alignItems: 'center', paddingTop: 25, flex:2, }}>
            <Text style={styles.titleStyle}>
              {home_team.name}
            </Text>
          </View>
          <View style={{ flexDirection: 'row-reverse', alignItems: 'center', paddingTop: 25, flex:2, }}>
            <Text style={styles.titleStyle}>
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
        </CardSection>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = {
  titleStyle: {
    fontSize: 18,
  },
  thumbnailContainerStyleLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 10
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
};

export default MatchCard;