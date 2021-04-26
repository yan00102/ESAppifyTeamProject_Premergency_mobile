/**
 *
 * AddPatientStackNav.js
 * Jongsu An
 * Feb 14, 2021
 *
 * This is a react native component to manage a stack of the add patient screen
 *
 */

import React from "react";
import FocusedStatusBar from "../commonComponents/FocusedStatusBar";
import { createStackNavigator } from "@react-navigation/stack";
import AddPatientScreen from "../screens/addPatient/AddPatientScreen";

const Stack = createStackNavigator();

export default function AddPatientStackNav() {
  return (
    <>
      <FocusedStatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="AddPatient"
          component={AddPatientScreen}
          options={{ title: "Add Patient" }}
        />
      </Stack.Navigator>
    </>
  );
}
