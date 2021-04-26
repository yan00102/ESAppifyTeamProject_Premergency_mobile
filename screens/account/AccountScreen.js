/**
 *
 * AccountScreen.js
 * Neal Yan
 * Jongsu An
 * Feb 21, 2021
 *
 * This is a react native component of the account screen
 *
 */

import React, { useContext, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { AuthContext } from "../../helpers/context/AuthContext";
import { styles } from "./StyleOfAccountScreen";
import { firebase } from "../../helpers/firebase/config";
import { useFocusEffect } from "@react-navigation/native";
import { USERSFIRESOTRE } from "../../helpers/namesOfCollectionOfFirestore";

export default function AccountScreen({ navigation }) {
  //To get information of user logged in by using firebase.auth
  const { userLoggedIn } = useContext(AuthContext);

  //To decalre state hodling uid, badgeNumber, firstName, lastName, and phone
  const [userInfo, setUserInfo] = useState({
    uid: "",
    badgeNumber: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  //Whenever the component is focused, the logic runs once
  useFocusEffect(
    useCallback(() => {
      //To retrieve information of user logged-in from firestore
      firebase
        .firestore()
        .collection(USERSFIRESOTRE)
        .doc(userLoggedIn.uid)
        .get()
        .then((userFromDB) => {
          setUserInfo({
            uid: userLoggedIn.uid,
            badgeNumber: userFromDB.data().badgeNumber,
            firstName: userFromDB.data().firstName,
            lastName: userFromDB.data().lastName,
            phone: userFromDB.data().phone,
          });
        });
      return () => {};
    }, [])
  );

  //To log out
  async function handleLogOutButton() {
    firebase
      .auth()
      .signOut()
      .then((_) => {
        Alert.alert("User was logged out!");
        navigation.replace(`Login`);
      })
      .catch((error) => {});
  }

  //If user clicks 'edit' button, the screen moves to 'edit' screen
  const handleEditButton = () => {
    navigation.navigate(`EditUserInfo`, {
      data: {
        userInfo: userInfo,
      },
    });
  };

  //To verify the email of user logged in by using firebase.auth()
  const handleVerifyEmailButton = () => {
    const user = firebase.auth().currentUser;
    user
      .sendEmailVerification()
      .then(() => {
        Alert.alert("The message for verification was sent to your email");
      })
      .catch((error) => {
        Alert.alert(`${error.message}`);
      });
  };

  //If user clicks 'change password' button, the screen moves to 'change password' screen
  const handleChangePasswordButton = () => {
    navigation.navigate(`ChangePassword`, {
      data: {
        dummy: "",
      },
    });
  };

  //To render information of user logged in
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
          <Text style={styles.navigationBarTextStyle}>My Account</Text>
        </LinearGradient>

        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.safeAreaForBody}>
            {userLoggedIn === null || userLoggedIn === undefined ? (
              <></>
            ) : (
              <View>
                <Text style={styles.headerTitle}>Hi!</Text>
                <Text style={styles.headerTitle}>{userLoggedIn.email}</Text>
                <View style={styles.editBtnContainer}>
                  <TouchableOpacity
                    style={styles.editBtnSubContainer}
                    onPress={handleEditButton}
                  >
                    <Text style={styles.editBtnText}>Edit</Text>
                    <AntDesign
                      style={styles.menuIcon}
                      name="form"
                      size={16}
                      color="#0B4F8C"
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <View style={styles.userInformationContainer}>
                    <Text style={styles.subTitle}>First Name</Text>
                    <Text style={styles.content}>{userInfo.firstName}</Text>
                    <Text style={styles.subTitle}>Second Name</Text>
                    <Text style={styles.content}>{userInfo.lastName}</Text>
                    <Text style={styles.subTitle}>Badge Number</Text>
                    <Text style={styles.content}>{userInfo.badgeNumber}</Text>
                    <Text style={styles.subTitle}>Phone</Text>
                    <Text style={styles.content}>{userInfo.phone}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.verifyEmailBtn}
                  onPress={handleVerifyEmailButton}
                >
                  <Text style={styles.btnText}>Verify Email</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.changePasswordBtn}
                  onPress={handleChangePasswordButton}
                >
                  <Text style={styles.btnText}>Change Password</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.logOutBtn}
                  onPress={handleLogOutButton}
                >
                  <Text style={styles.btnText}>Log Out</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
