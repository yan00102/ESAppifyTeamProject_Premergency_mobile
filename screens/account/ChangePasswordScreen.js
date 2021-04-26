/**
 *
 * ChangePasswordScreen.js
 * Jongsu An
 * March 14, 2021
 *
 * This is a react native component of the change password screen
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
import { AuthContext } from "../../helpers/context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./StyleOfChangePasswordScreen";
import { firebase } from "../../helpers/firebase/config";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function ChangePasswordScreen({ navigation, route }) {
  const { userLoggedIn } = useContext(AuthContext);

  //To get information of user logged in
  const [userInfo, setUserInfo] = useState({
    currentPassword: "",
    newPassword: "",
    confirmedNewPassword: "",
  });

  //Whenever the component is focused, the logic runs once
  useFocusEffect(
    useCallback(() => {
      setUserInfo({
        currentPassword: "",
        newPassword: "",
        confirmedNewPassword: "",
      });
      return () => {};
    }, [])
  );

  //To store values that user inputs into the states
  const handleOnChangeText = ({ key, text }) => {
    let tmpUserInfo = { ...userInfo };
    tmpUserInfo[key] = text;
    setUserInfo(tmpUserInfo);
  };

  //To change the password of user logged in when the password inputted is valid
  const onClickedSaveBtn = async () => {
    if (userInfo.currentPassword.length === 0) {
      Alert.alert("Please input current password");
      return;
    }

    if (userInfo.newPassword.length === 0) {
      Alert.alert("Please input new password");
      return;
    }

    if (userInfo.confirmedNewPassword.length === 0) {
      Alert.alert("Please input confirmed new password");
      return;
    }

    if (userInfo.newPassword !== userInfo.confirmedNewPassword) {
      Alert.alert("New password and confirmed password is not same");
      return;
    }

    const user = firebase.auth().currentUser;
    const cred = firebase.auth.EmailAuthProvider.credential(
      userLoggedIn.email,
      userInfo.currentPassword
    );
    await user
      .reauthenticateWithCredential(cred)
      .then(() => {
        user
          .updatePassword(userInfo.newPassword)
          .then(() => {
            Alert.alert("Password was changed. Please login again");
            firebase
              .auth()
              .signOut()
              .then((_) => {
                navigation.replace(`Login`);
              })
              .catch((error) => {});
          })
          .catch((error) => {
            Alert.alert(`${error.message}`);
          });
      })
      .catch((error) => {
        Alert.alert(`${error.message}`);
      });
  };

  //To render the content on the screen
  const render = () => {
    return (
      <View style={styles.cardContainer}>
        <Text style={styles.header}>
          If changing password is successful, {"\n"} it is necessary to login
          again
        </Text>
        <Text style={styles.label}>Current Password</Text>
        <TextInput
          name="currentPassword"
          style={styles.textInputStyle}
          onChangeText={(text) =>
            handleOnChangeText({ key: "currentPassword", text })
          }
          value={userInfo.currentPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Text style={styles.label}>New Password</Text>
        <TextInput
          name="newPassword"
          style={styles.textInputStyle}
          onChangeText={(text) =>
            handleOnChangeText({ key: "newPassword", text })
          }
          value={userInfo.newPassword}
          secureTextEntry={true}
          autoCapitalize="none"
        />
        <Text style={styles.label}>Confirmed New Password</Text>
        <TextInput
          name="confirmedNewPassword"
          style={styles.textInputStyle}
          onChangeText={(text) =>
            handleOnChangeText({ key: "confirmedNewPassword", text })
          }
          value={userInfo.confirmedNewPassword}
          secureTextEntry={true}
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
          <Text style={styles.navigationBarTextStyle}>Change Password</Text>
        </LinearGradient>
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.safeAreaForBody}>
            <View style={styles.editUserInfoContainer}>{render()}</View>
            <View style={styles.separator} />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.saveButton}
              onPress={onClickedSaveBtn}
            >
              <Text style={styles.SaveButtonTitle}>Save</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
