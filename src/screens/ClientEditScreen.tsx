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
import {Client} from "../types";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export const ClientEditScreen = (props: any) => {
    const client: Client = props.route.params.client
    const [id, setId] = useState<string | null>(null)
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [secondName, setSecondName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [buttonText, setButtonText] = useState<string>('Добавить')
    const {addClient, updateDocFromDb} = useAPI()
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
        if (client) {
            props.navigation.setOptions({headerTitle: "Изменение клиента"})
            setButtonText('Сохранить')
            setId(client.id!)
            setFirstName(client.FirstName)
            setLastName(client.LastName)
            setSecondName(client.SecondName)
            setPhone(client.phone)
        }
    }, [client])

    const onAddPress = async () => {
        if (!firstName.trim() && !lastName.trim() && !secondName.trim() && !phone.trim()) {
            createButtonAlert({title: "Не все поля заполнены", description: ""})
        } else
            addClient({FirstName: firstName, LastName: lastName, SecondName: secondName, phone: phone}).then(() => {
                props.route.params.onPress()
                props.navigation.goBack()
            })
    }
    const onEditPress = async () => {
        if (!firstName.trim() && !lastName.trim() && !secondName.trim() && !phone.trim()) {
            createButtonAlert({title: "Не все поля заполнены", description: ""})
        } else {
            updateDocFromDb("clients", client.id!, {
                FirstName: firstName,
                LastName: lastName,
                SecondName: secondName,
                phone: phone
            }).then(() => {
                props.route.params.onPress()
                props.navigation.goBack()
            })
        }
    }

    return <KeyboardAvoidingView style={GlobalStyles.page} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={GlobalStyles.page}>
                <View style={styles.block}>
                    <View style={styles.blockInput}>
                        <Text style={styles.label}>Имя:</Text>
                        <TextInput

                            style={styles.input}
                            value={firstName}
                            autoCapitalize='none'
                            placeholder={"Введите имя"}
                            onChangeText={setFirstName}
                        />
                    </View><View style={styles.blockInput}>
                    <Text style={styles.label}>Фамилия:</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        autoCapitalize='none'
                        placeholder={"Введите фамилию"}
                        onChangeText={setLastName}
                    />
                </View>
                    <View style={styles.blockInput}>
                        <Text style={styles.label}>Отчество:</Text>
                        <TextInput
                            style={styles.input}
                            value={secondName}
                            autoCapitalize='none'
                            placeholder={"Введите отчество"}
                            onChangeText={setSecondName}
                        />
                    </View>
                    <View style={styles.blockInput}>
                        <Text style={styles.label}>Телефон:</Text>
                        <TextInput
                            style={styles.input}
                            value={phone}
                            autoCapitalize='none'
                            placeholder={"Введите телефон"}
                            onChangeText={setPhone}
                        />
                    </View>
                </View>
                <View style={[styles.blockButton]}>
                    <TouchableOpacity style={styles.select} onPress={client ? onEditPress : onAddPress}>
                        <Text style={styles.buttonText}>
                            {buttonText}
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
        marginTop: "10%"
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
    select: {
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
