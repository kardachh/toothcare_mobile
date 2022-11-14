import React, {useEffect, useState} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform, TouchableWithoutFeedback, Keyboard, Alert
} from "react-native";
import {useAppDispatch} from "../redux/hooks";
import {setAuth} from "../redux/store";
import {useAPI} from "../api";
import {GlobalStyles} from "../GlobalStyles";

export const AuthScreen = (props:any) => {
    const [login, changeLogin] = useState<string>('')
    const [password, changePassword] = useState<string>('')
    const {authUser} = useAPI()
    const dispatch = useAppDispatch()
    const navigation = props.navigation;
    const createButtonAlert = ({
                                   title,
                                   description
                               }: { title: string, description: string }) => Alert.alert(title, description, [{text: "OK"}])

    const onLoginPress = async () => {
        if (await authUser(login, password)){
            dispatch(setAuth(true))
            navigation.replace(props.route.params.navigationKey)
            navigation.reset({
                index: 0,
                routes: [{ name: props.route.params.navigationKey }],
            });
        } else {
            createButtonAlert({title: "Неудачная авторизация", description: "Проверьте корректность данных"})
        }

    }

    return <KeyboardAvoidingView style={GlobalStyles.page} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={GlobalStyles.page}>
                <View style={styles.block}>
                    <View style={styles.blockInput}>
                        <Text style={styles.label}>Логин:</Text>
                        <TextInput
                            style={styles.input}
                            value={login}
                            autoCapitalize='none'
                            placeholder={"Введите логин"}
                            onChangeText={changeLogin}
                        />
                    </View>
                    <View style={styles.blockInput}>
                        <Text style={styles.label}>Пароль:</Text>
                        <TextInput
                            style={styles.input}
                            value={password}
                            autoCapitalize='none'
                            secureTextEntry={true}
                            placeholder={"Введите пароль"}
                            onChangeText={changePassword}
                        />
                    </View>
                </View>
                <View style={[styles.block, styles.blockButton]}>
                    <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                        <Text style={styles.buttonText}>
                            {"Продолжить"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>

    </KeyboardAvoidingView>

}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        marginHorizontal: "10%",
        justifyContent: "center",
    },
    blockInput: {
        marginVertical: 10
    },
    blockButton: {
        alignItems: "center"
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
