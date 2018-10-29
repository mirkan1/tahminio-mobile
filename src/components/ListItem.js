import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';
import { CardSection } from './common';

class ListItem extends Component {
  onRowPress() {
    return console.log(this)
  }

  render() {
    const { away_team, home_team } = this.props.match;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Image
              source={{ uri: away_team.logo }}
              style={styles.thumbnailStyle}
            />
            <Text style={styles.titleStyle}>
              {away_team.name}
            </Text>
            <Text style={styles.titleStyle}>
              {home_team.name}
            </Text>
            <Image
              source={{ uri: home_team.logo }}
              style={styles.thumbnailStyle}
            />
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    flex: 2,
    paddingLeft: 15
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

export default ListItem;