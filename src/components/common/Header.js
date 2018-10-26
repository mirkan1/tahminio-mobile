import React from 'react';
import { Text, View } from 'react-native';

const Header = (props) => {
	return (
		<View style={styles.viewStyle}>
			<Text style={styles.textStyle}>{props.headerText}</Text>
		</View>
	);
};

const styles = {
	viewStyle: {
		backgroundColor: '#F8F8F8',
		justifyContent: 'center',
		alignItems: 'center',
		height: 60,
		paddingTop: 15,
		shadowColor: 'black',
		shadowOffset: {width: 0, height: 2}, // calismiyooor 
		shadowOpacity: 0.2,
		elevation: 2,	// bu da biraz shadow gibi
		position: 'relative'
	},
	textStyle: {
		fontSize: 20,
	}
}

export { Header };
