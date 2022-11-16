import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MainScreen} from "../screens/MainScreen";
import {AuthScreen} from "../screens/AuthScreen";
import {ClientsScreen} from "../screens/ClientsScreen";
import {useAppSelector} from "../redux/hooks";
import {ClientsNames, MainNames} from "./screens";
import {ServicesScreen} from "../screens/ServicesScreen";
import {CalendarScreen} from "../screens/CalendarScreen";
import {ClientEditScreen} from "../screens/ClientEditScreen";
import {OrderEditScreen} from "../screens/EditOrderScreen";
import {EmploymentScheduleScreen} from "../screens/EmploymentScheduleScreen";

const Stack = createNativeStackNavigator();

const getNavigatorOptions = (title: string, props?: any) =>
    () => ({
        headerTitleAllowFontScaling: true,
        headerTitle: title,
        headerBackTitle: ' ',
        headerTitleStyle: {fontSize: 20},
        headerTintColor: 'black',
        headerShown: true,
        ...props,
    });


export const MainStackNavigator = () => {
    const {auth} = useAppSelector(state => state.slice)

    return (
        auth ?
            <Stack.Navigator>
                <Stack.Screen name={MainNames.Main} component={MainScreen} options={getNavigatorOptions("Главная")}/>
                <Stack.Screen name={MainNames.Calendar} component={CalendarScreen} options={getNavigatorOptions("Выберите день")}/>
                <Stack.Screen name={MainNames.OrderEdit} component={OrderEditScreen} options={getNavigatorOptions("Новая запись")}/>
                <Stack.Screen name={MainNames.EmploymentSchedule} component={EmploymentScheduleScreen} options={getNavigatorOptions("123",{orientation:"landscape"})}/>
            </Stack.Navigator>
            : <Stack.Navigator>
                <Stack.Screen name={MainNames.Auth} component={AuthScreen} options={getNavigatorOptions("Авторизация")}
                              initialParams={{navigationKey: "MainScreen"}}/>
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
            </Stack.Navigator>
            : <Stack.Navigator>
                <Stack.Screen name={ClientsNames.Auth} component={AuthScreen} options={getNavigatorOptions("Авторизация")}
                              initialParams={{navigationKey: "ClientsScreen"}}/>
            </Stack.Navigator>
    );
}

export const ServicesStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={"ClientsScreen"}>
            <Stack.Screen name={ClientsNames.Auth} component={ServicesScreen} options={getNavigatorOptions("Услуги")}
                          initialParams={{navigationKey: "ClientsScreen"}}/>
        </Stack.Navigator>
    );
}


