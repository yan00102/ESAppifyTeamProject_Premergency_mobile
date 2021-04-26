/**
 *
 * StyleOfComingSoonScreen.js
 * Neal Yan
 * April 5, 2021
 *
 * This is a react native component of style for the Coming Soon Screen
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
    zIndex: 2,
    flex: 1,
    flexDirection: "row",
  },
  outerlinearGradientStyleForIOS: {
    width: "100%",
    height: 170,
    position: "absolute",
    borderRadius: 40,
    zIndex: 2,
    flex: 1,
    flexDirection: "row",
  },

  navigationBarBtnAndText: {
    borderWidth: 1,
    borderColor: "red",
    flexDirection: "row",
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
});

export { styles };
