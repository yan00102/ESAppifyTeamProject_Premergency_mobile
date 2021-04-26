import React from "react";
// import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./screens/login/LoginScreen";
import TapStackNav from "./navigations/TapStackNav";

import { AuthProvider } from "./helpers/context/AuthContext";
import { storeIsConnected } from "./helpers/reduxCollection/Actions";
import { useDispatch } from "react-redux";

import NetInfo from "@react-native-community/netinfo";

export default function Main() {
  const Stack = createStackNavigator();

  const dispatch = useDispatch();

  NetInfo.addEventListener((state) => {
    // console.log("Connection type", state.type);
    console.log("Is connected?", state.isConnected);
    dispatch(storeIsConnected(state.isConnected));
    // 1. call the function in action => storeIsConnected
    // 2. function will be executed
    // 3. dispatch will triger reducer.
  });

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="TapStack" component={TapStackNav} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
