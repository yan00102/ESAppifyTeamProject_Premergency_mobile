/**
 *
 * StyleOfAccountScreen.js
 * Neal Yan
 * Jongsu An
 * Feb 21, 2021
 *
 * This is a react native component of the style for the account screen
 *
 */

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F9F9F9",
  },
  linearGradientStyle: {
    width: "100%",
    height: 170,
  },
  navigationBarTextStyle: {
    color: "white",
    fontSize: 22,
    paddingTop: 70,
    paddingLeft: 20,
    fontWeight: "bold",
  },
  scrollViewStyle: {
    backgroundColor: "#F9F9F9",
    height: "100%",
    top: 130,
    borderTopLeftRadius: 20,
    width: "100%",
    position: "absolute",
  },
  safeAreaForBody: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 17,
  },
  separator: {
    height: 30,
  },
  headerTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },

  editBtnContainer: {
    marginTop: 7,
    width: "100%",
    alignItems: "flex-end",
  },

  editBtnSubContainer: {
    flexDirection: "row",
    marginRight: 20,
  },

  editBtnText: {
    marginRight: 3,
    color: "#0B4F8C",
  },

  userInformationContainer: {
    borderRadius: 10,
    padding: 15,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    backgroundColor: "#FFFFFF",
    //Shadows for iOS only
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    //Shadows for Android only
    elevation: 5,
  },

  subTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },

  content: {
    color: "black",
    fontSize: 15,
    marginBottom: 10,
  },

  btnText: {
    color: "white",
  },

  verifyEmailBtn: {
    height: 40,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
    backgroundColor: "#0B4F8C",
    //Shadows for iOS only
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    //Shadows for Android only
    elevation: 3,
  },

  changePasswordBtn: {
    height: 40,
    marginTop: 5,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
    width: 300,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 10,
    backgroundColor: "#0B4F8C",
    //Shadows for iOS only
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: { width: 1, height: 1 },
    //Shadows for Android only
    elevation: 3,
  },

  logOutBtn: {
    height: 40,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
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
});

export { styles };
