import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {MainStackNavigator} from "./stacks/main_stack_navigator";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="Main" component={MainStackNavigator} />
            {/*<Tab.Screen name="Settings" component={SettingsScreen} />*/}
        </Tab.Navigator>
    );
}
