/**
 *
 * App.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is the root component of react native
 *
 */

import React, { useEffect } from "react";
import Main from "./Main";

import { Provider as StateProvider } from "react-redux";
import store from "./helpers/reduxCollection/Store";

import { LogBox, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

LogBox.ignoreLogs(["Setting a timer"]);

//To render the root componet
export default function App() {
  useEffect(() => {
    getAsyncStorageKeys();
    // clearAsyncStorageKeys();
  }, []);

  // const clearAsyncStorageKeys = async () => {
  //   let keys = [
  //     "cachedCurrentAppointments",
  //     "cachedUpcomingAppointments",
  //     "cachedCompletedAssessments",
  //     "cachedAddNewAppointments",
  //   ];
  //   AsyncStorage.multiRemove(keys, (err) => {
  //     // keys k1 & k2 & k3 & k4 removed, if they existed
  //     // do most stuff after removal (if you want)
  //     console.log("multiRemoveErr => ", err);
  //   });
  // };

  const getAsyncStorageKeys = async () => {
    const cachedCurrentAppointments = await AsyncStorage.getItem(
      "cachedCurrentAppointments"
    );
    if (!cachedCurrentAppointments) {
      const initialValue = [];
      AsyncStorage.setItem(
        "cachedCurrentAppointments",
        JSON.stringify(initialValue)
      );
    }

    const cachedUpcomingAppointments = await AsyncStorage.getItem(
      "cachedUpcomingAppointments"
    );
    if (!cachedUpcomingAppointments) {
      const initialValue = [];
      AsyncStorage.setItem(
        "cachedUpcomingAppointments",
        JSON.stringify(initialValue)
      );
    }

    const cachedCompletedAssessments = await AsyncStorage.getItem(
      "cachedCompletedAssessments"
    );
    if (!cachedCompletedAssessments) {
      const initialValue = [];
      AsyncStorage.setItem(
        "cachedCompletedAssessments",
        JSON.stringify(initialValue)
      );
    }

    const cachedAddNewAppointments = await AsyncStorage.getItem(
      "cachedAddNewAppointments"
    );
    if (!cachedAddNewAppointments) {
      const initialValue = [];
      AsyncStorage.setItem(
        "cachedAddNewAppointments",
        JSON.stringify(initialValue)
      );
    }
  };

  return (
    <StateProvider store={store}>
      <StatusBar backgroundColor="#053577" barStyle={"light-content"} />
      <Main />
    </StateProvider>
  );
}
