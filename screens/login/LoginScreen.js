/**
 *
 * LoginScreen.js
 * Neal Yan
 * Feb 21, 2021
 *
 * This is a react native component of the login screen
 *
 */

import React, { useState } from "react";
import {
  View,
  Text,
  Alert,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";
import { ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./StyleOfLoginScreen";
import { firebase } from "../../helpers/firebase/config";
import { USERSFIRESOTRE } from "../../helpers/namesOfCollectionOfFirestore";
import { LinearGradient } from "expo-linear-gradient";
import { basicInfo, covertTimeStamp } from "../../helpers/utils";
import { Card } from "react-native-shadow-cards";
import { StatusBar } from "expo-status-bar";

export default function LoginScreen({ navigation }) {
  //To get information of user logged in

  //To initialize value that user inputs
  const [state, setState] = useState({
    email: "",
    password: "",
    error: "",
    isLoading: false,
    uid: "",
  });

  const [emailInputIsActive, setEmailInputIsActive] = useState(false);
  const [passwordInputIsActive, setPasswordInputIsActive] = useState(false);

  //To declare a state to switch 'loginScreen' and 'forgotPasswordScreen'
  const [mode, setMode] = useState({
    loginScreen: true,
    forgotPasswordScreen: false,
  });

  const [stateInForgotPassword, setStateInForgotPassword] = useState({
    email: "",
  });

  //To capture the email of user inputs
  const handleInputEmail = (text) => {
    // setEmailInputIsActive(true);
    setState({ ...state, email: text });
  };

  //To capture the password of user inputs
  const handleInputPassword = (text) => {
    setState({ ...state, password: text });
  };

  //To declare a state to set the visiblity of spinner
  const [isVisibleSpiner, setIsVisibleSpiner] = useState(false);

  const handleInputEmailInForgotPassword = (text) => {
    setStateInForgotPassword({ email: text });
  };

  //User's Login process is below
  //Step 1: the email and password of user is checked by using firebase.auth(),signInWithEmailAndPassword
  //Step 2: If step1 is passed, the value of disable property of 'users' collection of firestore is checked.
  //        The value of disable property is false and today is equal or later than 'since' property, user succeds in loggin.
  //        And then the routing to the home screen is conducted forcelly
  //If step2 is failed, user will be log out forcelly
  const handleLoginButton = async () => {
    if (!state.password && !state.email) {
      Alert.alert("email and password are required!");
    } else if (!state.password) {
      Alert.alert("password is required!");
    } else if (!state.email) {
      Alert.alert("email is required!");
    } else {
      setIsVisibleSpiner(true);
      await firebase
        .auth()
        .signInWithEmailAndPassword(state.email, state.password)
        .then((userCredential) => {
          let theUser = userCredential.user;
          if (theUser) {
            firebase
              .firestore()
              .collection(USERSFIRESOTRE)
              .doc(theUser.uid)
              .get()
              .then((userFromDB) => {
                const {
                  momentOfStartToday,
                  momentOfStartSince,
                } = covertTimeStamp({
                  now: new Date(),
                  since: userFromDB.data().since,
                });
                if (
                  userFromDB.data().disable === false &&
                  momentOfStartToday >= momentOfStartSince
                ) {
                  setIsVisibleSpiner(false);
                  navigation.navigate(`TapStack`, { status: "first log in" });
                } else {
                  setIsVisibleSpiner(false);
                  Alert.alert(`${theUser.email} is invalid account`);
                  firebase.auth().signOut();
                }
              });
          } else {
            setIsVisibleSpiner(false);
          }
        })
        .catch((err) => {
          setIsVisibleSpiner(false);
          Alert.alert("Log in was failed!", err.message);
        });
    }
  };

  const showForgotPassword = () => {
    setMode({
      loginScreen: false,
      forgotPasswordScreen: true,
    });
  };

  const hideForgotPassword = () => {
    setStateInForgotPassword({
      email: "",
    });
    setMode({
      loginScreen: true,
      forgotPasswordScreen: false,
    });
  };

  const submit = async () => {
    if (stateInForgotPassword.email.length === 0) {
      Alert.alert("Please input email registered");
      return;
    }

    await firebase
      .auth()
      .sendPasswordResetEmail(stateInForgotPassword.email)
      .then(
        () => {
          Alert.alert("The link to reset password has been sent to the email.");
          hideForgotPassword();
        },
        (error) => {
          Alert.alert(error.message);
        }
      );
  };

  const renderer = () => {
    const customStyleLoginContainer = () => {
      if (
        (emailInputIsActive && Platform.OS === "android") ||
        (passwordInputIsActive && Platform.OS === "android")
      ) {
        return styles.loginContainerAndroid;
      } else if (
        (emailInputIsActive && Platform.OS === "ios") ||
        (passwordInputIsActive && Platform.OS === "ios")
      ) {
        return styles.loginContainerIOS;
      } else {
        return styles.loginContainer;
      }
    };
    let content = <></>;
    if (mode.loginScreen) {
      content = (
        <View style={customStyleLoginContainer()}>
          {/* Subtitle */}
          <Text style={styles.textStyle}>Login</Text>

          {/* email input */}
          <TextInput
            style={styles.email}
            placeholder="Email"
            value={state.email}
            onChangeText={(text) => handleInputEmail(text)}
            onFocus={() => {
              setEmailInputIsActive(true);
            }}
            autoCapitalize="none"
          />

          {/* password input */}
          <TextInput
            style={styles.password}
            placeholder="Password"
            value={state.password}
            onChangeText={(text) => handleInputPassword(text)}
            onFocus={() => {
              setPasswordInputIsActive(true);
            }}
            secureTextEntry={true}
            autoCapitalize="none"
          />

          {/* Log In button */}

          <TouchableOpacity onPress={handleLoginButton} style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={showForgotPassword}
            style={styles.forgotPassword}
          >
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (mode.forgotPasswordScreen) {
      content = (
        <View style={styles.forgotPasswordContainer}>
          <Text style={styles.guideText}>
            Please input the email registered.
          </Text>
          <Text style={styles.guideDetailText}>
            The link for resetting password will be sent to the email registered
          </Text>
          {/* email input */}
          <TextInput
            style={styles.email}
            placeholder="Email"
            value={stateInForgotPassword.email}
            onChangeText={(text) => handleInputEmailInForgotPassword(text)}
            autoCapitalize="none"
          />

          <View style={styles.btnsConstainer}>
            <Card style={styles.cancelBtnShadowStyle}>
              <TouchableOpacity
                onPress={hideForgotPassword}
                style={styles.cancelBtn}
              >
                <Text style={styles.cancleBtnText}>Cancel</Text>
              </TouchableOpacity>
            </Card>

            <TouchableOpacity onPress={submit} style={styles.submitBtn}>
              <Text style={styles.submitBtnText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return content;
  };

  return (
    <>
      <StatusBar style="dark" />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          // dismiss the keyboard when users click anywhere;
          setEmailInputIsActive(false);
          setPasswordInputIsActive(false);
        }}
      >
        <SafeAreaView style={styles.safeAreaViewContainer}>
          <LinearGradient
            colors={["#1A213C", "#053577"]}
            start={[0, 0.6]}
            end={[1, 0]}
            style={{
              position: "absolute",
              height: basicInfo.windowHeight,
              width: basicInfo.windowWidth,
            }}
          ></LinearGradient>

          <View style={styles.shadowHeader}></View>

          <View style={styles.appName}></View>

          <View style={styles.logoContainer}>
            <Image
              style={styles.logoImage}
              source={require("../../src/assests/images/logo.png")}
            />
          </View>

          {renderer()}
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
      </TouchableWithoutFeedback>
    </>
  );
}
