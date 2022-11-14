import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import {Client} from "../types";
import SearchIcon from "../assets/search";
import {RoundedBlock} from "../components/RoundedBlock";
import {useAPI} from "../api";
import Loader from "../components/Loader";
import {GlobalStyles} from "../GlobalStyles";
import UserAddIcon from "../assets/user-add";
import {ClientsNames} from "../navigations/screens";
import {useActionSheet} from "@expo/react-native-action-sheet";
import {useAppSelector} from "../redux/hooks";

export const ClientsScreen = ({navigation}: { navigation: any }) => {
    const clientsDB = useAppSelector(state => state.slice).clients
    const { showActionSheetWithOptions } = useActionSheet();
    const [searchText, setSearchText] = useState<string>('')
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
    const [clients, setClients] = useState<Client[]>(clientsDB)
    const [filteredClients, setFilteredClients] = useState<Client[]>(clients)
    const {getClients,deleteDocFromDb} = useAPI()

    const getData = () => {
        getClients().then(r => setClients(r))
    }

    useEffect(() => {
        !clientsDB && getData();
    }, [])

    useEffect(() => {
        setIsDataLoaded(false)
        setFilteredClients(clients)
        setIsDataLoaded(true)
    }, [clients])

    useEffect(() => {
        onSearchPress()
    }, [searchText])

    const onSearchPress = () =>
        setFilteredClients(clients.filter((client) => {
            return client.phone.includes(searchText) || client.LastName.includes(searchText) || client.FirstName.includes(searchText) || client.SecondName.includes(searchText)
        }))

    const onPressClientItem = (client:Client) => {
        console.log(client)
        const options = ['Удалить', 'Изменить', 'Отмена'];
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
            destructiveButtonIndex
        }, async (selectedIndex) => {
            switch (selectedIndex) {
                case 1:
                    navigation.push(ClientsNames.ClientEdit, {client: client, onPress: getData})
                    break;

                case destructiveButtonIndex:
                    deleteDocFromDb("clients", client.id!).then(()=>getData())
                    break;

                case cancelButtonIndex:
                // Canceled
            }
        });
    }

    const renderClientItem = useCallback(({item}: { item: Client }) =>
        <RoundedBlock info={item} onPress={()=>onPressClientItem(item)}>
            <View style={{flexDirection: "row"}}>
                <Text style={{fontSize: 18}}>
                    {`${item.LastName} ${item.FirstName} ${item.SecondName}`}
                </Text>
            </View>
            <View style={{marginTop: 10}}>
                <Text>
                    {item.phone}
                </Text>
            </View>
        </RoundedBlock>, []);

    // иконка справа
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    navigation.push(ClientsNames.ClientEdit, {onPress: getData})
                }}>
                    <UserAddIcon />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return <View style={GlobalStyles.page}>
        <Loader isDataLoaded={isDataLoaded}/>
        <View style={styles.search}>
            <TextInput
                style={styles.input}
                value={searchText}
                autoCapitalize='none'
                placeholder={"Поиск по клиентам..."}
                onSubmitEditing={onSearchPress}
                onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={onSearchPress}>
                <SearchIcon/>
            </TouchableOpacity>
        </View>
        <FlatList data={filteredClients} renderItem={renderClientItem}/>
    </View>
}

const styles = StyleSheet.create({
    page: {flex: 1},
    search: {
        marginVertical: 20,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: "gray",
        flexDirection: "row",
        alignItems: "center",
        paddingRight: 45,
        marginHorizontal: "5%"
    },
    input: {
        width: "100%",
        paddingHorizontal: 25,
        paddingVertical: 15,
        fontSize: 18
    },
    item: {}
})
