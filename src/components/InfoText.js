import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const InfoText = ({ heading, info }) => {
    return (
        <View style={styles.dailySingleContainer}>
            <Text style={styles.dailyTime}>{heading}</Text>
            <Text style={styles.dailyText}>{info}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    dailySingleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width / 5.5,
    },

    dailyTime: {
        color: '#ffffff90',
        padding: 5,
        fontSize: Dimensions.get('window').width / 30,
    },

    dailyText: {
        color: '#fff',
        padding: 5,
        fontSize: Dimensions.get('window').width / 20,
    }
})

export default InfoText