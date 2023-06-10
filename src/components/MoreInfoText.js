import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

const MoreInfotext = ({ title1, info1, title2, info2, title3, info3 }) => {
    return (
        <View style={styles.moreRow}>
            <View style={styles.moreItem}>
                <Text style={styles.title}>{title1}</Text>
                <Text style={styles.info}>{info1}</Text>
            </View>

            <View style={styles.moreItem}>
                <Text style={styles.title}>{title2}</Text>
                <Text style={styles.info}>{info2}</Text>
            </View>

            <View style={styles.moreItem}>
                <Text style={styles.title}>{title3}</Text>
                <Text style={styles.info}>{info3}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    moreRow: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },

    moreItem: {
        flex: 1
    },

    title: {
        color: '#ffffff90',
        padding: 5,
        fontSize: Dimensions.get('window').width / 30,
    },

    info: {
        color: '#fff',
        padding: 5,
        fontSize: Dimensions.get('window').width / 20,
    }
})

export default MoreInfotext