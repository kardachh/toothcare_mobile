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
import {Client, Order, Service} from "../types";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export const ServicesEditScreen = (props: any) => {
    const [service, setService] = useState<Service | null>(null)
    const [buttonText, setButtonText] = useState<string>('Добавить')
    const [id, setId] = useState<string | null>(null)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [price, setPrice] = useState<string>('')

    const {addService, updateDocFromDb} = useAPI()
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
        if (service) {
            props.navigation.setOptions({headerTitle: "Изменение услуги"})
            setButtonText('Сохранить')
            setId(service.id!)
            setName(service.name)
            setDescription(service.description)
            setPrice(service.price.toString())
        }
    }, [service])

    useEffect(() => {
        if (props.route.params && props.route.params.service) {
            setService(props.route.params.service)
        }
    }, [props.route.params])

    const onAddPress = async () => {
        if (!name.trim() && !description.trim() && !price.trim()) {
            createButtonAlert({title: "Не все поля заполнены", description: ""})
        } else
            addService({description: description, name: name, price: Number(price)}).then(() => {
                props.route.params.onPress()
                props.navigation.goBack()
            })
    }

    const onEditPress = async () => {
        if (!name.trim() && !description.trim() && !price.trim()) {
            createButtonAlert({title: "Не все поля заполнены", description: ""})
        } else {
            if (service && service.id)
                updateDocFromDb("services", service.id, {
                    description: description,
                    name: name,
                    price: Number(price)
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
                        <Text style={styles.label}>Наименование:</Text>
                        <TextInput
                            style={styles.input}
                            value={name}
                            autoCapitalize='none'
                            placeholder={"Введите наименование услуги"}
                            onChangeText={setName}
                        />
                    </View><View style={styles.blockInput}>
                    <Text style={styles.label}>Описание:</Text>
                    <TextInput
                        numberOfLines={5}
                        multiline={true}
                        style={[styles.input,{maxHeight:150, minHeight:55,padding: "7%", borderRadius: 30}]}
                        value={description}
                        autoCapitalize='none'
                        placeholder={"Опишите услугу"}
                        onChangeText={setDescription}
                    />
                </View>
                    <View style={styles.blockInput}>
                        <Text style={styles.label}>Цена:</Text>
                        <TextInput
                            keyboardType={"numeric"}
                            style={styles.input}
                            value={price}
                            autoCapitalize='none'
                            placeholder={"Введите цену в руб."}
                            onChangeText={setPrice}
                        />
                    </View>
                </View>
                <View style={[styles.blockButton]}>
                    <TouchableOpacity style={styles.select} onPress={service ? onEditPress : onAddPress}>
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
        marginBottom: 30
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
