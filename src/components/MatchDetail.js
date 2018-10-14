import React from 'react'
import { Text, View, Image } from 'react-native' // Linking is for openURL and more stuff open handling links in React-native
import { Card, CardSection } from './common'

const MatchDetail = (props) => {
  return (
    <Card>
      <CardSection>
        <View style={styles.thumbnailContainerStyleLeft}>
          <Image
            source={{ uri: props.home_team.logo }}
            style={styles.thumbnailStyle}
          />
          <Text>{props.home_team.name}</Text>
          <Text>{props.home_team.id}</Text>
        </View>
        <View style={styles.headerContentStyle}>
          <Text>{props.first_half_score}</Text>
        </View>
        <View style={styles.thumbnailContainerStyleRight}>
          <Image
            source={{ uri: props.away_team.logo }}
            style={styles.thumbnailStyle}
          />
          <Text>{props.away_team.name}</Text>
          <Text>{props.away_team.id}</Text>
        </View>
      </CardSection>
    </Card>
  )
}
      /////////////////////////////////////////////////////////////////////////
	    // TODO														                                    //  
	    // Left team must be stick on left side of card..		                  //
      ////////////////////////////////////////////////////////////////////////
      
const styles = {
  thumbnailContainerStyleLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 10
  },
  headerContentStyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  thumbnailContainerStyleRight: {
    flex: 1,
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 5
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null

  }
}

export default MatchDetail
