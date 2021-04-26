/**
 *
 * AssessmentMedicationScreen.js
 * Jongsu An
 * March 14, 2021
 *
 * This is a react native component of the Medication screen
 *
 */

import React, { useState, useCallback, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "../../helpers/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./StyleOfAssessmentMedicationScreen";
import { firebase } from "../../helpers/firebase/config";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MEDICATIONSFIRESTORE } from "../../helpers/namesOfCollectionOfFirestore";
import { useSelector } from "react-redux";
import { AntDesign, Ionicons } from "@expo/vector-icons";

export default function AssessmentMedicationScreen({ navigation, route }) {
  //To get information of user logged in
  const { userLoggedIn } = useContext(AuthContext);

  //To declare a state to set the visiblity of spinner
  const [isVisibleSpiner, setIsVisibleSpiner] = useState(false);

  //To declare an state to hold information of medciations
  const [medications, setMedications] = useState(
    route.params.data.medications.map((item) => {
      return item;
    })
  );

  //To get patientId that user clicked
  const patientId = useSelector((state) => state.reducerForPatientId.patientId);

  //Whenever the component is focused, the logic runs once
  useFocusEffect(
    useCallback(() => {
      return () => {};
    }, [])
  );

  //if user clicks the add button, an empty item of the state(the array for medications) is pushed
  const onClickedAddBtn = () => {
    const tmpMedications = [...medications];
    tmpMedications.push("");
    setMedications(tmpMedications);
  };

  //To store values that user inputs into the the state(the array for medications)
  const handleOnChangeText = (text, index) => {
    const tmpMedications = [...medications];
    tmpMedications[index] = text;
    setMedications(tmpMedications);
  };

  //If user clicks the delete button, the item that user clicked is poped in the state(the array for medications)
  const onClickedDeleteBtn = (index) => {
    const tmpMedications = [...medications];
    tmpMedications.splice(index, 1);
    setMedications(tmpMedications);
  };

  //If user clicks the save button, the medications is stored in firesotre
  const onClickedSaveBtn = async () => {
    setIsVisibleSpiner(true);
    await firebase
      .firestore()
      .collection(MEDICATIONSFIRESTORE)
      .doc(patientId)
      .set({
        patientId: patientId,
        createdBy: userLoggedIn.uid,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
        medications: medications,
      })
      .then((data) => {
        setIsVisibleSpiner(false);
        navigation.goBack();
      })
      .catch((error) => {
        setIsVisibleSpiner(false);
        Alert.alert(`${error.message}`);
      });
  };

  //To render the content
  const renderInputSectionForMedications = () => {
    let tmpMedications = null;
    if (medications.length === 0) {
      tmpMedications = <Text>There is no medication</Text>;
    } else {
      tmpMedications = medications.map((item, index) => {
        return (
          <View key={index} style={styles.cardContainer}>
            <TextInput
              name={index}
              style={styles.textInputStyle}
              onChangeText={(text) => handleOnChangeText(text, index)}
              value={item}
              autoCapitalize="none"
              multiline={true}
              numberOfLines={3}
            />
            <TouchableOpacity
              activeOpacity={1}
              style={styles.deleteBtn}
              onPress={() => onClickedDeleteBtn(index)}
            >
              <LinearGradient
                style={styles.linearGradientStyleForSaveButton}
                colors={["#0B66B9", "#1A213C"]}
                start={{ x: 0.7, y: 0.3 }}
                end={{ x: 0, y: 0.9 }}
              >
                <Text style={styles.deleteBtnTitle}>Delete</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        );
      });
    }
    return tmpMedications;
  };

  //If user clicks the back button, the previous screen displays
  const onClickedBackBtn = () => {
    navigation.goBack();
  };

  //To render the layout of the screen and call the function rendering the content
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
          <TouchableOpacity
            activeOpacity={1}
            style={styles.naviBackBtnContainerStyle}
            onPress={onClickedBackBtn}
          >
            <Ionicons
              style={styles.naviBackBtnStyle}
              name="ios-chevron-back"
              size={28}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.navigationBarTextStyle}>Medication</Text>
        </LinearGradient>

        <ScrollView style={styles.scrollViewStyle}>
          <View
            style={
              Platform.OS === "ios"
                ? styles.safeAreaForBodyForIOS
                : styles.safeAreaForBodyForAndroid
            }
          >
            <View style={styles.subTitleContainer}>
              <TouchableOpacity
                onPress={onClickedAddBtn}
                style={styles.iconAreaForSubTitle}
              >
                <Text style={styles.menuTitle}>Add</Text>
                <AntDesign
                  style={styles.menuIcon}
                  name="form"
                  size={16}
                  color="#0B4F8C"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.medicationsEditContainer}>
              {renderInputSectionForMedications()}
            </View>
            {/* <View style={styles.separator} /> */}
            <View style={styles.saveButtonContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.touchableOpacityStyleForSaveButton}
                onPress={onClickedSaveBtn}
              >
                <LinearGradient
                  style={styles.linearGradientStyleForSaveButton}
                  colors={["#CB6161", "#D14545"]}
                  start={{ x: 0.7, y: 0.3 }}
                  end={{ x: 0, y: 0.9 }}
                >
                  <Text style={styles.SaveButtonTitle}>Save</Text>
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
