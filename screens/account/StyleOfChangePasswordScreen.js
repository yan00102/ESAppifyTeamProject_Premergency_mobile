/**
 *
 * StyleOfChangePasswordScreen.js
 * Jongsu An
 * March 14, 2021
 *
 * This is a react native component of the style for the change password Screen
 *
 */

import { StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F9F9F9",
  },
  linearGradientStyle: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 170,
  },
  naviBackBtnContainerStyle: {
    marginTop: 70,
    marginLeft: 20,
    width: 40,
    height: 40,
  },
  naviBackBtnStyle: {},
  navigationBarTextStyle: {
    color: "white",
    fontSize: 22,
    paddingTop: 71,
    paddingLeft: 0,
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
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
  subTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    height: 8,
  },
  cardContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  header: {
    fontSize: 17,
    width: "95%",
    marginRight: "auto",
    marginLeft: "auto",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 17,
    marginLeft: 7,
    color: "#1A213C",
  },
  textInputStyle: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#0B4F8C",
    height: 50,
    fontSize: 15,
    marginBottom: 20,
    borderRadius: 15,
    padding: 10,
  },
  editUserInfoContainer: {
    width: "100%",
    marginTop: 40,
    marginBottom: 20,
  },
  saveButtonContainer: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  saveButton: {
    height: 40,
    //marginTop: 10,
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
  SaveButtonTitle: {
    fontSize: 16,
    color: "white",
  },
});

export { styles };
