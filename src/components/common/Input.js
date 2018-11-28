import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, returnKeyType, autoCapitalize }) => {
	return (
		<View style={styles.containerStyle}>
			<Text style={styles.labelStyle}>{label}</Text>
			<TextInput
				secureTextEntry={secureTextEntry}
				placeholder={placeholder}
				autoCorrect={false}
				value={value}
				onChangeText={onChangeText}
				style={styles.inputStyle}
				autoCapitalize={autoCapitalize}
				returnKeyType={returnKeyType}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	inputStyle: {
		color: '#000',
		paddingRight: 5,
		paddingLeft: 5,
		fontSize: 18,
		lineHeight: 23,
		flex: 2,
	},
	labelStyle: {
		fontSize: 18,
		paddingLeft: 20,
		flex: 1,
	},
	containerStyle: {
		height: 40,
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},

});


export { Input };
