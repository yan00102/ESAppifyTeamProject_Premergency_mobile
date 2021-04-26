/**
 *
 * StyleOfCheckboxInputElement.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component of the style for checkbox form Screen
 *
 */

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  checkBoxContainerForIOS: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    width: 35,
    height: 35,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  checkBoxContainerForAndroid: {},
});

export { styles };
