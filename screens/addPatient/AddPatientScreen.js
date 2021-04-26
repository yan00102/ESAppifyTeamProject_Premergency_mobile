/**
 *
 * AddPatientScreen.js
 * Jongsu An
 * March 10, 2021
 *
 * This is a react native component of the add patient screen
 *
 */

import React, { useState, useContext, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
  Alert,
  Platform,
} from "react-native";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "../../helpers/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./StyleOfAddPatientScreen.js";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { firebase } from "../../helpers/firebase/config";
import { APPOINTMENTSFIRESTORE } from "../../helpers/namesOfCollectionOfFirestore";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setStatusBarNetworkActivityIndicatorVisible } from "expo-status-bar";

export default function AddPatientScreen({ navigation }) {
  const [patientId, setPatientId] = useState("");
  //Datepick below url is used
  //https://github.com/mmazzarolo/react-native-modal-datetime-picker
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
  const [chosenDateTime, setChosenDateTime] = useState(new Date());
  const [isChosenDate, setIsChosenDate] = useState(false);
  const [isChosenTime, setIsChosenTime] = useState(false);

  //To declare a state to set the visiblity of spinner
  const [isVisibleSpiner, setIsVisibleSpiner] = useState(false);

  //To get information of user logged in
  const { userLoggedIn } = useContext(AuthContext);

  //Whenever the component is focused, the logic runs once
  //To initialize the values of states
  useFocusEffect(
    useCallback(() => {
      setPatientId("");
      setDatePickerVisibility(false);
      setTimePickerVisibility(false);
      setChosenDateTime(new Date());
      setIsChosenDate(false);
      setIsChosenTime(false);

      return () => {};
    }, [])
  );

  function onInputedPatientId(text) {
    setPatientId(text);
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  //If user clicks the 'confirm' button for date, the datepicker disappears
  const confirmDatePicker = (dateTime) => {
    hideDatePicker();
    if (isChosenDate === false) setIsChosenDate(true);
    setChosenDateTime(dateTime);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  //If user clicks the 'confirm' button for time, the datepicker disappears
  const confirmTimePicker = (dateTime) => {
    hideTimePicker();
    if (isChosenTime === false) setIsChosenTime(true);
    setChosenDateTime(dateTime);
  };

  //To set string for ios and android.
  const covertTimeFormat = (time) => {
    const timeElements = time.toLocaleTimeString().split(":");
    const hour = timeElements[0];
    const miniute = timeElements[1];
    const flagForAMPM = timeElements[2].split(" ")[1];
    let infoString = "";
    if (Platform.OS === "ios") {
      let tmpHourForIOS = parseInt(hour);
      if (flagForAMPM == "PM") {
        if (tmpHourForIOS !== 12) {
          infoString = `${tmpHourForIOS + 12}:${miniute} ${flagForAMPM}`;
        } else {
          infoString = `${hour}:${miniute} ${flagForAMPM}`;
        }
      } else {
        if (tmpHourForIOS === 12) {
          infoString = `${tmpHourForIOS - 12}:${miniute} ${flagForAMPM}`;
        } else {
          infoString = `${hour}:${miniute} ${flagForAMPM}`;
        }
      }
    } else {
      let tmpHour = parseInt(hour);
      if (tmpHour >= 12) {
        infoString = `${tmpHour}:${miniute} PM`;
      } else {
        infoString = `${tmpHour}:${miniute} AM`;
      }
    }
    return infoString;
  };

  //To store values that user inputs into firestore when values that user inputs are valid
  const onClickedAddPatient = async () => {
    setIsVisibleSpiner(true);
    let networkStatus;
    await NetInfo.fetch().then((state) => {
      networkStatus = state.isConnected;
      console.log("networkStatusOfAddPatient:", networkStatus);
    });

    if (patientId === "") {
      Alert.alert("Please Input patientId");
      return;
    }
    if (isChosenDate === false) {
      Alert.alert("Please choose date");
      return;
    }
    if (isChosenTime === false) {
      Alert.alert("Please choose time");
      return;
    }
    if (networkStatus) {
      // if has network
      // setIsVisibleSpiner(true);

      // chosenDateTime =>  2021-04-11T22:18:12.944Z
      await firebase
        .firestore()
        .collection(APPOINTMENTSFIRESTORE)
        .add({
          patientId: patientId,
          dateOfAppointment: {
            seconds: new Date(chosenDateTime).getTime(), // unix milliseconds timestamp
          },
          createdBy: userLoggedIn.uid,
          createdAt: new Date().getTime(),
        })
        .then((data) => {
          setIsVisibleSpiner(false);
          Alert.alert("Successful");
          navigation.replace("TapStack", { screen: "AssessmentStack" });
        })
        .catch((error) => {
          setIsVisibleSpiner(false);
          Alert.alert("Error");
        });
      setIsVisibleSpiner(false);
    } else {
      // if no network
      addOfflineNewAppointments(patientId, chosenDateTime, userLoggedIn.uid);
      setIsVisibleSpiner(false);
    }
  };

  const addOfflineNewAppointments = async (patientId, chosenDateTime, uid) => {
    // console.log("addingggggggg now ???????");
    // In offlineMode, add one or multiple new appointments
    const newAppointmentObj = {
      // simulate a dateOfAppointment obj which has same data structure
      patientId: patientId,
      dateOfAppointment: {
        seconds: new Date(chosenDateTime).getTime(),
      },
      createdBy: uid,
      createdAt: new Date().getTime(),
    };
    const cachedAddNewAppointments = await AsyncStorage.getItem(
      "cachedAddNewAppointments"
    );
    const parsedAddNewAppointments = JSON.parse(cachedAddNewAppointments);
    parsedAddNewAppointments.push(newAppointmentObj);
    await AsyncStorage.setItem(
      "cachedAddNewAppointments",
      JSON.stringify(parsedAddNewAppointments)
    );

    if (
      //comparing "2021-04-10", to figure out is chosenTime a current day or upcoming day
      chosenDateTime.toString().substring(0, 10) ===
      new Date(Date.now()).toString().substring(0, 10)
    ) {
      console.log("current day appointment ->");
      const currentAppointments = await AsyncStorage.getItem(
        "cachedCurrentAppointments"
      );
      const parsedCurrentAppointments = JSON.parse(currentAppointments);
      console.log("currentAppointments ?????? ", parsedCurrentAppointments);
      parsedCurrentAppointments.push(newAppointmentObj);
      console.log("newCurrentAppointments => ", parsedCurrentAppointments);

      await AsyncStorage.setItem(
        "cachedCurrentAppointments",
        JSON.stringify(parsedCurrentAppointments)
      );
    } else {
      console.log("upcoming day appointment -> ");
      const upcomingAppointments = await AsyncStorage.getItem(
        "cachedUpcomingAppointments"
      );
      const parsedUpcomingAppointments = JSON.parse(upcomingAppointments);
      parsedUpcomingAppointments.push(newAppointmentObj);
      await AsyncStorage.setItem(
        "cachedUpcomingAppointments",
        JSON.stringify(parsedUpcomingAppointments)
      );
    }
    navigation.replace("TapStack", { screen: "AssessmentStack" });
  };

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);

  //To render the layout and content on the screen
  return (
    <>
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        edges={["right", "left", "bottom"]}
      >
        <LinearGradient
          style={styles.linearGradientStyle}
          colors={["#1366B1", "#1A213C"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0.7 }}
        >
          <Text style={styles.navigationBarTextStyle}>Add Patient</Text>
        </LinearGradient>
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.safeAreaForBody}>
            <View>
              <Text style={styles.label}>Enter Patient ID</Text>
              <TextInput
                style={styles.textInputForPatientIdStyle}
                onChangeText={onInputedPatientId}
                value={patientId}
                autoCapitalize="none"
              />
            </View>
            <View style={styles.separator} />
            <View>
              <Text style={styles.label}>Assessment Date and Time</Text>
              <View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.chooseButton}
                  onPress={showDatePicker}
                >
                  <Text style={styles.chooseButtonText}>Choose Date</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  date={chosenDateTime}
                  headerTextIOS="Choose Date"
                  onConfirm={confirmDatePicker}
                  onCancel={hideDatePicker}
                  is24Hour={true}
                  minimumDate={new Date()}
                  maximumDate={nextYear}
                />
              </View>
              <Text>
                Chosen Date:{" "}
                {isChosenDate ? chosenDateTime.toLocaleDateString() : ""}
              </Text>
              <View style={styles.separator} />
              <View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.chooseButton}
                  onPress={showTimePicker}
                >
                  <Text style={styles.chooseButtonText}>Choose Time</Text>
                </TouchableOpacity>

                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  date={chosenDateTime}
                  headerTextIOS="Choose Time"
                  onConfirm={confirmTimePicker}
                  onCancel={hideTimePicker}
                />
              </View>
              <Text>
                Chosen Time:{" "}
                {isChosenTime ? covertTimeFormat(chosenDateTime) : ""}
              </Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.touchableOpacityStyleForAddButton}
                onPress={onClickedAddPatient}
              >
                <LinearGradient
                  style={styles.linearGradientStyleForAddButton}
                  colors={["#CB6161", "#D14545"]}
                  start={{ x: 0.7, y: 0.3 }}
                  end={{ x: 0, y: 0.9 }}
                >
                  <Text style={styles.addButtonTitle}>Add</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {isVisibleSpiner && (
          <View
            style={{
              position: "absolute",
              top: 0,
              height: "100%",
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ActivityIndicator size="large" color="#103A9E" />
          </View>
        )}
      </SafeAreaView>
    </>
  );
}
