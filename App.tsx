import {NavigationContainer} from "@react-navigation/native";
import * as config from "./settings.json"
import {TabNavigator} from "./src/navigations/navigation";

export default function App() {
    console.log(config.settings.url)
    return (
        <NavigationContainer>
            {/* СТРОКА СВЕРХУ ТЕЛЕФОНА (заряд, сеть, время) */}
            <TabNavigator />
        </NavigationContainer>
    );
}
