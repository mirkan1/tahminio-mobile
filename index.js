/*import {AppRegistry, View, Text} from 'react-native';
import React from 'react';
import Header from './src/components/header';
import MatchList from './src/components/MatchList';

const App = () => (
	<View>
		<Header headerText={"Tahmin.io"}/>
		<MatchList />
	</View>
);

AppRegistry.registerComponent('tahminIoReactNative', () => App);
*/
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
