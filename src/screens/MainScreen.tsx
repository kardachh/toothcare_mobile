import React, {useCallback, useEffect, useState} from "react";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useAPI} from "../api";
import {Order} from "../types";
import {RoundedBlock} from "../components/RoundedBlock";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {MainNames} from "../navigations/screens";
import {addDays, format, subDays} from "date-fns";
import {ru} from "date-fns/locale";
import Loader from "../components/Loader";
import {setAuth, setOrderNeedUpdate, setSelectedDate, setUser} from "../redux/store";
import {GlobalStyles} from "../GlobalStyles";
import LogoutIcon from "../assets/logout";
import ArrowIcon from "../assets/arrow";
import PlusIcon from "../assets/plus";
import {useActionSheet} from "@expo/react-native-action-sheet";

const getNumber = ({t}: { t: any }) => +t.toString().replace(/:/g, '');

export const MainScreen = ({navigation}: { navigation: any }) => {
    const {getOrder, getOrdersForDay, deleteDocFromDb} = useAPI();
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
    const { showActionSheetWithOptions } = useActionSheet();
    const {selectedDate, user, orderNeedUpdate} = useAppSelector(state => state.slice)
    const [orders, setOrders] = useState<any>(null)
    const dispatch = useAppDispatch();

    const getData = useCallback(()=>{
        setIsDataLoaded(false)
        getOrdersForDay(selectedDate).then(async orders_ids => {
            const queries: any = []
            orders_ids.forEach((order_id, index) => {
                queries.push(getOrder(order_id))
            })
            Promise.all(queries).then(value => setOrders(value.filter((order: any) => user.id === order.user).sort(({time: a}: any, {time: b}: any) => getNumber({t: a}) - getNumber({t: b})))).catch(e => {
                console.log(e)
            })
            dispatch(setOrderNeedUpdate(false))
        });
    },[selectedDate])

    useEffect(() => {
        orderNeedUpdate && getData()
    }, [selectedDate, user, orderNeedUpdate])

    useEffect(() => {
        orders ? setIsDataLoaded(true) : setIsDataLoaded(false)
    }, [orders])

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={() => {
                    dispatch(setAuth(false))
                    dispatch(setUser(null))
                    console.log('logout');
                }}>
                    <LogoutIcon/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => {
                    navigation.push(MainNames.OrderEdit)
                }}>
                    <PlusIcon/>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const onPressOrderItem = (order:Order) => {
        const options = ['Отменить', 'Изменить', 'Отмена'];
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = 2;

        showActionSheetWithOptions({
            options,
            cancelButtonIndex,
            destructiveButtonIndex
        }, async (selectedIndex) => {
            switch (selectedIndex) {
                case 1:
                    navigation.push(MainNames.OrderEdit, {order: order})
                    break;

                case destructiveButtonIndex:
                    deleteDocFromDb("orders", order.id!).then(()=>dispatch(setOrderNeedUpdate(true)))
                    break;

                case cancelButtonIndex:
                // Canceled
            }
        });
    }

    const renderOrderItem = useCallback(({item}: { item: Order }) => {
        return <RoundedBlock info={item} onPress={()=>onPressOrderItem(item)}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{fontSize: 20}}>
                    {`${item.time}`}
                </Text>
                <Text style={{fontSize: 18}}>
                    {`${item.client.LastName} ${item.client.FirstName.charAt(0)}. ${item.client.SecondName.charAt(0)}.`}
                </Text>
            </View>
            <View style={{marginTop: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <Text>
                    {item.service.name}
                </Text>
                <Text>
                    {item.client.phone}
                </Text>
            </View>
        </RoundedBlock>
    }, []);

    return (<View style={GlobalStyles.page}>
        <View
            style={styles.topBar}
        >
            <View style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                // marginRight: 20
            }}>
                <TouchableOpacity
                    style={styles.datePickerArrow}
                    onPress={() => {
                        dispatch(setSelectedDate(subDays(selectedDate, 1)))
                        dispatch(setOrderNeedUpdate(true))
                    }}
                >
                    <ArrowIcon/>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.datePicker}
                    onPress={() => navigation.navigate(MainNames.Calendar)}
                >
                    <Text style={styles.datePickerText}>
                        {format(selectedDate, "PP", {locale: ru})}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.datePickerArrow}
                    onPress={() => {
                        dispatch(setSelectedDate(addDays(selectedDate, 1)))
                        dispatch(setOrderNeedUpdate(true))
                    }}
                >
                    <ArrowIcon style={{transform: [{rotate: "180deg"}]}}/>
                </TouchableOpacity>
            </View>

            {/*<TouchableOpacity style={styles.calendarIconParent} onPress={()=>navigation.push(MainNames.EmploymentSchedule)}>*/}
            {/*    <CalendarIcon/>*/}
            {/*</TouchableOpacity>*/}
        </View>
        {orders && orders.length !== 0 ?
            <View style={{flex: 1}}>
                <Loader isDataLoaded={isDataLoaded}/>
                <FlatList data={orders} renderItem={renderOrderItem}/>
            </View>
            :
            isDataLoaded && <View style={styles.emptyPage}><Text>Нет записей</Text></View>}
    </View>);
};

const styles = StyleSheet.create({
    emptyPage: {
        flex: 1, justifyContent: "center", alignItems: "center"
    },
    topBar: {
        paddingHorizontal: "5%",
        marginVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    datePicker: {
        borderWidth: 1,
        borderRadius: 30,
        padding: 10,
        marginHorizontal: 20,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
    },
    datePickerArrow: {
        borderWidth: 1,
        borderRadius: 999,
        paddingVertical: 7,
        paddingHorizontal: 15
    },
    datePickerText: {
        fontSize: 18
    },
    datePickerTextArrow: {
        fontSize: 20
    },
    calendarIconParent: {
        padding: 5
    },
    calendarIcon: {
        height: 30, width: 30
    }
});
