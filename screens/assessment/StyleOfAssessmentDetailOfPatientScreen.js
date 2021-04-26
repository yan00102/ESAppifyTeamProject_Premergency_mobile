/**
 *
 * StyleOfAssessmentDetailOfPatientScreen.js
 * Jongsu An
 * Neal Yan
 * March 12, 2021
 *
 * This is a react native component of the style for the assessment detail of patient screen
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
    width: 50,
    height: 40,
  },
  naviBackBtnStyle: {},
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
  medicationsContainer: {
    width: "100%",
    marginTop: 40,
    marginBottom: 20,
  },
  subTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  label: {
    fontSize: 17,
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
  startAssessmentContainer: {
    width: "100%",
    marginTop: 40,
    marginBottom: 20,
  },

  assessmentHistoryContainer: {
    width: "100%",
    marginTop: 40,
    marginBottom: 20,
  },

  medicationItemContainer: {
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#0B4F8C",
    height: 40,
    marginBottom: 15,
    justifyContent: "center",
    //alignItems: "center",
  },

  medicationItemStyle: {
    marginLeft: 13,
  },

  cardOuterContainer: {
    height: 60,
    borderRadius: 20,
    marginBottom: 20,
    //Shadows for iOS only
    shadowColor: "#000000",
    shadowOffset: { width: 3, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    //Shadows for Android only
    elevation: 8,
  },
  cardOuterLinearContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    borderRadius: 20,
  },
  cardInnerContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 60,
    width: "98%",
    borderRadius: 20,
  },
  iconContainerInCard: {
    width: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  textsContainerInCard: {
    justifyContent: "center",
  },
  completedAssessmentContainer: {
    marginTop: 10,
    width: "100%",
  },
  headerStyleTitleContainer: {
    position: "absolute",
    top: 70,
    marginLeft: 70,
    marginRight: 70,
    width: WIDTH - 70 - 70,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    //Shadows for iOS only
    shadowColor: "#000000",
    shadowOffset: { width: 3, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    //Shadows for Android only
    elevation: 8,
  },
  headerStyleTitle: {
    fontSize: 20,
    color: "black",
  },
});

export { styles };
