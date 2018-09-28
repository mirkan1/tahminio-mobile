import React from 'react';
import { Text, View } from 'react-native';
import { Button } from './index';

const Header = (props) => {
  return (
    <View style={styles.viewStyle}>
      <View style={styles.optionsStyle}>
        <Button>Options</Button>
      </View>
      <View style={styles.headerStyle}>
        <Button><Text style={styles.textStyle}>{props.headerText}</Text></Button>
      </View>
      <View style={styles.loginStyle}>
        <Button onPress={props.loginShow}>login</Button>
      </View>
    </View>
  )
}

const styles = {
  viewStyle: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 }, // calismiyooor
    shadowOpacity: 0.2,
    elevation: 2,	// bu da biraz shadow gibi
    position: 'relative'
  },
  textStyle: {
    fontSize: 20,
  },
  optionsStyle: {
    flex: 2,
    alignItems: 'center',
  },
  headerStyle: {
    flex: 4,
    alignItems: 'center',
  },
  loginStyle: {
    flex: 2,
    alignItems: 'center',
  }
}

export { Header };