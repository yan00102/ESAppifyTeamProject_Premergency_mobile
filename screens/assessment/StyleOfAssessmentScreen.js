/**
 *
 * StyleOfAssessmentScreen.js
 * Neal Yan
 * Jongsu An
 * Feb 28, 2021
 *
 * This is a react native component of the style for the assessment screen
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
  iOS_searchBarContainer: {
    marginTop: 40,
  },
  android_searchBarContainer: {
    marginTop: 30,
  },
  navigationBarTextStyle: {
    color: "white",
    fontSize: 22,
    paddingTop: 10,
    paddingLeft: 15,
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
  label: {
    fontSize: 17,
    marginBottom: 13,
  },
  separator: {
    height: 15,
  },
  currentAssessmentContainer: {
    width: "100%",
    marginBottom: 15,
  },
  upcomingAppointmentContainer: {
    width: "100%",
    marginBottom: 15,
  },
  cardOuterContainer: {
    height: 70,
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
    height: 70,
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
});

export { styles };
