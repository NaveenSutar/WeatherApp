import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'

const CityBox = ({ temp, icon, city, country }) => {
    return (
        <View style={styles.cityContainer}>
            <Text style={styles.degree}>{temp}°</Text>
            <Image style={styles.weatherIcon} source={{ uri: icon }} />

            <View>
                <Text style={styles.location}>{city}</Text>
                <Text style={styles.country}>{country}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    cityContainer: {
        width: (Dimensions.get('window').width / 2) - (Dimensions.get('window').width / 20) * 1.5,
        height: (Dimensions.get('window').width / 2) - (Dimensions.get('window').width / 20) * 1.5,
        backgroundColor: '#ffffff30',
        borderRadius: 15,
        marginLeft: Dimensions.get('window').width / 20,
        marginBottom: Dimensions.get('window').width / 20,
        padding: Dimensions.get('window').width / 20,
        justifyContent: 'space-between'
    },

    degree: {
        color: '#fff',
        fontSize: Dimensions.get('window').width / 10
    },

    weatherIcon: {
        height: Dimensions.get('window').width / 12,
        width: Dimensions.get('window').width / 12,
        resizeMode: "contain",
        position: 'absolute',
        top: Dimensions.get('window').width / 20,
        right: Dimensions.get('window').width / 20,
        opacity: 0.5
    },

    location: {
        color: '#fff',
        fontSize: Dimensions.get('window').width / 20,
        fontWeight: 'bold',
        marginBottom: 5
    },

    country: {
        color: '#ffffff90',
        fontSize: Dimensions.get('window').width / 28
    }
})

export default CityBox