/**
 *
 * StyleOfRecentModules.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component of the style for the Recent Modules
 *
 */

import { StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  recentModulesContainer: {
    flex: 1,
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
