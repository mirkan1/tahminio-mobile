import {AppRegistry, View, Text} from 'react-native';
import React from 'react';
import Header from './src/components/header';
import MatchList from './src/components/AlbumList';
// http://rallycoding.herokuapp.com/api/music_albums

const App = () => (
	<View>
		<Header headerText={"Tahmin.io"}/>
		<Text>QWE</Text>
		<MatchList />
	</View>
);

// Render it to the device
AppRegistry.registerComponent('tahminIoReactNative', () => App);
