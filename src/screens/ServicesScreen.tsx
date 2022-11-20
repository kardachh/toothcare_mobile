import {FlatList, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import SearchIcon from "../assets/search";
import {RoundedBlock} from "../components/RoundedBlock";
import {Service, UserTypes} from "../types";
import {useAPI} from "../api";
import Loader from "../components/Loader";
import {GlobalStyles} from "../GlobalStyles";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {LinearGradient} from "expo-linear-gradient";
import PlusIcon from "../assets/plus";
import {ServicesNames} from "../navigations/screens";
import {useActionSheet} from "@expo/react-native-action-sheet";

export const ServicesScreen = (props:any) => {
    const {services:servicesDB, user, auth} = useAppSelector(state => state.slice)
    const { showActionSheetWithOptions } = useActionSheet();
    const [searchText, setSearchText] = useState<string>('');
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
    const [services, setServices] = useState<Service[]>(servicesDB)
    const [filteredServices, setFilteredServices] = useState<Service[]>(services)
    const {getServices,deleteDocFromDb} = useAPI()
    const dispatch = useAppDispatch();

    const getData = () => {
        setIsDataLoaded(false)
        getServices().then(r => setServices(r))
    }

    useEffect(() => {
        !servicesDB && getData();
    }, [services])

    useEffect(() => {
        setIsDataLoaded(false)
        setFilteredServices(services)
        setIsDataLoaded(true)
    }, [services])

    useEffect(() => {
        onSearchPress()
    }, [searchText])

    const onSearchPress = () => {
        setFilteredServices(services.filter((service) => {
            return service.name.includes(searchText) || service.description.includes(searchText)
        }))
    }

    const onPressServiceItem = useCallback ((service:Service) => {
        // console.log(service)
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
                    props.navigation.push(ServicesNames.ServicesEdit, {service: service, onPress: getData})
                    break;

                case destructiveButtonIndex:
                    deleteDocFromDb("services", service.id!).then(()=>getData())
                    break;

                case cancelButtonIndex:
                // Canceled
            }
        });
    },[user, auth])

    const renderServiceItem = useCallback(({item}: { item: Service }) => {
        return <RoundedBlock onPress={() => user && user.type === UserTypes.admin && onPressServiceItem(item)}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text numberOfLines={1} style={{fontSize: 18,flex:2}}>
                    {item.name}
                </Text>
                <Text style={{fontSize: 18, flex:1, textAlign:"right"}}>{item.price} руб.</Text>
            </View>
            <View style={{marginTop: 10}}>
                <Text>
                    {item.description}
                </Text>
            </View>
        </RoundedBlock>
    }, [user, auth]);

    React.useLayoutEffect(() => {
        user && user.type === UserTypes.admin && props.navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    props.navigation.push(ServicesNames.ServicesEdit, {onPress: getData})
                }}>
                    <PlusIcon/>
                </TouchableOpacity>
            ),
        });
        (!user || user && user.type !== UserTypes.admin) && props.navigation.setOptions({
            headerRight: () => (<></>),
        });
    }, [props.navigation, user]);

    return <View style={GlobalStyles.page}>
        <Loader isDataLoaded={isDataLoaded}/>
        <View style={styles.search}>
            <TextInput
                style={styles.input}
                value={searchText}
                autoCapitalize='none'
                placeholder={"Поиск по услугам..."}
                onSubmitEditing={onSearchPress}
                onChangeText={setSearchText}
            />
            <TouchableOpacity onPress={onSearchPress}>
                <SearchIcon/>
            </TouchableOpacity>
        </View>
        <LinearGradient
            // Background Linear Gradient
            colors={['white', 'rgba(255,255,255,0.9)', 'rgba(255,255,255,0.5)']}
            style={styles.gradient}
        />
        <FlatList style={{paddingTop: 20}} data={filteredServices} renderItem={renderServiceItem}/>
    </View>
}

const styles = StyleSheet.create({
    page: {flex: 1},
    search: {
        marginBottom: 1,
        marginTop: 20,
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
    item: {},
    gradient: {
        height: 25,
        position: "absolute",
        top: Platform.OS === "ios" ? 74 : 80,
        left: 0,
        width: "100%",
        zIndex: 100
    }
})
