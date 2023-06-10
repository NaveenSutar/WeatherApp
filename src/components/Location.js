

import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const Location = ({ region, country }) => {
    return (
        <View>
            <Text style={styles.location}>{region}</Text>
            <Text style={styles.country}>{country}</Text>
        </View>
    )
}

export default Location

const styles = StyleSheet.create({
    location: {
        color: '#fff',
        fontSize: Dimensions.get('window').width / 15,
        marginTop: Dimensions.get('window').width / 30,
        marginBottom: Dimensions.get('window').width / 40,
        textAlign: 'center'

    },

    country: {
        color: '#ffffff90',
        fontSize: Dimensions.get('window').width / 30,
        marginBottom: Dimensions.get('window').width / 30,
        textAlign: 'center'
    },
})