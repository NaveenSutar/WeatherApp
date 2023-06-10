import { Dimensions, StyleSheet, View } from 'react-native';

const Hr = () => {
    return (
        <View style={styles.horizontalLine}></View>
    )
}

const styles = StyleSheet.create({
    horizontalLine: {
        height: 0.5,
        backgroundColor: '#ffffff9f',
        width: "100%",
        marginVertical: Dimensions.get('window').width / 30,
    },
})

export default Hr;