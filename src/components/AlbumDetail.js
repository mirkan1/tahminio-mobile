import React, { Component } from 'react';
import {Text, View, Image, Linking} from 'react-native'; //Linking is for openURL and more stuff open handling links in React-native
import Card from './Card';
import CardSection from './CardSection';
import Button from './Button';

const MatchDetail = ({team}) => {
	console.log(team.home_team)
	return (
		<Card>
			<CardSection>
			<View style={styles.thumbnailContainerStyle}>
				<Image 
					source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgClUkfnUhL7c4TYBc3J5ehIxhPpea4FNOsuDm5qTMZpMjy6X9"}} 
					style={styles.thumbnailStyle} 
				/>
			</View>
			<View style={styles.headerContentStyle}>
				<Text style={styles.headerTextStyle}>{team.id}</Text>
				<Text></Text>
				<Text></Text>
				<Text></Text>
			</View>
			</CardSection>
		</Card>
		
	);
};

const styles = {
	headerContentStyle: {
		flexDirection: 'column',
		justifyContent: 'space-around'
	},
	headerTextStyle: {
		fontSize: 18
	},
	thumbnailStyle: {
		height: 50,
		width: 50,
	},
	thumbnailContainerStyle: {
		justifyContent: 'center',
		alignItems: 'center',
		marginLeft: 5,
		marginRight: 10,
	},
	imageStyle: {
		height: 300,
		flex: 1,
		width: null,

	}
};

export default MatchDetail;