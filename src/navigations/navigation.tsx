import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ClientsStackNavigator, MainStackNavigator, ServicesStackNavigator} from './stacks';
import HomeIcon from '../assets/home';
import ClientIcon from '../assets/clients';
import ServicesIcon from '../assets/services';
import {TabNames} from './screens';
import {useAppDispatch} from "../redux/hooks";
import {useEffect} from "react";
import {setClients, setServices, setUsers} from "../redux/store";
import {useAPI} from "../api";

const Tab = createBottomTabNavigator();

const getIconColor = ({focused}: { focused: boolean }) => {
    return focused ? '#333333' : '#BDBDBD';
};
export const TabNavigator = () => {
    const {getClients, getServices, getUsers} = useAPI()
    const dispatch = useAppDispatch()

    useEffect(()=>{
        getClients().then(r=>dispatch(setClients(r)))
        getServices().then(r=>dispatch(setServices(r)))
        getUsers().then(r=>dispatch(setUsers(r)))
    })

    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen
                name={TabNames.Main}
                component={MainStackNavigator}
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
