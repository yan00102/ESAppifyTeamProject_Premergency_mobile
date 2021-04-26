/**
 *
 * StyleOfAssessmentMedicationScreen.js
 * Jongsu An
 * March 14, 2021
 *
 * This is a react native component of the style for the Assessment Medication Screen
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
  safeAreaForBodyForIOS: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 80,
  },
  safeAreaForBodyForAndroid: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 110,
  },
  subTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 17,
    marginLeft: 7,
    color: "#1A213C",
  },
  iconAreaForSubTitle: { flexDirection: "row", marginTop: 3 },
  menuTitle: {
    color: "#0B4F8C",
    fontSize: 15,
    marginRight: 3,
  },
  menuIcon: {
    marginRight: 3,
  },
  separator: {
    height: 30,
  },
  cardContainer: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteBtn: {
    width: 80,
    backgroundColor: "#0B66B9",
    height: 40,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  deleteBtnTitle: {
    fontSize: 14,
    color: "#FFFFFF",
    padding: 0,
  },
  textInputStyle: {
    width: "70%",
    borderWidth: 1,
    borderColor: "#0B4F8C",
    height: 70,
    fontSize: 15,
    marginBottom: 20,
    borderRadius: 15,
    padding: 10,
  },

  medicationInputAndBtns: {
    position: "relative",
  },

  medicationsEditContainer: {
    width: "100%",
    marginTop: 40,
    marginBottom: 20,
  },
  saveButtonContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
  },
  touchableOpacityStyleForSaveButton: {
    backgroundColor: "#D14545",
    height: 40,
    width: 100,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  linearGradientStyleForSaveButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  SaveButtonTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    padding: 10,
  },
});

export { styles };
