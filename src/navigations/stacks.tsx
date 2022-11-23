import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {OrdersScreen} from "../screens/OrdersScreen";
import {AuthScreen} from "../screens/AuthScreen";
import {ClientsScreen} from "../screens/ClientsScreen";
import {useAppSelector} from "../redux/hooks";
import {ClientsNames, MainNames, ServicesNames} from "./screens";
import {ServicesScreen} from "../screens/ServicesScreen";
import {CalendarScreen} from "../screens/CalendarScreen";
import {ClientEditScreen} from "../screens/ClientEditScreen";
import {OrdersEditScreen} from "../screens/OrdersEditScreen";
import {EmploymentScheduleScreen} from "../screens/EmploymentScheduleScreen";
import {ServicesEditScreen} from "../screens/ServicesEditScreen";
import {ClientOrdersScreen} from "../screens/ClientOrdersScreen";

const Stack = createNativeStackNavigator();

const getNavigatorOptions = (title: string, props?: any) =>
    () => ({
        headerTitleAllowFontScaling: true,
        headerTitle: title,
        headerBackTitle: ' ',
        headerTitleStyle: {fontSize: 20},
        headerTitleAlign: 'center',
        headerTintColor: 'black',
        headerShown: true,
        ...props,
    });


export const OrdersStackNavigator = () => {
    const {auth} = useAppSelector(state => state.slice)

    return (
        auth ?
            <Stack.Navigator>
                <Stack.Screen name={MainNames.Orders} component={OrdersScreen} options={getNavigatorOptions("Главная")}/>
                <Stack.Screen name={MainNames.Calendar} component={CalendarScreen} options={getNavigatorOptions("Выберите день")}/>
                <Stack.Screen name={MainNames.OrderEdit} component={OrdersEditScreen} options={getNavigatorOptions("Новая запись")}/>
                <Stack.Screen name={MainNames.EmploymentSchedule} component={EmploymentScheduleScreen} options={getNavigatorOptions("123",{orientation:"landscape"})}/>
            </Stack.Navigator>
            : <Stack.Navigator>
                <Stack.Screen name={MainNames.Auth} component={AuthScreen} options={getNavigatorOptions("Авторизация")}
                              initialParams={{navigationKey: MainNames.Orders}}/>
            </Stack.Navigator>
    );
}

export const ClientsStackNavigator = () => {
    const {auth} = useAppSelector(state => state.slice)

    return (
        auth ?
            <Stack.Navigator initialRouteName={ClientsNames.Clients}>
                <Stack.Screen name={ClientsNames.Clients} component={ClientsScreen}
                              options={getNavigatorOptions("Клиенты")}/>
                <Stack.Screen name={ClientsNames.ClientEdit} component={ClientEditScreen}
                              options={getNavigatorOptions("Новый клиент")}/>
                <Stack.Screen name={ClientsNames.ClientOrders} component={ClientOrdersScreen}
                              options={getNavigatorOptions("История клиента")}/>
            </Stack.Navigator>
            : <Stack.Navigator>
                <Stack.Screen name={ClientsNames.Auth} component={AuthScreen} options={getNavigatorOptions("Авторизация")}
                              initialParams={{navigationKey: ClientsNames.Clients}}/>
            </Stack.Navigator>
    );
}

export const ServicesStackNavigator = () => {
    const {auth} = useAppSelector(state => state.slice)

    return (
        auth ?
        <Stack.Navigator initialRouteName={ServicesNames.Services}>
            <Stack.Screen name={ServicesNames.Services} component={ServicesScreen} options={getNavigatorOptions("Услуги")}/>
            <Stack.Screen name={ServicesNames.ServicesEdit} component={ServicesEditScreen} options={getNavigatorOptions("Новая услуга")}/>
        </Stack.Navigator>
            :
            <Stack.Navigator>
                <Stack.Screen name={ServicesNames.Services} component={ServicesScreen} options={getNavigatorOptions("Услуги")}/>
            </Stack.Navigator>
    );
}



