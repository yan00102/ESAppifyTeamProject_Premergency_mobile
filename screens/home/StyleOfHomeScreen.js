/**
 *
 * StyleOfHomeScreen.js
 * Neal Yan
 * Mar 24, 2021
 *
 * This is a react native component of style for the home screen
 *
 */

import { StyleSheet, Dimensions } from "react-native";

const WINDOWWIDTH = Dimensions.get("window").width;
const WINDOWHEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F9F9F9",
  },
  outerBackground: {
    width: "100%",
    height: 80,
    position: "absolute",
  },
  outerlinearGradientStyle: {
    width: "100%",
    height: 170,
    position: "absolute",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  outerlinearGradientStyleForIOS: {
    width: "100%",
    height: 170,
    position: "absolute",
    borderRadius: 40,
  },

  navigationBarTextStyle: {
    color: "white",
    fontSize: 30,
    paddingTop: 70,
    paddingLeft: 20,
    fontWeight: "bold",
  },

  navigationBarInnerColor: {},

  scrollViewStyle: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    height: "100%",
    top: 130,
    borderTopLeftRadius: 20,
    width: "100%",
    position: "absolute",
    zIndex: -1,
  },

  safeAreaForBody: {
    paddingTop: 90,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40,
  },

  topIconsContainer: {},

  IconInnerContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  touchableOpacityIcon1: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: "#62D0B9",
    justifyContent: "center",
    alignItems: "center",
  },

  innerColorIcon1: {},

  touchableOpacityIcon2: {
    display: "flex",
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: "#AF76FC",
    justifyContent: "center",
    alignItems: "center",
  },

  touchableOpacityIcon3: {
    width: 100,
    height: 100,
    borderRadius: 30,
    backgroundColor: "#E3774F",
    justifyContent: "center",
    alignItems: "center",
  },

  discoverContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    marginTop: 20,
    height: "100%",
    paddingBottom: 100,
  },

  discoverLabelandBtn: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  cardContainer: {
    marginTop: 15,
  },

  cardOne: {
    flex: 1,
    height: 270,
    marginBottom: 20,
  },

  backgroundOne: {
    flex: 1,
    overflow: "hidden",
    justifyContent: "flex-end",
  },

  cardTwo: {
    flex: 1,
    justifyContent: "center",
    height: 270,
    borderRadius: 15,
    marginBottom: 20,
  },

  label: {
    fontSize: 25,
    fontWeight: "700",
    marginBottom: 10,
    width: "78%",
  },

  headerInCard: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
    marginTop: 5,
  },
  descriptionInCard: {
    marginLeft: 15,
    color: "#ffffff",
    marginTop: 10,
    fontSize: 14,
  },
});

export { styles };
