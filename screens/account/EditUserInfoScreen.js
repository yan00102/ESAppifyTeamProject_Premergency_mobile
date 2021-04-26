/**
 *
 * EditUserInfoScreen.js
 * Jongsu An
 * March 14, 2021
 *
 * This is a react native component of the 'edit information of the user logged in screen
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
} from "react-native";
import { ActivityIndicator } from "react-native";
import { AuthContext } from "../../helpers/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./StyleOfEditUserInfoScreen";
import { firebase } from "../../helpers/firebase/config";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { USERSFIRESOTRE } from "../../helpers/namesOfCollectionOfFirestore";
import { Ionicons } from "@expo/vector-icons";

export default function EditUserInfoScreen({ navigation, route }) {
  const { userLoggedIn } = useContext(AuthContext);

  //To declare a state to set the visiblity of spinner
  const [isVisibleSpiner, setIsVisibleSpiner] = useState(false);

  //To get information of user logged in
  const [userInfo, setUserInfo] = useState({
    uid: userLoggedIn.uid,
    badgeNumber: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  //Whenever the component is focused, the logic runs once
  useFocusEffect(
    useCallback(() => {
      setUserInfo(route.params.data.userInfo);
      return () => {};
    }, [route.params.data.userInfo])
  );

  //To store values that user inputs into the states
  const handleOnChangeText = ({ key, text }) => {
    let tmpUserInfo = { ...userInfo };
    tmpUserInfo[key] = text;
    setUserInfo(tmpUserInfo);
  };

  //To store the values that user inputs into firestore
  const onClickedSaveBtn = async () => {
    setIsVisibleSpiner(true);
    await firebase
      .firestore()
      .collection(USERSFIRESOTRE)
      .doc(userInfo.uid)
      .update({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        badgeNumber: userInfo.badgeNumber,
        phone: userInfo.phone,
        updatedAt: firebase.firestore.Timestamp.fromDate(new Date()).toDate(),
        updatedBy: userInfo.uid,
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

  //To render the content on the screen
  const render = () => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.label}>First Name</Text>
        <TextInput
          name="firstName"
          style={styles.textInputStyle}
          onChangeText={(text) =>
            handleOnChangeText({ key: "firstName", text })
          }
          value={userInfo.firstName}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Last Name</Text>
        <TextInput
          name="lastName"
          style={styles.textInputStyle}
          onChangeText={(text) => handleOnChangeText({ key: "lastName", text })}
          value={userInfo.lastName}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Badge Number</Text>
        <TextInput
          name="badgeNumber"
          style={styles.textInputStyle}
          onChangeText={(text) =>
            handleOnChangeText({ key: "badgeNumber", text })
          }
          value={userInfo.badgeNumber}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Phone</Text>
        <TextInput
          name="phone"
          style={styles.textInputStyle}
          onChangeText={(text) => handleOnChangeText({ key: "phone", text })}
          value={userInfo.phone}
          autoCapitalize="none"
        />
      </View>
    );
  };

  //To move the previous screen when user clicks the back button
  const onClickedBackBtn = () => {
    navigation.goBack();
  };

  //To render the layout on the screen and call the 'render' function to render the content
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
          <Text style={styles.navigationBarTextStyle}>Edit User Info</Text>
        </LinearGradient>
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.safeAreaForBody}>
            <View style={styles.editUserInfoContainer}>{render()}</View>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.saveButton}
              onPress={onClickedSaveBtn}
            >
              <Text style={styles.SaveButtonTitle}>Save</Text>
            </TouchableOpacity>
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
