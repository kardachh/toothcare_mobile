import React from 'react';
import {StyleSheet, View, Text} from "react-native";

export const MainScreen = () => {
    return <View style={styles.page}>
        <Text>Main</Text>
    </View>
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})
