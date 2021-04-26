/**
 *
 * StyleOfModalForModuleContent.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component of the style for Modal For ModuleContent screen
 *
 */

import { StyleSheet, Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 25,
  },
  modal: {
    width: WIDTH - 20,
    height: HEIGHT / 1.65,
  },
  linearGradientStyle: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    height: 170,
    borderRadius: 25,
  },
  naviBackBtnContainerStyle: {
    marginTop: 20,
    marginLeft: 10,
    width: 30,
    height: 40,
  },
  naviBackBtnStyle: {},
  navigationBarTextStyle: {
    color: "white",
    fontSize: 22,
    paddingTop: 18,
    paddingLeft: 0,
    fontWeight: "bold",
  },
  scrollViewStyle: {
    backgroundColor: "#ffffff",
    height: "100%",
    top: 70,
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    width: "100%",
    position: "absolute",
  },
  safeAreaForBody: {
    paddingTop: 30,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
  subTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  iconAreaForSubTitle: { flexDirection: "row", marginTop: 3 },
  listModulesContainer: {
    width: "100%",
    marginTop: 40,
    marginBottom: 20,
  },
  separator: {
    height: 30,
  },
  separator: {
    height: 10,
  },
  submitButtonContainer: {
    flexGrow: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 30,
  },
  touchableOpacityStyleForSubmitButton: {
    backgroundColor: "#D14545",
    height: 40,
    width: 100,
    marginRight: 20,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  linearGradientStyleForSubmitButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  submitButtonTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    padding: 10,
  },
});

export { styles };
