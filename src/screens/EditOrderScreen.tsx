import React, {useEffect, useState} from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    LogBox,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useAppDispatch} from "../redux/hooks";
import {useAPI} from "../api";
import {GlobalStyles} from "../GlobalStyles";
import DatePicker from "react-native-date-picker";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export const OrderEditScreen = (props: any) => {
    const {} = useAPI()
    const [date, setDate] = useState(new Date())
    const dispatch = useAppDispatch()
    const createButtonAlert = ({
                                   title,
                                   description
                               }: {
        title: string,
        description: string
    }) =>
        Alert.alert(title, description, [{text: "OK"}])

    useEffect(() => {
        console.log(date)
    }, [date])

    const onAddPress = async () => {

    }

    const onEditPress = async () => {

    }

    return <KeyboardAvoidingView style={GlobalStyles.page} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={GlobalStyles.page}>
                <DatePicker date={date} onDateChange={setDate}/>
            </View>
        </TouchableWithoutFeedback>

    </KeyboardAvoidingView>

}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        margin: "10%",
    },
    blockInput: {
        marginVertical: 10
    },
    blockButton: {
        alignItems: "center",
        marginBottom: "20%"
    },
    page: {
        flex: 1,
    },
    label: {
        fontSize: 18,
        marginLeft: 25,
        marginBottom: 5
    },
    input: {
        borderColor: "gray",
        width: "100%",
        borderWidth: 1,
        borderRadius: 50,
        padding: 15,
        fontSize: 18
    },
    button: {
        borderWidth: 1,
        borderRadius: 50,
        padding: 15,
        paddingHorizontal: 50,
        alignItems: "center",
        backgroundColor: "#F5F5F5",
    },
    buttonText: {
        fontSize: 18
    }
})
