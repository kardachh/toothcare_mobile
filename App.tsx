import {NavigationContainer} from "@react-navigation/native";
import {TabNavigator} from "./src/navigations/navigation";
import React, {useState} from "react";
import {store} from "./src/redux";
import {Provider} from "react-redux";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <TabNavigator />
            </NavigationContainer>
        </Provider>

    );
}
