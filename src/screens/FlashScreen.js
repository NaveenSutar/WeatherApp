import React, { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SplashScreen from 'react-native-splash-screen';

const FlashScreen = ({ navigation }) => {
	const [gradient, setGradient] = useState(['#ffffff', '#ffffff'])

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate('Home')
		}, 1500);
	});

	useEffect(() => {
		SplashScreen.hide();
	});

	return (
		<LinearGradient colors={gradient} style={styles.container} >
			<Image source={require('../../assets/icons/weather-app.png')} style={styles.logo} />
			<Image source={require('../../assets/icons/weatherapi_logo.png')} style={styles.apiLogo} />
		</LinearGradient >
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},

	logo: {
		height: Dimensions.get('window').width / 4,
		width: Dimensions.get('window').width / 4
	},

	apiLogo: {
		position: 'absolute',
		bottom: 20,
		width: Dimensions.get('window').width / 6,
		resizeMode: 'contain'
	}
});

export default FlashScreen;