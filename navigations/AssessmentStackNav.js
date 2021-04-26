/**
 *
 * AssessmentStackNav.js
 * Jongsu An
 * Feb 14, 2021
 *
 * This is a react native component to manage a stack of the assessment screen
 *
 */

import React from "react";
import FocusedStatusBar from "../commonComponents/FocusedStatusBar";
import { createStackNavigator } from "@react-navigation/stack";
import AssessmentScreen from "../screens/assessment/AssessmentScreen";
import AssessmentDetailOfPatientScreen from "../screens/assessment/AssessmentDetailOfPatientScreen";
import AssessmentMedicationScreen from "../screens/assessment/AssessmentMedicationScreen";
import AssessmentModuleListScreen from "../screens/assessment/AssessmentModuleListScreen";

AssessmentDetailOfPatientScreen;
const Stack = createStackNavigator();

export default function AssessmentStackNav() {
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
          name="Assessment"
          component={AssessmentScreen}
          options={{ title: "Assessment" }}
        />
        <Stack.Screen
          name="AssessmentDetailOfPatient"
          component={AssessmentDetailOfPatientScreen}
          options={({ route }) => ({ title: route.params.title })}
        />
        <Stack.Screen
          name="AssessmentMedication"
          component={AssessmentMedicationScreen}
          options={{ title: "Medication" }}
        />
        <Stack.Screen
          name="AssessmentModuleList"
          component={AssessmentModuleListScreen}
          options={{ title: "Modules" }}
        />
      </Stack.Navigator>
    </>
  );
}
