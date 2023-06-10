import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import CitiesScreen from './src/screens/CitiesScreen';
import FlashScreen from './src/screens/FlashScreen';
import ForecastScreen from './src/screens/ForecastScreen';
import HomeScreen from './src/screens/HomeScreen';

import { Provider } from 'react-redux';
import { Store } from './src/redux/store';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={Store}>
			<NavigationContainer>
				<StatusBar barStyle="light-content" translucent={true} />
				<SafeAreaProvider>
					<Stack.Navigator screenOptions={{ headerShown: false }}>
						<Stack.Screen options={{ animation: 'fade' }} component={FlashScreen} name="Flash" />
						<Stack.Screen options={{ animation: 'fade' }} component={HomeScreen} name="Home" />
						<Stack.Screen options={{ animation: 'fade' }} component={CitiesScreen} name="Cities" />
						<Stack.Screen options={{ animation: 'fade_from_bottom' }} component={ForecastScreen} name="Forecast" />
					</Stack.Navigator>
				</SafeAreaProvider>
			</NavigationContainer>
		</Provider>
	);
}