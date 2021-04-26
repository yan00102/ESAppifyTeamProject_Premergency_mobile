/**
 *
 * HomeStackNav.js
 * Jongsu An
 * Feb 14, 2021
 *
 * This is a react native component to manage a stack of the home screen
 *
 */

import React from "react";
import FocusedStatusBar from "../commonComponents/FocusedStatusBar";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/HomeScreen";
import ComingSoonScreen from "../screens/home/ComingSoonScreen";
import DiscoverScreen from "../screens/home/DiscoverScreen";

const Stack = createStackNavigator();

export default function HomeStackNav() {
  return (
    <>
      <FocusedStatusBar style="light" />
      {/* <FocusedStatusBar barStyle={"light-content"} /> */}
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="ComingSoonScreen"
          component={ComingSoonScreen}
          options={{ title: "" }}
        />
        <Stack.Screen
          name="DiscoverScreen"
          component={DiscoverScreen}
          options={{ title: "" }}
        />
      </Stack.Navigator>
    </>
  );
}
