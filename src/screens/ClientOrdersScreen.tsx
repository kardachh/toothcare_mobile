import {FlatList, Text, View} from "react-native";
import {GlobalStyles} from "../GlobalStyles";
import Loader from "../components/Loader";
import React, {useCallback, useEffect, useState} from "react";
import {Client, Order, User} from "../types";
import {RoundedBlock} from "../components/RoundedBlock";
import {setOrderNeedUpdate} from "../redux/store";
import {useAPI} from "../api";
import {format, parse} from "date-fns";
import {useAppSelector} from "../redux/hooks";

const getNumber = ({t}: { t: any }) => +t.toString().replace(/:/g, '');

export const ClientOrdersScreen = (props:any) => {
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false)
    const [filteredOrders,setFilteredOrders] = useState<Order[]>([])
    const {getOrdersForClient, getOrder} = useAPI()
    const {users} = useAppSelector(state => state.slice)


    const client:Client = props.route.params.client

    const getData = useCallback(()=>{
        setIsDataLoaded(false)
        client && client.id && getOrdersForClient(client.id).then(async (orders_ids:string[]) => {
            const queries: any = []
            orders_ids.forEach((order_id) => {
                queries.push(getOrder(order_id))
            })
            Promise.all(queries).then(value => setFilteredOrders(value.sort(({time: a}: any, {time: b}: any) => getNumber({t: a}) - getNumber({t: b})))).catch(e => {
                console.log(e)
            })
        });
    },[])

    useEffect(()=>{
        getData()
    },[])

    useEffect(() => {
        filteredOrders ? setIsDataLoaded(true) : setIsDataLoaded(false)
    }, [filteredOrders])

    const renderOrderItem = useCallback(({item}: { item: Order }) => {
        const date = parse(`${item.date}-${item.time}`,"dd.MM.yyyy-HH:mm", new Date())
        const userInfo = users.find((user:User)=>user.id === item.user.toString())
        return <RoundedBlock info={item} onPress={()=> {}}>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{fontSize: 12}}>
                    {"Дата"}
                </Text>
                <Text style={{fontSize: 12}}>
                    {"Время"}
                </Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{fontSize: 18}}>
                    {`${format(date,"dd.MM.yyyy")}`}
                </Text>
                <Text style={{fontSize: 18}}>
                    {`${format(date,"HH:mm")}`}
                </Text>
            </View>
            <View style={{marginTop: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{fontSize:12}}>
                    {"Наименование услуги"}
                </Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{fontSize:18}}>
                    {item.service.name}
                </Text>
            </View>
            <View style={{marginTop: 10, flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{fontSize:12}}>
                    {"Исполнитель"}
                </Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{fontSize:18}}>
                    {`${userInfo.LastName} ${userInfo.FirstName} ${userInfo.SecondName}`}
                </Text>
            </View>
        </RoundedBlock>
    }, [client]);

    return <View style={GlobalStyles.page}>
        <Loader isDataLoaded={isDataLoaded}/>
        {filteredOrders && filteredOrders.length!==0 ? <FlatList data={filteredOrders} renderItem={renderOrderItem}/> :
            isDataLoaded && <View style={{justifyContent:"center", alignItems: "center", flex:1}}>
                <Text style={{fontSize: 20}}>Нет записей</Text>
            </View>}
    </View>
}