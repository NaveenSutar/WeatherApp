import React from 'react'
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import LowHighTemp from './LowHighTemp'

const ForeCastDay = ({ day, dayIcon, temp, low, high }) => {
    return (
        <View style={styles.forcastContainer}>
            <Text style={styles.text1}>{day}</Text>
            <Image style={styles.weatherIcon} source={{ uri: dayIcon }} />

            <Text style={styles.text2}>{temp}</Text>
            <LowHighTemp low={low} high={high} />
        </View>
    )
}

export default ForeCastDay

const styles = StyleSheet.create({
    forcastContainer: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: Dimensions.get('window').width / 30,
        alignItems: 'center'
    },

    text1: {
        flex: 2,
        color: '#fff'
    },

    weatherIcon: {
        height: Dimensions.get('window').width / 12,
        width: Dimensions.get('window').width / 12,
        resizeMode: "contain",
        flex: 2
    },

    text2: {
        flex: 2,
        color: '#fff',
        fontWeight: 'bold'
    },
})