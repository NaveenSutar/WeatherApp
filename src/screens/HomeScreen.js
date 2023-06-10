import React, { useEffect, useState, useCallback } from 'react';
import { Alert, Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Hr from '../components/HorizontalLine';
import InfoText from '../components/InfoText';
import Location from '../components/Location';
import LowHighTemp from '../components/LowHighTemp';
import MoreInfotext from '../components/MoreInfoText';

import { useSelector, useDispatch } from 'react-redux';
import { setWeatherData, setCel, setGradient } from '../redux/actions';

const baseurl = 'https://api.weatherapi.com/v1';
const key = '069cae7d446f49c18de122715231605';

let monthName = ['January', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const HomeScreen = ({ navigation }) => {
	const { weatherData, isCel, gradient } = useSelector(state => state.homeReducer)
	const dispatch = useDispatch();

	const [isLoading, setLoading] = useState(false);
	const [dateFormat, setDateFormat] = useState('');
	const [city] = useState('Bangalore');
	const [searchText] = useState();

	const getWeatherData = async () => {
		try {
			const response = await fetch(`${baseurl}/forecast.json?key=${key}&q=${city}&days=5&aqi=no&alerts=no`);

			if (response.status == 200) {
				const data = await response.json();
				dispatch(setWeatherData(data));

				data?.current?.is_day == 0 ? dispatch(setGradient(['#696969', '#555555'])) : dispatch(setGradient(['#39ccf7', '#2e8ef4']))

				let date = new Date(data?.location?.localtime);
				let day = date.getDate();
				let month = date.getMonth();
				let dayCount = date.getDay();
				setDateFormat(dayName[dayCount] + ', ' + monthName[month] + ' ' + day)
			}
			else {
				setWeatherData({});
				Alert.alert("Something went Wrong");
			}

		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getWeatherData();
	}, []);

	const getSearchData = async (text) => {
		try {
			const response = await fetch(`${baseurl}/forecast.json?key=${key}&q=${text}&days=5&aqi=no&alerts=no`);

			if (response.status == 200) {
				const data = await response.json();
				dispatch(setWeatherData(data));

				data?.current?.is_day == 0 ? dispatch(setGradient(['#696969', '#555555'])) : dispatch(setGradient(['#39ccf7', '#2e8ef4']))

				let date = new Date(data?.location?.localtime);
				let day = date.getDate();
				let month = date.getMonth();
				let dayCount = date.getDay();
				setDateFormat(dayName[dayCount] + ', ' + monthName[month] + ' ' + day)
			}
			else {
				setWeatherData({});
			}

		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

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

	const optimizedFn = useCallback(debounce(getSearchData), []);

	return (
		<LinearGradient colors={gradient} style={styles.container} >
			<SafeAreaView style={styles.viewContainer}>
				{/* <TouchableOpacity activeOpacity={0.8} style={styles.menuContainer} onPress={() => { navigation.navigate('Cities', { back: gradient }) }}>
					<Image style={styles.menuIcon} source={require("../../assets/icons/menu.png")} />
				</TouchableOpacity> */}

				<View style={styles.searchbarContainer}>
					<TextInput
						onChangeText={e => optimizedFn(e)}
						value={searchText}
						placeholder="Search City"
						style={styles.searchbar}
						placeholderTextColor={"#ffffff90"}
					/>

					<TouchableOpacity activeOpacity={0.8} onPress={() => { dispatch(setCel(!isCel)) }}>
						<Text style={styles.unit}>{isCel ? "°C" : "°F"}</Text>
					</TouchableOpacity>
				</View>

				<Text style={styles.date}>{dateFormat}</Text>

				<Location region={weatherData?.location?.name} country={weatherData?.location?.country} />

				<View style={styles.degreeImageContainer}>
					<View style={styles.degreeContainer}>
						<Text style={styles.degree}>{isLoading ? "--" : isCel ? weatherData?.current?.temp_c + "°" : weatherData?.current?.temp_f + "°"}</Text>

						<Text style={styles.feelText}>Feels Like {isCel ? weatherData?.current?.feelslike_c + "°" : weatherData?.current?.feelslike_f + "°"}</Text>

						<LowHighTemp
							low={isCel
								?
								weatherData?.forecast?.forecastday[0]?.day?.mintemp_c
								:
								weatherData?.forecast?.forecastday[0]?.day?.mintemp_f}

							high={isCel
								?
								weatherData?.forecast?.forecastday[0]?.day?.maxtemp_c
								:
								weatherData?.forecast?.forecastday[0]?.day?.maxtemp_f
							} />

					</View>
					<View style={styles.iconContainer}>
						<Image style={styles.weatherIcon} source={{ uri: 'https:' + weatherData?.current?.condition?.icon }} />
					</View>
				</View>

				<Text style={styles.weatherStatus}>{weatherData?.current?.condition?.text}</Text>

				<Hr />

				<View style={styles.dailyContainer}>
					<ScrollView horizontal showsHorizontalScrollIndicator={false}>
						{
							weatherData?.forecast?.forecastday[0]?.hour.map((n) => {
								let time = new Date(n.time);
								let hours = (time.getHours()) % 12;

								var dd = "AM";
								var h = hours;
								if (h >= 12) {
									h = hours - 12;
									dd = "PM";
								}
								if (h == 0) {
									h = 12;
								}

								return (<InfoText key={n.time_epoch} heading={hours == 0 ? 12 + " " + dd : hours + " " + dd} info={isCel ? n.temp_c + "°" : n.temp_f + "°"} />);
							})
						}
					</ScrollView>
				</View>

				<Hr />

				<View style={styles.moreContainer}>
					<MoreInfotext
						title1={"Sunrise"}
						info1={weatherData?.forecast?.forecastday[0]?.astro?.sunrise}
						title2={"Wind"}
						info2={weatherData?.current?.wind_kph + " km/h"}
						title3={"Precipitation"}
						info3={weatherData?.current?.precip_mm + " mm"} />
					<MoreInfotext
						title1={"Sunset"}
						info1={weatherData?.forecast?.forecastday[0]?.astro?.sunset}
						title2={"Pressure"}
						info2={weatherData?.current?.pressure_mb + " mb"}
						title3={"Humidity"}
						info3={weatherData?.current?.humidity + " %"} />
				</View>

				<TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('Forecast') }}>
					<Image style={styles.moreIcon} source={require("../../assets/icons/high.png")} />
				</TouchableOpacity>

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
		alignItems: 'center',
		paddingVertical: Dimensions.get('window').width / 30,
	},

	// menuContainer: {
	// 	position: 'absolute',
	// 	left: Dimensions.get('window').width / 20,
	// 	top: Dimensions.get('window').width / 10,
	// },

	// menuIcon: {
	// 	height: Dimensions.get('window').width / 15,
	// 	width: Dimensions.get('window').width / 15
	// },

	searchbarContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		width: "100%",
		paddingHorizontal: Dimensions.get('window').width / 30,
		alignItems: 'center'
	},

	searchbar: {
		flex: 1,
		color: '#fff',
		borderRadius: 20,
		paddingHorizontal: 10,
		marginRight: Dimensions.get('window').width / 30,
		alignSelf: 'flex-start',
		backgroundColor: '#ffffff60',
		width: Dimensions.get('window').width - ((Dimensions.get('window').width / 20) * 4),
		height: Dimensions.get('window').width / 12,
	},

	unit: {
		color: '#fff',
		fontSize: Dimensions.get('window').width / 20,
	},

	date: {
		color: '#fff',
		fontSize: Dimensions.get('window').width / 25,
		marginTop: Dimensions.get('window').width / 30,
	},

	degreeImageContainer: {
		flexDirection: 'row',
		marginTop: Dimensions.get('window').width / 100,
	},

	degreeContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	degree: {
		color: '#fff',
		fontSize: Dimensions.get('window').width / 6,
	},

	feelText: {
		fontSize: Dimensions.get('window').width / 30,
		color: '#ffffff90',
		marginTop: Dimensions.get('window').width / 200
	},

	iconContainer: {
		flex: 1,
		alignItems: 'center'
	},

	weatherIcon: {
		height: Dimensions.get('window').width / 2.5,
		width: Dimensions.get('window').width / 2.5,
		opacity: 1,
		resizeMode: "contain"
	},

	weatherStatus: {
		color: '#fff',
		fontSize: Dimensions.get('window').width / 16,
		fontWeight: 'bold',
		marginTop: Dimensions.get('window').width / 100,
		marginBottom: Dimensions.get('window').width / 40,
	},

	dailyContainer: {
		flexDirection: 'row',

	},

	moreContainer: {
		flex: 1,
		width: '100%',
		paddingHorizontal: Dimensions.get('window').width / 30,
	},

	moreIcon: {
		opacity: 0.5,
		height: Dimensions.get('window').width / 15,
		width: Dimensions.get('window').width / 15
	}
})

export default HomeScreen