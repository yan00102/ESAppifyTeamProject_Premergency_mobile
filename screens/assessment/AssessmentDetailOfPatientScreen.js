/**
 *
 * AssessmentDetailOfPatientScreen.js
 * Neal Yan
 * Jongsu An
 * Feb 28, 2021
 *
 * This is a react native component of the Assessment Detail Of Patient Screen
 *
 */

import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./StyleOfAssessmentDetailOfPatientScreen";
import { firebase } from "../../helpers/firebase/config";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  RESULTOFASSESSMENTFIRESOTRE,
  MEDICATIONSFIRESTORE,
} from "../../helpers/namesOfCollectionOfFirestore";
import { useSelector } from "react-redux";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import AssessmentHistory from "./AssessmentHistory";
import RecentModules from "./RecentModules";
import { ActivityIndicator } from "react-native";

export default function AssessmentDetailOfPatientScreen({ navigation, route }) {
  //Below is how to pass data from the list screen to detail screen by using the route object
  //console.log("navigation: ", navigation);
  //console.log("route.params.data.patientId: ", route.params.data.patientId);

  const [medications, setMedications] = useState([]);
  const [listOfUsedTemplatedId, setListOfUsedTemplatedId] = useState({});
  const [historyAssessments, setHistoryAssessments] = useState([]);
  const patientId = useSelector((state) => state.reducerForPatientId.patientId);

  //To declare a state to set the visiblity of spinner
  const [isVisibleSpiner, setIsVisibleSpiner] = useState(false);

  //Whenever the component is focused, the logic runs once
  //To get data of medications and assessments from firestore
  useFocusEffect(
    useCallback(() => {
      setIsVisibleSpiner(true);
      const unsubscribeForMedications = firebase
        .firestore()
        .collection(MEDICATIONSFIRESTORE)
        .doc(patientId)
        .onSnapshot((snapshot) => {
          try {
            if (Array.isArray(snapshot.data().medications)) {
              setIsVisibleSpiner(false);
              setMedications(snapshot.data().medications);
            }
          } catch (error) {
            setIsVisibleSpiner(false);
          }
        });

      setIsVisibleSpiner(true);
      const unsubscribeForHistoryAssessments = firebase
        .firestore()
        .collection(RESULTOFASSESSMENTFIRESOTRE)
        .where("patientId", "==", patientId)
        .onSnapshot((querySnapshot) => {
          let tmpHistoryAssessments = [];
          let tmpListOfUsedTemplatedId = {};
          try {
            querySnapshot.forEach((doc) => {
              const tmp = doc.data();
              tmp.documentId = doc.id;
              tmpHistoryAssessments.push(tmp);
              if (
                tmpListOfUsedTemplatedId[doc.data().templateId] === undefined
              ) {
                tmpListOfUsedTemplatedId[doc.data().templateId] = 1;
              } else {
                tmpListOfUsedTemplatedId[doc.data().templateId] =
                  tmpListOfUsedTemplatedId[doc.data().templateId] + 1;
              }
            });
            setIsVisibleSpiner(false);
            setListOfUsedTemplatedId(tmpListOfUsedTemplatedId);
            setHistoryAssessments(tmpHistoryAssessments);
          } catch (error) {
            setIsVisibleSpiner(false);
          }
        });
      return () => {
        unsubscribeForMedications();
        unsubscribeForHistoryAssessments();
      };
    }, [setMedications, setHistoryAssessments])
  );

  //When user clicks the back button, the previous screen displays
  const onClickedBackBtn = () => {
    navigation.goBack();
  };

  //To render medications
  const renderMedications = () => {
    let tmpMedications = null;
    if (medications.length === 0) {
      tmpMedications = <Text>There is no medications</Text>;
    } else {
      tmpMedications = medications.map((item, index) => {
        return (
          <View key={index} style={styles.medicationItemContainer}>
            <Text style={styles.medicationItemStyle}>{item}</Text>
          </View>
        );
      });
    }
    return tmpMedications;
  };

  //If user clicks the edit button, the medication screen displays
  const onClickedMedicationEditBtn = () => {
    navigation.navigate(`AssessmentMedication`, {
      data: {
        medications: medications,
      },
    });
  };

  //If user click the Start Assessment button, the assessmentModuleList screen displays
  const onClickedStartAssessmentBtn = () => {
    navigation.navigate(`AssessmentModuleList`);
  };

  //To render the 'assessment detail of patient' screen
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
        </LinearGradient>
        <ScrollView style={styles.scrollViewStyle}>
          <View
            style={
              Platform.OS === "ios"
                ? styles.safeAreaForBodyForIOS
                : styles.safeAreaForBodyForAndroid
            }
          >
            <View style={styles.medicationsContainer}>
              <View style={styles.subTitleContainer}>
                <Text style={styles.label}>Medication</Text>
                <TouchableOpacity
                  onPress={onClickedMedicationEditBtn}
                  style={styles.iconAreaForSubTitle}
                >
                  <Text style={styles.menuTitle}>Edit</Text>
                  <AntDesign
                    style={styles.menuIcon}
                    name="form"
                    size={16}
                    color="#0B4F8C"
                  />
                </TouchableOpacity>
              </View>
              {renderMedications()}
            </View>
            <View style={styles.separator} />
            <View style={styles.startAssessmentContainer}>
              <View style={styles.subTitleContainer}>
                <Text style={styles.label}>Start Assessment</Text>
                <TouchableOpacity
                  onPress={onClickedStartAssessmentBtn}
                  style={styles.iconAreaForSubTitle}
                >
                  <Text style={styles.menuTitle}>Add Modules</Text>
                  <MaterialIcons
                    style={styles.menuIcon}
                    name="add-to-photos"
                    size={16}
                    color="#0B4F8C"
                  />
                </TouchableOpacity>
              </View>
              <RecentModules listOfUsedTemplatedId={listOfUsedTemplatedId} />
            </View>
            <View style={styles.separator} />
            <View style={styles.assessmentHistoryContainer}>
              <View style={styles.subTitleContainer}>
                <Text style={styles.label}>Assessment History</Text>
              </View>
              <AssessmentHistory historyAssessments={historyAssessments} />
            </View>
          </View>
          <View style={{ height: 100, marginBottom: 100 }} />
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
        <View style={styles.headerStyleTitleContainer}>
          <MaterialCommunityIcons
            name="account-circle"
            size={60}
            color="#0B4F8C"
          />
          <Text style={styles.headerStyleTitle}>{patientId}</Text>
        </View>
      </SafeAreaView>
    </>
  );
}
