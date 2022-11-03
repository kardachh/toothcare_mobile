import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {MainScreen} from "../../screens/MainScreen";

const Stack = createNativeStackNavigator();

export const MainStackNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name={"MainScreen"} component={MainScreen}  />
    </Stack.Navigator>
)

