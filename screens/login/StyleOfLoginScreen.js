/**
 *
 * StyleOfLoginScreen.js
 * Neal Yan
 * Feb 21, 2021
 *
 * This is a react native component of the style for the login screen
 *
 */

import { StyleSheet } from "react-native";
import { basicInfo } from "../../helpers/utils";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    position: "relative",
  },

  appName: {
    position: "absolute",
    height: 0.86 * basicInfo.windowHeight,
    width: 0.86 * basicInfo.windowHeight,
    borderRadius: 0.43 * basicInfo.windowHeight,
    left: -0.32 * basicInfo.windowHeight,
    top: -0.55 * basicInfo.windowHeight,
    backgroundColor: "white",
    opacity: 0.8,
  },

  shadowHeader: {
    position: "absolute",
    top: -0.25 * basicInfo.windowHeight,
    left: -0.2 * basicInfo.windowHeight,
    height: 0.6 * basicInfo.windowHeight,
    width: 0.6 * basicInfo.windowHeight,
    borderRadius: 0.3 * basicInfo.windowHeight,
    backgroundColor: "#1A213C",
  },

  textStyle: {
    marginTop: 5,
    paddingBottom: 30,
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    fontWeight: "normal",
  },

  email: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    width: 300,
    borderWidth: 1,
    borderColor: "#b5b5b5",
    borderRadius: 10,
  },

  password: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 15,
    width: 300,
    borderWidth: 1,
    borderColor: "#b5b5b5",
    borderRadius: 10,
  },

  logoContainer: {
    position: "absolute",
    width: 340,
    height: 120,
  },

  logoImage: {
    marginTop: 60,
    marginLeft: 20,
    width: "70%",
    height: "70%",
    resizeMode: "contain",
  },

  loginContainer: {
    height: 0.55 * basicInfo.windowHeight,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 45,
  },

  loginContainerAndroid: {
    height: 0.55 * basicInfo.windowHeight,
    position: "absolute",
    bottom: -70,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 45,
  },

  loginContainerIOS: {
    height: 0.55 * basicInfo.windowHeight,
    position: "absolute",
    bottom: 190,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 45,
  },

  loginBtn: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
    backgroundColor: "#DA0000",
    //Shadows for iOS only
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    //Shadows for Android only
    elevation: 3,
  },

  loginBtnText: {
    color: "white",
  },

  forgotPassword: {
    margin: 20,
  },

  forgotPasswordText: {
    color: "black",
  },

  forgotPasswordContainer: {
    height: 0.55 * basicInfo.windowHeight,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 45,
  },

  guideText: {
    fontSize: 20,
  },

  guideDetailText: {
    marginTop: 10,
    width: 250,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 30,
  },

  btnsConstainer: {
    marginTop: 20,
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },

  cancelBtn: {
    width: 120,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  cancelBtnShadowStyle: {
    height: 40,
    marginTop: 6,
    marginBottom: 10,
    width: 120,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
    elevation: 3,
    backgroundColor: "white",
    opacity: 0.85,
  },

  cancleBtnText: {
    color: "black",
  },

  submitBtnText: {
    color: "white",
  },

  submitBtn: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    width: 120,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
    backgroundColor: "#DA0000",
    //Shadows for iOS only
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    //Shadows for Android only
    elevation: 3,
  },
});

export { styles };
