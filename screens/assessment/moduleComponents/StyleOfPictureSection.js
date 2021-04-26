/**
 *
 * StyleOfPictureSection.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component of the style for PictureSection
 *
 */

import { StyleSheet, Dimensions } from "react-native";
const WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  imageEncodedBase64: {
    flexGrow: 1,
    width: WIDTH / 1.5,
    height: WIDTH / 1.5,
    resizeMode: "contain",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: "auto",
    marginRight: "auto",
  },

  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: "bold",
  },
});

export { styles };
