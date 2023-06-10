import React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

const LowHighTemp = ({ low, high }) => {
    return (
        <View style={styles.lowHighContainer}>
            <Image style={styles.lowHighIcon} source={require("../../assets/icons/low.png")} />
            <Text style={styles.lowHighUnit}>{low}°   </Text>
            <Image style={styles.lowHighIcon} source={require("../../assets/icons/high.png")} />
            <Text style={styles.lowHighUnit}>{high}°</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    lowHighContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,

    },

    lowHighIcon: {
        height: Dimensions.get('window').width / 25,
        width: Dimensions.get('window').width / 25,
        marginRight: 3
    },

    lowHighUnit: {
        color: '#fff',
        fontSize: Dimensions.get('window').width / 25,
    },
})

export default LowHighTemp