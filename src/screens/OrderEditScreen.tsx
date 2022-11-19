import React, {useEffect, useRef, useState} from 'react';
import {
    Alert,
    Keyboard,
    KeyboardAvoidingView,
    LogBox,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useAPI} from "../api";
import {GlobalStyles} from "../GlobalStyles";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {addWeeks, format} from "date-fns";
import {AutocompleteDropdown} from "react-native-autocomplete-dropdown";
import {Client, Order, Service, User} from "../types";
import {setOrderNeedUpdate} from "../redux/store";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);

export const OrderEditScreen = (props: any) => {
    const [order,setOrder] = useState<Order|null>(null)
    const timeController = useRef<any>(null)
    const serviceController = useRef<any>(null)
    const clientController = useRef<any>(null)
    const userController = useRef<any>(null)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [id, setId] = useState<string | null>(null)
    const [datePicked, setDatePicked] = useState<string>(format(new Date(), "dd.MM.yyyy"));
    const [selectedTime, setSelectedTime] = useState<any>("8:00");
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [selectedClient, setSelectedClient] = useState<Client | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [buttonText, setButtonText] = useState<string>('Добавить')

    const {updateOrder, addOrder} = useAPI()
    const dispatch = useAppDispatch()
    const {services, clients, users} = useAppSelector(state => state.slice)
    const createButtonAlert = ({
                                   title,
                                   description
                               }: {
        title: string,
        description: string
    }) =>
        Alert.alert(title, description, [{text: "OK"}])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        setDatePicked(format(date, "dd.MM.yyyy"))
        hideDatePicker();
    };

    const onAddPress = async () => {
        if (!datePicked.trim() && !selectedTime.trim() && !selectedService && !selectedClient && !selectedUser) {
            createButtonAlert({title: "Не все поля заполнены", description: ""})
        } else
            addOrder({
                client: selectedClient!,
                service: selectedService!,
                user: selectedUser!,
                date: datePicked,
                time: selectedTime
            }).then(() => {
                dispatch(setOrderNeedUpdate(true))
                props.navigation.goBack()
            })
    }

    const onEditPress = async () => {
        if (!datePicked && !selectedTime && !selectedService && !selectedClient && !selectedUser && !selectedUser!.id) {
            createButtonAlert({title: "Не все поля заполнены", description: ""})
        } else {
            if (selectedClient && selectedService && selectedUser && id) {
                updateOrder({client: selectedClient, date: datePicked, service: selectedService, time: selectedTime, user: selectedUser, id:id}).then(() => {
                    dispatch(setOrderNeedUpdate(true))
                    props.navigation.goBack()
                }).catch(e=>console.error(e))
            }
        }
    }

    useEffect(()=>{
        if (props.route.params && props.route.params.order){
            setOrder(props.route.params.order)
        }
    },[props.route.params])

    useEffect(() => {
        if (order && timeController && timeController.current) {
            console.log("orderInfo", order)
            props.navigation.setOptions({headerTitle: "Изменение записи"})
            setButtonText('Сохранить')
            // normal
            setDatePicked(order.date)
            setId(order.id!)
            // trouble
            setSelectedTime(order.time)
            timeController.current.setItem({id:order.time,title:order.time})

            setSelectedService(order.service)
            serviceController.current.setItem({id:order.service.id,title:order.service.name})

            setSelectedClient(order.client)
            clientController.current.setItem({id:order.client.id,title:`${order.client.LastName} ${order.client.FirstName} ${order.client.SecondName}`})

            setSelectedUser(order.user)
            const user = users.find((user:User)=> user.id === order.user.toString())
            userController.current.setItem({id:order.user,title:`${user.LastName} ${user.FirstName} ${user.SecondName}`})
        }
    }, [order])

    return <KeyboardAvoidingView style={[GlobalStyles.page]} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[GlobalStyles.page,]}>
                <View style={styles.block}>
                    <View style={styles.blockInput}>
                        <Text style={styles.label}>Дата:</Text>
                        <TouchableOpacity style={styles.input} onPress={showDatePicker}>
                            <Text style={styles.buttonText}>
                                {datePicked}
                            </Text>
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            minimumDate={new Date()}
                            maximumDate={addWeeks(new Date(), 3)}
                            minuteInterval={30}
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />
                    </View>
                    <View style={[styles.blockInput, Platform.select({ios: {zIndex: 9}})]}>
                        <Text style={styles.label}>Время:</Text>
                        <AutocompleteDropdown
                            controller={controller => {
                                timeController.current = controller
                            }}
                            textInputProps={
                                {
                                    style: {
                                        backgroundColor: "white", borderRadius: 999
                                    }
                                }}
                            inputContainerStyle={{
                                backgroundColor: '#FFF',
                                borderRadius: 999
                            }}
                            showClear={false}
                            containerStyle={styles.select}
                            clearOnFocus={true}
                            closeOnBlur={false}
                            closeOnSubmit={false}
                            initialValue={selectedTime ? selectedTime : "8:00"}
                            onSelectItem={(item) => item && setSelectedTime(item.id)}
                            dataSet={[
                                {id: '8:00', title: '8:00',},
                                {id: '8:30', title: '8:30'},
                                {id: '9:00', title: '9:00'},
                                {id: '9:30', title: '9:30'},
                                {id: '10:00', title: '10:00'},
                                {id: '10:30', title: '10:30'},
                                {id: '11:00', title: '11:00'},
                                {id: '11:30', title: '11:30'},
                                {id: '12:00', title: '12:00'},
                                {id: '12:30', title: '12:30'},
                                {id: '13:00', title: '13:00'},
                            ]}
                        />
                    </View>
                    <View style={[styles.blockInput, Platform.select({ios: {zIndex: 8}})]}>
                        <Text style={styles.label}>Услуга:</Text>
                        <AutocompleteDropdown
                            controller={controller => {
                                serviceController.current = controller
                            }}
                            textInputProps={
                                {
                                    style: {
                                        backgroundColor: "white", borderRadius: 999
                                    }
                                }}
                            inputContainerStyle={{
                                backgroundColor: '#FFF',
                                borderRadius: 999
                            }}
                            onClear={() => setSelectedService(null)}
                            containerStyle={styles.select}
                            clearOnFocus={true}
                            closeOnBlur={false}
                            closeOnSubmit={false}
                            onSelectItem={(item) => item && setSelectedService(services.find((service: Service) => service.id === item.id))}
                            dataSet={services.map((service: Service) => ({id: service.id, title: service.name}))}
                        />
                    </View>
                    <View style={[styles.blockInput, Platform.select({ios: {zIndex: 7}})]}>
                        <Text style={styles.label}>Клиент:</Text>
                        <AutocompleteDropdown
                            controller={controller => {
                                clientController.current = controller
                            }}
                            textInputProps={
                                {
                                    style: {
                                        backgroundColor: "white", borderRadius: 999
                                    }
                                }}
                            inputContainerStyle={{
                                backgroundColor: '#FFF',
                                borderRadius: 999
                            }}
                            containerStyle={styles.select}
                            clearOnFocus={true}
                            onClear={() => setSelectedClient(null)}
                            closeOnBlur={false}
                            closeOnSubmit={false}
                            onSelectItem={(item) => item && setSelectedClient(clients.find((client: Client) => client.id === item.id))}
                            dataSet={clients.map((client: Client) => ({
                                id: client.id,
                                title: `${client.LastName} ${client.FirstName} ${client.SecondName}`
                            }))}
                        />
                    </View>
                    <View style={[styles.blockInput, Platform.select({ios: {zIndex: 6}})]}>
                        <Text style={styles.label}>Исполнитель:</Text>
                        <AutocompleteDropdown
                            controller={controller => {
                                userController.current = controller
                            }}
                            textInputProps={
                                {
                                    style: {
                                        backgroundColor: "white", borderRadius: 999
                                    }
                                }}
                            inputContainerStyle={{
                                backgroundColor: '#FFF',
                                borderRadius: 999
                            }}
                            onClear={() => setSelectedUser(null)}
                            direction={"down"}
                            containerStyle={styles.select}
                            clearOnFocus={true}
                            closeOnBlur={false}
                            closeOnSubmit={false}
                            onSelectItem={(item) => item && setSelectedUser(users.find((user: User) => user.id === item.id))}
                            dataSet={users.map((user: User) => ({
                                id: user.id,
                                title: `${user.LastName} ${user.FirstName} ${user.SecondName}`
                            }))}
                        />
                    </View>
                    <View style={[styles.block, styles.blockButton]}>
                        <TouchableOpacity style={styles.button} onPress={order ? onEditPress : onAddPress}>
                            <Text style={styles.buttonText}>
                                {buttonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: "10%",
    },
    blockInput: {
        marginVertical: 10
    },
    blockButton: {
        alignItems: "center",
        marginBottom: "10%"
    },
    page: {
        flex: 1,
    },
    label: {
        fontSize: 14,
        marginLeft: 25,
        marginBottom: 5
    },
    input: {
        borderWidth: 1,
        borderRadius: 50,
        padding: 10,
        alignItems: "center",
        backgroundColor: "#FFF",
        fontSize: 14
    },
    select: {
        borderWidth: 1,
        borderRadius: 50,
        alignItems: "center",
        backgroundColor: "#FFF",
        fontSize: 14,
        padding: 1,
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
