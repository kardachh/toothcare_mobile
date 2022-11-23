import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ClientsStackNavigator, OrdersStackNavigator, ServicesStackNavigator} from './stacks';
import HomeIcon from '../assets/home';
import ClientIcon from '../assets/clients';
import ServicesIcon from '../assets/services';
import {TabNames} from './screens';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useEffect} from "react";
import {setClients, setServices, setUsers, setDelServices, setFilteredServices} from "../redux/store";
import {useAPI} from "../api";
import {Service} from "../types";

const Tab = createBottomTabNavigator();

const getIconColor = ({focused}: { focused: boolean }) => {
    return focused ? '#333333' : '#BDBDBD';
};
export const TabNavigator = () => {
    const {getClients, getServices, getUsers, getDelServices} = useAPI()
    const dispatch = useAppDispatch()
    const {services,delServices, filteredServices} = useAppSelector(state => state.slice)

    useEffect(()=>{
        getClients().then(r=>dispatch(setClients(r)))
        getUsers().then(r=>dispatch(setUsers(r)))
        getServices().then(r=>dispatch(setServices(r)))
        getDelServices().then(r=>dispatch(setDelServices(r)))
    },[])

    useEffect(()=>{
        if (services && delServices){
            dispatch(setFilteredServices(
                services.reduce((acc:Service[],item:Service)=>{
                    if (!delServices.includes(item.id)) acc.push(item)
                    return acc;
                },[])
            ))
        }
    },[services,delServices])

    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen
                name={TabNames.Orders}
                component={OrdersStackNavigator}
                options={{
                    title: 'Главная',
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({focused}) => (
                        <HomeIcon color={getIconColor({focused: focused})}/>
                    ),
                }}
            />
            <Tab.Screen
                name={TabNames.Clients}
                component={ClientsStackNavigator}
                options={{
                    title: 'Клиенты',
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({focused}) => (
                        <ClientIcon color={getIconColor({focused: focused})}/>
                    ),
                }}
            />
            <Tab.Screen
                name={TabNames.Services}
                component={ServicesStackNavigator}
                options={{
                    title: 'Услуги',
                    tabBarActiveTintColor: 'black',
                    tabBarIcon: ({focused}) => (
                        <ServicesIcon color={getIconColor({focused: focused})}/>
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
