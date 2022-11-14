import React, {FC} from "react"
import {StyleSheet, TouchableOpacity, View} from "react-native";

type RoundedBlockProps = {
    children: any,
    onPress?: any,
    info?:any
}

export const RoundedBlock:FC<RoundedBlockProps> = ({children,onPress,info}) => {
    return <TouchableOpacity onPress={()=>onPress()}>
        <View style={styles.view} >
            {children}
        </View>
    </TouchableOpacity>

}

const styles = StyleSheet.create({
    view: {
        borderWidth: 1,
        borderRadius: 30,
        borderColor: "gray",
        marginHorizontal: "5%",
        marginVertical: 10,
        padding: 20
    }
})
