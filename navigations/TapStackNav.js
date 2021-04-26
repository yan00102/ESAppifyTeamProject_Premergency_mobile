/**
 *
 * TapStackNav.js
 * Neal Yan
 * Jongsu An
 * Feb 14, 2021
 *
 * This is a react native component to manage a bottom tab navigation
 *
 */

import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AccountStackNav from "./AccountStackNav";
import AssessmentStackNav from "./AssessmentStackNav";
import AddPatientStackNav from "./AddPatientStackNav";
import HomeStackNav from "./HomeStackNav";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { Modal, StyleSheet, Text, Pressable, View } from "react-native";
import { basicInfo } from "../helpers/utils";
import { LinearGradient } from "expo-linear-gradient";

const Tab = createBottomTabNavigator();

//Each tab has each stack of each screen
export default function TapStackNav({ route }) {
  const [modalVisible, setModalVisible] = useState(true);
  const modalAndTabNavBar = () => {
    return (
      <>
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            zIndex: 0,
          }}
        >
          <Tab.Navigator
            tabBarOptions={{
              activeTintColor: "#053577",
              inactiveTintColor: "#A3A3A3",
              style: { backgroundColor: "#FFFFFF" },
              labelStyle: {
                fontSize: 13,
              },
            }}
          >
            <Tab.Screen
              name="HomeStack"
              component={HomeStackNav}
              options={{
                tabBarIcon: ({ focused, size, color }) => {
                  return (
                    <FontAwesome5
                      name={"home"}
                      size={24}
                      color={focused ? "#053577" : "#A3A3A3"}
                    />
                  );
                },
                tabBarLabel: "Home",
              }}
            />
            <Tab.Screen
              name="AssessmentStack"
              component={AssessmentStackNav}
              options={{
                tabBarIcon: ({ focused, size, color }) => {
                  return (
                    <MaterialIcons
                      name="insert-chart"
                      size={24}
                      color={focused ? "#053577" : "#A3A3A3"}
                    />
                  );
                },
                tabBarLabel: "Assessment",
              }}
            />
            <Tab.Screen
              name="AddPatientStackNav"
              component={AddPatientStackNav}
              options={{
                tabBarIcon: ({ focused, size, color }) => {
                  return (
                    <FontAwesome
                      name="user-plus"
                      size={24}
                      color={focused ? "#053577" : "#A3A3A3"}
                    />
                  );
                },
                tabBarLabel: "Add Patient",
              }}
            />
            <Tab.Screen
              name="AccountStack"
              component={AccountStackNav}
              options={{
                tabBarIcon: ({ focused, size, color }) => {
                  return (
                    <FontAwesome5
                      name={"user-alt"}
                      size={24}
                      color={focused ? "#053577" : "#A3A3A3"}
                    />
                  );
                },
                tabBarLabel: "My Account",
              }}
            />
          </Tab.Navigator>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <View style={styles.modalAndCircleView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>You're Logged In Now !</Text>
                <LinearGradient
                  colors={["#1A213C", "#053577", "#0b4f8c"]}
                  start={{ y: 1.0, x: 0.0 }}
                  end={{ y: 0.0, x: 1.0 }}
                  style={[styles.button, styles.buttonClose]}
                >
                  <Pressable onPress={() => setModalVisible(!modalVisible)}>
                    <Text style={styles.buttonCloseText}>Close</Text>
                  </Pressable>
                </LinearGradient>
              </View>
              <View style={styles.circleView}></View>
              <View style={styles.circleView2}>
                <AntDesign name="login" size={36} color="#053577" />
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  };

  if (route.params.status === "first log in") {
    return modalAndTabNavBar();
  } else {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: "#053577",
          inactiveTintColor: "#A3A3A3",
          style: { backgroundColor: "#FFFFFF" },
          labelStyle: {
            fontSize: 13,
          },
        }}
      >
        <Tab.Screen
          name="HomeStack"
          component={HomeStackNav}
          options={{
            tabBarIcon: ({ focused, size, color }) => {
              return (
                <FontAwesome5
                  name={"home"}
                  size={24}
                  color={focused ? "#053577" : "#A3A3A3"}
                />
              );
            },
            tabBarLabel: "Home",
          }}
        />
        <Tab.Screen
          name="AssessmentStack"
          component={AssessmentStackNav}
          options={{
            tabBarIcon: ({ focused, size, color }) => {
              return (
                <MaterialIcons
                  name="insert-chart"
                  size={24}
                  color={focused ? "#053577" : "#A3A3A3"}
                />
              );
            },
            tabBarLabel: "Assessment",
          }}
        />
        <Tab.Screen
          name="AddPatientStackNav"
          component={AddPatientStackNav}
          options={{
            tabBarIcon: ({ focused, size, color }) => {
              return (
                <FontAwesome
                  name="user-plus"
                  size={24}
                  color={focused ? "#053577" : "#A3A3A3"}
                />
              );
            },
            tabBarLabel: "Add Patient",
          }}
        />
        <Tab.Screen
          name="AccountStack"
          component={AccountStackNav}
          options={{
            tabBarIcon: ({ focused, size, color }) => {
              return (
                <FontAwesome5
                  name={"user-alt"}
                  size={24}
                  color={focused ? "#053577" : "#A3A3A3"}
                />
              );
            },
            tabBarLabel: "My Account",
          }}
        />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalAndCircleView: {
    zIndex: 2,
  },

  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    width: 210,
    height: 180,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },

  modalText: {
    marginTop: 30,
    paddingTop: 30,
    marginBottom: 20,
    textAlign: "center",
  },

  button: {
    width: 80,
    marginTop: 20,
    borderRadius: 14,
    padding: 8,
    elevation: 2,
  },

  buttonCloseText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  circleView: {
    position: "absolute",
    top: -(0.05 * basicInfo.windowHeight),
    left: (210 - 0.1 * basicInfo.windowHeight) / 2,
    height: 0.1 * basicInfo.windowHeight,
    width: 0.1 * basicInfo.windowHeight,
    backgroundColor: "#ffffff",
    borderRadius: 0.4 * basicInfo.windowHeight,
    elevation: 2,
    zIndex: 1,
  },

  circleView2: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: -0.045 * basicInfo.windowHeight,
    left: (210 - 0.09 * basicInfo.windowHeight) / 2,
    height: 0.09 * basicInfo.windowHeight,
    width: 0.09 * basicInfo.windowHeight,
    backgroundColor: "#ffffff",
    borderRadius: 0.1 * basicInfo.windowHeight,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 2,
  },
});
