/**
 *
 * AssessmentScreen.js
 * Neal Yan
 * Jongsu An
 * Feb 28, 2021
 *
 * This is a react native component of the assessment screen
 *
 */

import React, { useState, useCallback, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "../../helpers/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./StyleOfAssessmentScreen";
import { firebase } from "../../helpers/firebase/config";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  APPOINTMENTSFIRESTORE,
  RESULTOFASSESSMENTFIRESOTRE,
} from "../../helpers/namesOfCollectionOfFirestore";
import { useDispatch } from "react-redux";
import { storePatientId } from "../../helpers/reduxCollection/Actions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  getUnixTimeOfStartOfToday,
  getUnixTimeOfStartOfTomorrow,
  extractHhMmFromDate,
  getUnixTimeOfEndOfToday,
  getExactTime,
} from "../../helpers/utils";
import { TextInput } from "react-native-gesture-handler";
import { FontAwesome } from "@expo/vector-icons";

import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AssessmentScreen({ navigation }) {
  const [currentAppointments, setCurrentAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [completedAssessments, setCompletedAssessments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  //To get information of user logged in
  const { userLoggedIn } = useContext(AuthContext);

  //To initialize dispatch of redux to store patient id globally
  const dispatch = useDispatch();

  //To declare a state to set the visiblity of spinner
  const [isVisibleSpiner, setIsVisibleSpiner] = useState(false);

  //Whenever the component is focused, the logic runs once
  useFocusEffect(
    useCallback(() => {
      getNetworkStatus();
      return () => {};
    }, [])
  );

  const getNetworkStatus = async () => {
    let networkStatus;
    await NetInfo.fetch().then((state) => {
      networkStatus = state.isConnected;
    });
    getAppointments(networkStatus);

    getResultOfAssessments(networkStatus);
  };

  const getAppointments = async (status) => {
    setIsVisibleSpiner(true);
    if (status) {
      // console.log("test getting appointments !!!!!", status);
      AddingCachedNewAppointments();
      let tmpCurrentAppointments;
      let tmpUpcomingAppointments;
      const unixTimeOfEndOfToday = getUnixTimeOfEndOfToday();
      // const secondsOfToday = unixTimeOfEndOfToday.seconds;
      await firebase
        .firestore()
        .collection(APPOINTMENTSFIRESTORE)
        .where("createdBy", "==", userLoggedIn.uid)
        // .where("dateOfAppointment", ">=", secondsOfToday)
        .get()
        .then((querySnapshot) => {
          tmpCurrentAppointments = [];
          tmpUpcomingAppointments = [];
          querySnapshot.forEach((doc) => {
            // console.log("All Cloud Appointments => ", doc.data());
            if (doc.data().dateOfAppointment.seconds <= unixTimeOfEndOfToday) {
              //It is current appointment
              tmpCurrentAppointments.push({
                id: doc.id,
                ...doc.data(),
                label: "current",
              });
              return tmpCurrentAppointments;
            } else {
              //It is upcoming appointment
              tmpUpcomingAppointments.push({
                id: doc.id,
                ...doc.data(),
                label: "upcoming",
              });
              return tmpUpcomingAppointments;
            }
          });
        })
        .catch((error) => {
          setIsVisibleSpiner(false);
        });

      await AsyncStorage.setItem(
        "cachedCurrentAppointments",
        JSON.stringify(tmpCurrentAppointments) // set an key for saving current appointments
      );

      await AsyncStorage.setItem(
        "cachedUpcomingAppointments",
        JSON.stringify(tmpUpcomingAppointments) // set an key for saving upcoming appointments
      );
      setCurrentAppointments(tmpCurrentAppointments);
      setUpcomingAppointments(tmpUpcomingAppointments);
      setIsVisibleSpiner(false);
    } else {
      // alert("isConnectedAppointments: ", status);
      getOfflineAppointments();
      setIsVisibleSpiner(false);
    }
  };

  const AddingCachedNewAppointments = async () => {
    try {
      const cachedNewAppointments = await AsyncStorage.getItem(
        "cachedAddNewAppointments"
      );
      const parsedNewAppointments = JSON.parse(cachedNewAppointments);
      // console.log("All cached newAppointments => ", parsedNewAppointments);
      if (parsedNewAppointments.length == 0) {
        return;
      } else {
        parsedNewAppointments.forEach((appointment) => {
          // console.log("each appointment is => ", appointment);
          firebase
            .firestore()
            .collection(APPOINTMENTSFIRESTORE)
            .add({
              patientId: appointment.patientId,
              dateOfAppointment: {
                seconds: appointment.dateOfAppointment.seconds,
              },
              createdBy: appointment.createdBy,
              createdAt: appointment.createdAt,
            })
            .then(() => {
              console.log("adding data to Cloud Firebase was done.");
            })
            .catch((error) => {
              console.log("Errors_whenAdding_newAppointmentsToFirebase", error);
            });
        });
        await AsyncStorage.setItem(
          "cachedAddNewAppointments",
          JSON.stringify([])
        );
      }
    } catch (error) {
      console.log("Errors_WhenAdding_CachedNewAppointments", error);
    }
  };

  const getOfflineAppointments = async () => {
    // In offlineMode, get cached appointments
    // console.log("gettinnnnnnnnng appointments");
    try {
      const cachedCurrentAppointments = await AsyncStorage.getItem(
        "cachedCurrentAppointments"
      );
      const parsedCurrentAppintments = JSON.parse(cachedCurrentAppointments);
      // console.log("parsedCurrentAppintments => ", parsedCurrentAppintments);
      const cachedUpcomingAppointments = await AsyncStorage.getItem(
        "cachedUpcomingAppointments"
      );
      const parsedUpcomingAppointments = JSON.parse(cachedUpcomingAppointments);
      // console.log("parsedUpcomingAppointments => ", parsedUpcomingAppointments);
      setCurrentAppointments(parsedCurrentAppintments);
      setUpcomingAppointments(parsedUpcomingAppointments);
    } catch (error) {
      alert("ErrorsWhenGettingOfflineAppointments: ", error);
    }
  };

  //To get 'assessment' from firestore's collection
  const getResultOfAssessments = async (status) => {
    setIsVisibleSpiner(true);
    // AddingCachedNewAssessments();
    if (status) {
      console.log("testing_offline assessments !!!!", status);
      const tmpArray = [];
      await firebase
        .firestore()
        .collection(RESULTOFASSESSMENTFIRESOTRE)
        .where("assessmentMetaData.createdBy", "==", userLoggedIn.uid)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const tmp = doc.data();
            // console.log("tmpData => ", tmp);
            tmpArray.push({
              id: doc.id,
              patientId: tmp.patientId,
              createdAt: tmp.assessmentMetaData.createdAt,
              label: "completed",
            });
          });
        })
        .catch((error) => {
          console.log("Errors_whenGettingResultOfAssessments: ", error);
          setIsVisibleSpiner(false);
        });

      await AsyncStorage.setItem(
        "cachedCompletedAssessments",
        JSON.stringify(tmpArray) // set an key for saving completed assessments
      );

      // await AsyncStorage.setItem(
      //   "cachedCompletedAssessments",
      //   JSON.stringify([]) // clear key "cachedCompletedAssessments"
      // );

      setIsVisibleSpiner(false);
      setCompletedAssessments(tmpArray);
    } else {
      // If no network
      getOfflineCompletedAssessments();
      setIsVisibleSpiner(false);
    }
  };

  // const AddingCachedNewAssessments = async () => {
  //   try{
  //   }catch(error){
  //     console.log("Errors_whenAdding_newAssessmentsToFirebase", error)
  //   }
  // };

  const getOfflineCompletedAssessments = async () => {
    console.log("getting offline completed assessmentssssss");
    try {
      const cachedCompletedAssessments = await AsyncStorage.getItem(
        "cachedCompletedAssessments"
      );
      const parsedCompletedAssessments = JSON.parse(cachedCompletedAssessments);
      console.log("parsedCompletedAssessments => ", parsedCompletedAssessments);
      setCompletedAssessments(parsedCompletedAssessments);
    } catch (error) {
      console.log("ErrorsWhenGettingOfflineAssessments", error);
    }
  };

  const moveToAssessmentDetailOfPatient = (patientId) => {
    dispatch(storePatientId(patientId));
    navigation.navigate(`AssessmentDetailOfPatient`, {
      title: patientId,
      data: {
        patientId: patientId,
        dummyData: "dummy",
      },
    });
  };

  const renderCurrentAppointment = () => {
    let tmpAppointments;
    let results;
    if (searchQuery) {
      const foundData = currentAppointments.filter((appointment) =>
        appointment.patientId.includes(searchQuery)
      );

      if (foundData.length === 0) {
        return <Text>No Results.</Text>;
      } else {
        results = foundData;
      }
    } else {
      if (currentAppointments.length === 0) {
        return <Text>There is no current appointment</Text>;
      } else {
        results = currentAppointments;
      }
    }

    tmpAppointments = results.map((appointment, index) => {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          // key={appointment.id}
          key={index}
          onPress={() => moveToAssessmentDetailOfPatient(appointment.patientId)}
          style={styles.cardOuterContainer}
        >
          <LinearGradient
            style={styles.cardOuterLinearContainer}
            colors={["#0B4F8C", "#2682D6", "#0B66B9"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            <View style={styles.cardInnerContainer}>
              <View style={styles.iconContainerInCard}>
                <MaterialCommunityIcons
                  name="account-circle"
                  size={50}
                  color="#0B4F8C"
                />
              </View>
              <View style={styles.textsContainerInCard}>
                <Text>{appointment.patientId} </Text>
                <Text style={{ color: "#0B4F8C" }}>
                  {new Date(appointment.dateOfAppointment.seconds)
                    .toLocaleTimeString("en-US")
                    .toString()
                    .substring(0, 5) +
                    getExactTime(appointment.dateOfAppointment.seconds)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      );
    });
    return tmpAppointments;
  };

  const renderUpcomingAppointment = () => {
    let tmpAppointments;
    let results;
    if (searchQuery) {
      const foundData = upcomingAppointments.filter((appointment) =>
        appointment.patientId.includes(searchQuery)
      );
      if (foundData.length === 0) {
        return <Text>No Results.</Text>;
      } else {
        results = foundData;
      }
    } else {
      if (upcomingAppointments.length === 0) {
        return <Text>There is no upcoming appointments.</Text>;
      } else {
        results = upcomingAppointments;
      }
    }
    tmpAppointments = results.map((appointment, index) => {
      return (
        <TouchableOpacity
          // key={appointment.id} //it may have multiple same appointment id(patient id) in the same day
          key={index}
          onPress={() => moveToAssessmentDetailOfPatient(appointment.patientId)}
          style={styles.cardOuterContainer}
          activeOpacity={0.8}
        >
          <LinearGradient
            style={styles.cardOuterLinearContainer}
            colors={["#0B4F8C", "#2682D6", "#0B66B9"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            <View style={styles.cardInnerContainer}>
              <View style={styles.iconContainerInCard}>
                <MaterialCommunityIcons
                  name="account-circle"
                  size={50}
                  color="#0B4F8C"
                />
              </View>
              <View style={styles.textsContainerInCard}>
                <Text>{appointment.patientId} </Text>
                <Text style={{ color: "#0B4F8C" }}>
                  {new Date(appointment.dateOfAppointment.seconds)
                    .toLocaleString("en-US", { hour12: false })
                    .substring(11, 16) +
                    getExactTime(appointment.dateOfAppointment.seconds) +
                    " " +
                    new Date(appointment.dateOfAppointment.seconds)
                      .toLocaleString("en-US", { hour12: false })
                      .substring(0, 11)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      );
    });
    return tmpAppointments;
  };

  const renderCompletedAssessments = () => {
    let tmpAssessments;
    let results;
    if (searchQuery) {
      const foundData = completedAssessments.filter((assessment) =>
        assessment.patientId.includes(searchQuery)
      );
      if (foundData.length === 0) {
        return <Text>No Results.</Text>;
      } else {
        results = foundData;
      }
    } else {
      if (completedAssessments.length === 0) {
        return <Text>There is no completed assessment.</Text>;
      } else {
        results = completedAssessments;
      }
    }
    tmpAssessments = results.map((assessment) => {
      console.log("each assessment is => ", assessment);
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.cardOuterContainer}
          key={assessment.id}
          onPress={() => moveToAssessmentDetailOfPatient(assessment.patientId)}
        >
          <LinearGradient
            style={styles.cardOuterLinearContainer}
            colors={["#0B4F8C", "#2682D6", "#0B66B9"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
          >
            <View style={styles.cardInnerContainer}>
              <View style={styles.iconContainerInCard}>
                <MaterialCommunityIcons
                  name="account-circle"
                  size={50}
                  color="#0B4F8C"
                />
              </View>
              <View style={styles.textsContainerInCard}>
                <Text>{assessment.patientId}</Text>
                <Text style={{ color: "#0B4F8C" }}>
                  {new Date(assessment.createdAt)
                    .toLocaleString("en-US", { hour12: false })
                    .substring(11, 16) +
                    getExactTime(assessment.createdAt) +
                    " " +
                    new Date(assessment.createdAt)
                      .toLocaleString("en-US", { hour12: false })
                      .substring(0, 11)}
                </Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      );
    });
    return tmpAssessments;
  };

  const handleSearch = (text) => {
    let texts = text.toLowerCase();
    setSearchQuery(texts);
  };

  return (
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
        <View
          style={
            Platform.OS === "ios"
              ? styles.iOS_searchBarContainer
              : styles.android_searchBarContainer
          }
        >
          <View>
            <FontAwesome
              name="search"
              size={22}
              color="#000"
              style={{ position: "absolute", zIndex: 1, top: 8, left: 15 }}
            />
            <TextInput
              placeholder="Search By Patient Id"
              onChangeText={handleSearch}
              autoCapitalize="none"
              style={{
                backgroundColor: "#fff",
                height: 40,
                fontSize: 14,
                paddingLeft: 40,
                color: "#000",
                borderRadius: 15,
                marginRight: 10,
                marginLeft: 10,
                opacity: 0.85,
              }}
            />
          </View>

          <Text style={styles.navigationBarTextStyle}>Assessment</Text>
        </View>
      </LinearGradient>

      <ScrollView style={styles.scrollViewStyle}>
        <View
          style={
            Platform.OS === "ios"
              ? styles.safeAreaForBodyForIOS
              : styles.safeAreaForBodyForAndroid
          }
        >
          <View style={styles.currentAssessmentContainer}>
            <Text style={styles.label}>Current Appointments</Text>
            {renderCurrentAppointment()}
          </View>
          <View style={styles.separator} />
          <View style={styles.upcomingAppointmentContainer}>
            <Text style={styles.label}>Upcoming Appointments</Text>
            {renderUpcomingAppointment()}
          </View>
          <View style={styles.completedAssessmentContainer}>
            <Text style={styles.label}>Completed Assessments</Text>
            {renderCompletedAssessments()}
          </View>
          <View style={styles.separator} />
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
  );
}
