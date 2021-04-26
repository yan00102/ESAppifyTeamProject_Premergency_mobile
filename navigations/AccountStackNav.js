/**
 *
 * AccountStackNav.js
 * Jongsu An
 * Feb 14, 2021
 *
 * This is a react native component to manage a stack of the account screen
 *
 */

import React from "react";
import FocusedStatusBar from "../commonComponents/FocusedStatusBar";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/account/AccountScreen";
import EditUserInfoScreen from "../screens/account/EditUserInfoScreen";
import ChangePasswordScreen from "../screens/account/ChangePasswordScreen";

const Stack = createStackNavigator();

export default function AccountStackNav() {
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
          name="Account"
          component={AccountScreen}
          options={{ title: "My Account" }}
        />
        <Stack.Screen
          name="EditUserInfo"
          component={EditUserInfoScreen}
          options={{ title: "Edit Uesr Info" }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePasswordScreen}
          options={{ title: "Change Password" }}
        />
      </Stack.Navigator>
    </>
  );
}
