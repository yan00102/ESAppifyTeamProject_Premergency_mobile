/**
 *
 * StyleOfCalculationSection.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component of the style for Calculation Section
 *
 */

import { StyleSheet, Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  subSection: {
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    backgroundColor: "#FFFFFF",
  },
  subSctionStyleForViewing: {
    borderRadius: 10,
    paddingLeft: 20,
    paddingBottom: 20,
    backgroundColor: "#FFFFFF",
  },
  moduleContainer: {
    backgroundColor: "#FFFFFF",
  },
});

export { styles };
