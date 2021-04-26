/**
 *
 * StyleOfAssessmentModuleListScreen.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component of the style for the module list screen
 *
 */

import { StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

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
  listModulesContainer: {
    width: "100%",
    marginTop: 40,
    marginBottom: 20,
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
  textsContainerInCard: {
    justifyContent: "center",
  },
  mouleTitleStyle: {
    marginLeft: 10,
  },
  contentsContainerInModal: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    backgroundColor: "yellow",
    borderRadius: 25,
    width: WIDTH - 20,
    height: HEIGHT / 1.5,
  },
});

export { styles };
