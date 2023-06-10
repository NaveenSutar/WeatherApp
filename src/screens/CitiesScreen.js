import React, { useCallback, useState } from 'react';
import { Dimensions, FlatList, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import CityBox from '../components/CityBox';
import { useRoute } from '@react-navigation/native';

import { useSelector } from 'react-redux';

const baseurl = 'https://api.weatherapi.com/v1';
const key = '069cae7d446f49c18de122715231605';

const HomeScreen = ({ navigation }) => {
	const { gradient } = useSelector(state => state.homeReducer)

	const route = useRoute();

	const [searchText, setSearchText] = useState();
	const [isLoading, setLoading] = useState(false);
	const [cityData, setCityData] = useState(null);

	const getData = async (text) => {
		try {
			const response = await fetch(`${baseurl}/search.json?key=${key}&q=${text}`);
			if (response.status == 200) {
				const data = await response.json();
				setCityData(data);
				console.log(data);
			}
			else {

			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	const debounce = (func) => {
		let timer;
		return function (...args) {
			const context = this;
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				timer = null;
				func.apply(context, args);
			}, 200);
		};
	};

	const optimizedFn = useCallback(debounce(getData), []);

	return (
		<LinearGradient colors={gradient} style={styles.container} >
			<SafeAreaView style={styles.viewContainer}>
				<TouchableOpacity activeOpacity={0.8} style={styles.menuContainer} onPress={() => { navigation.navigate('Home') }}>
					<Image style={styles.menuIcon} source={require("../../assets/icons/menu.png")} />
				</TouchableOpacity>

				<TouchableOpacity activeOpacity={0.8} style={styles.plusContainer} onPress={() => { }}>
					<Image style={styles.plusIcon} source={require("../../assets/icons/plus.png")} />
				</TouchableOpacity>

				<FlatList
					data={cityData}
					renderItem={({ item }) => <CityBox temp={28} icon={"https://cdn.weatherapi.com/weather/128x128/night/116.png"} city={item.name} country={item.country} />}
					keyExtractor={item => item.id}
					numColumns={2}
					style={styles.flatListScoller}
				/>

				<TextInput
					onChangeText={(e) => optimizedFn(e)}
					value={searchText}
					placeholder="Search City"
					keyboardType="numeric"
					style={styles.searchbar}
					placeholderTextColor={"#ffffff90"}
				/>
			</SafeAreaView>
		</LinearGradient>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},

	viewContainer: {
		flex: 1,
		paddingTop: Dimensions.get('window').width / 30,
	},

	menuContainer: {
		position: 'absolute',
		left: Dimensions.get('window').width / 20,
		top: Dimensions.get('window').width / 10,
	},

	menuIcon: {
		height: Dimensions.get('window').width / 15,
		width: Dimensions.get('window').width / 15,
	},

	searchbar: {
		color: '#fff',
		borderRadius: 20,
		paddingHorizontal: 10,
		position: 'absolute',
		backgroundColor: '#ffffff60',
		width: Dimensions.get('window').width - ((((Dimensions.get('window').width / 20) * 2) + (Dimensions.get('window').width / 15)) * 2),
		height: Dimensions.get('window').width / 12,
		top: Dimensions.get('window').width / 11,
		left: (((Dimensions.get('window').width / 20) * 2) + (Dimensions.get('window').width / 15)),
	},

	plusContainer: {
		position: 'absolute',
		right: Dimensions.get('window').width / 20,
		top: Dimensions.get('window').width / 10,
	},

	plusIcon: {
		height: Dimensions.get('window').width / 20,
		width: Dimensions.get('window').width / 20,
	},

	flatListScoller: {
		marginTop: Dimensions.get('window').width / 20 * 2.5,
	}
})

export default HomeScreen