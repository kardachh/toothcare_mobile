import {NavigationContainer} from "@react-navigation/native";
import {TabNavigator} from "./src/navigations/navigation";
import React from "react";
import {store} from "./src/redux";
import {Provider} from "react-redux";
import {StatusBar} from "expo-status-bar";
import {ActionSheetProvider} from "@expo/react-native-action-sheet";

export default function App() {
    return (
        <ActionSheetProvider>
            <Provider store={store}>
                <StatusBar/>
                <NavigationContainer>
                    <TabNavigator/>
                </NavigationContainer>
            </Provider>
        </ActionSheetProvider>
    );
}
