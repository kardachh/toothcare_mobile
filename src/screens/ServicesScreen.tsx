import {FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View} from "react-native";
import React, {useCallback, useEffect, useState} from "react";
import SearchIcon from "../assets/search";
import {RoundedBlock} from "../components/RoundedBlock";
import {Service} from "../types";
import {useAPI} from "../api";
import Loader from "../components/Loader";
import {GlobalStyles} from "../GlobalStyles";
import {useAppSelector} from "../redux/hooks";
import {LinearGradient} from "expo-linear-gradient";

export const ServicesScreen = () => {
    const servicesDB = useAppSelector(state => state.slice).services
    const [searchText, setSearchText] = useState<string>('');
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
    const [services, setServices] = useState<Service[]>(servicesDB)
    const [filteredServices, setFilteredServices] = useState<Service[]>(services)
    const {getServices} = useAPI()

    useEffect(() => {
        services && !servicesDB && getServices().then(r => setServices(r));
    }, [])

    useEffect(() => {
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

    const renderServiceItem = useCallback(({item}: { item: Service }) => {
        return <RoundedBlock onPress={() => {
        }}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{fontSize: 18}}>
                    {item.name}
                </Text>
                <Text style={{fontSize: 18}}>{item.price} руб.</Text>
            </View>
            <View style={{marginTop: 10}}>
                <Text>
                    {item.description}
                </Text>
            </View>
        </RoundedBlock>
    }, []);


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
        top: 74,
        left: 0,
        width: "100%",
        zIndex: 100
    }
})
