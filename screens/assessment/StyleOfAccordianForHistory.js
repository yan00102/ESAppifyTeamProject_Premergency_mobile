/**
 *
 * StyleOfAccordianForHistory.js
 * Jongsu An
 * March 14, 2021
 *
 * This is a react native component of the style for the AccordianForHistory Screen
 *
 */

import { StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  AssessmentHistoryContainer: {
    flex: 1,
  },
  cardOuterContainer: {
    height: 60,
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 15,
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
  textsContainerInCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  upDownIcon: {
    marginRight: 20,
  },
  moduleTitleStyle: {
    marginLeft: 10,
  },
  moduleDetailContainer: {
    //Shadows for iOS only
    shadowColor: "#000000",
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    //Shadows for Android only
    elevation: 2,
  },
  linearGradientStyle: {
    flex: 1,
    width: "100%",
    borderRadius: 25,
  },
  datesContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 25,
    marginRight: 25,
  },
  assessmentDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  modifiedDateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navigationBarTextStyle: {
    color: "white",
    fontSize: 17,
  },
  moduleContentContiner: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 15,
  },
  editButtonContainer: {
    marginTop: 10,
    marginRight: 15,
    alignItems: "flex-end",
  },
  editButtonArea: {
    alignItems: "center",
    flexDirection: "row",
  },
  editTextStyle: {
    marginRight: 5,
  },
  separator: {
    height: 30,
  },
});

export { styles };
