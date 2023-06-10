import React from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-native-safe-area-context'
import ForeCastDay from '../components/ForeCastDay'
import Hr from '../components/HorizontalLine'
import InfoText from '../components/InfoText'
import Location from '../components/Location'
import MoreInfotext from '../components/MoreInfoText'

import { useSelector, useDispatch } from 'react-redux';
import { setCel } from '../redux/actions';

let dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

const ForecastScreen = ({ navigation }) => {
	const { weatherData, isCel, gradient } = useSelector(state => state.homeReducer)
	const dispatch = useDispatch();

	return (
		<LinearGradient colors={gradient} style={styles.container} >
			<SafeAreaView style={styles.viewContainer}>
				<TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('Home') }}>
					<Image style={styles.lessIcon} source={require("../../assets/icons/low.png")} />
				</TouchableOpacity>

				<Location region={weatherData?.location?.name} country={weatherData?.location?.country} />

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

				<View style={styles.forecastDayContainer}>
					{
						weatherData?.forecast?.forecastday.map((n) => {
							let date = new Date(n.date);
							let day = date.getDay();

							return (
								<ForeCastDay key={n.date_epoch} day={dayName[day]} dayIcon={"https:" + n?.day?.condition?.icon} temp={isCel ? (n?.day?.avgtemp_c).toFixed(1) + "°" : (n?.day?.avgtemp_f).toFixed(1) + "°"} low={isCel ? (n?.day?.mintemp_c).toFixed(1) : (n?.day?.mintemp_f).toFixed(1)} high={isCel ? (n?.day?.maxtemp_c).toFixed(1) : (n?.day?.maxtemp_f).toFixed(1)} />
							)
						})
					}
				</View>

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
		paddingTop: Dimensions.get('window').width / 30,
	},

	lessIcon: {
		height: Dimensions.get('window').width / 15,
		width: Dimensions.get('window').width / 15,
		opacity: 0.5,
	},

	horizontalLine: {
		height: 0.5,
		backgroundColor: '#ffffff9f',
		width: "100%",
		marginVertical: Dimensions.get('window').width / 30,
	},

	dailyContainer: {
		flexDirection: 'row',
	},

	forecastDayContainer: {
		flex: 1,
		justifyContent: 'space-around',
		paddingBottom: Dimensions.get('window').width / 30,
	},

	moreContainer: {
		flex: 1,
		width: '100%',
		paddingHorizontal: Dimensions.get('window').width / 30,
		justifyContent: 'space-around',
		backgroundColor: '#ffffff10'
	}
})

export default ForecastScreen