/**
 *
 * StyleOfAddPatientScreen.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component of the style for the add patient screen
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
    position: "absolute",
  },
  safeAreaForBody: {
    width: "100%",
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 17,
  },
  textInputForPatientIdStyle: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
  },
  separator: {
    height: 30,
  },
  chooseButton: {
    backgroundColor: "#0B4F8C",
    height: 40,
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  chooseButtonText: {
    color: "white",
  },
  addButtonContainer: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  touchableOpacityStyleForAddButton: {
    backgroundColor: "#D14545",
    height: 40,
    width: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  linearGradientStyleForAddButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  addButtonTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    padding: 10,
  },
});

export { styles };
