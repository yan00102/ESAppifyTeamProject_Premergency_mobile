/**
 *
 * HomeScreen.js
 * Neal Yan
 * March 24, 2021
 *
 * This is a react native component of the home screen
 *
 */

import React, { useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./StyleOfHomeScreen";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  //Whenever the component is focused, the logic runs once
  useFocusEffect(
    useCallback(() => {
      return () => {};
    }, [])
  );

  //When user clicks top icon1, the screen will move to "ComingSoonScreen"
  const onClickedIcon1 = () => {
    //navigation.replace("TapStack", { screen: "AssessmentStack" });
    navigation.navigate("ComingSoonScreen", {
      dummyData1: "dummy1",
      dummyData2: "dummy2",
    });
  };

  //When user clicks top icon2 and top icon3, the screen will move to "ComingSoonScreen"
  const onClickedIcon2AndIcon3 = () => {
    navigation.navigate("ComingSoonScreen", {
      dummyData1: "dummy1",
      dummyData2: "dummy2",
    });
  };

  //To render top Icons
  const renderTopIcons = () => {
    return (
      <View style={styles.IconInnerContainer}>
        <TouchableOpacity
          style={styles.touchableOpacityIcon1}
          onPress={onClickedIcon1}
        >
          <MaterialIcons name="insert-chart" size={40} color={"#ffffff"} />
          <Text
            style={{
              fontSize: 12,
              color: "#ffffff",
              marginTop: 5,
              fontWeight: "bold",
            }}
          >
            Assessments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacityIcon2}
          onPress={onClickedIcon2AndIcon3}
        >
          <MaterialIcons name="view-module" size={44} color="#ffffff" />
          <Text
            style={{
              fontSize: 12,
              color: "#ffffff",
              marginTop: 5,
              fontWeight: "bold",
            }}
          >
            Modules
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.touchableOpacityIcon3}
          onPress={onClickedIcon2AndIcon3}
        >
          <Ionicons name="newspaper" size={38} color="#ffffff" />
          <Text
            style={{
              fontSize: 12,
              color: "#ffffff",
              marginTop: 8,
              fontWeight: "bold",
            }}
          >
            News
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  //To render the discover section
  const renderDiscover = () => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardOne}>
          <View
            style={{
              flex: 2,
              width: "100%",
              position: "relative",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              overflow: "hidden",
            }}
          >
            <Image
              style={{
                flex: 1,
                width: "100%",
                height: 410,
                top: -200,
                position: "absolute",
              }}
              source={require("../../src/assests/images/shot.jpeg")}
            />
          </View>

          <View
            style={{
              height: 110,
              justifyContent: "center",
              backgroundColor: "#0B66B9",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
            }}
          >
            <Text style={styles.headerInCard}>
              Booking a Covid-19 Vaccination
            </Text>
            <Text style={styles.descriptionInCard}>
              Ontario’s vaccine booking system is now available
            </Text>
          </View>
        </View>
        <View style={styles.cardTwo}>
          <Image
            source={require("../../src/assests/images/self_assessment.jpeg")}
            style={{
              width: "100%",
              flex: 1,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          />
          <View
            style={{
              height: 110,
              justifyContent: "center",
              backgroundColor: "#0B66B9",
              borderBottomLeftRadius: 15,
              borderBottomRightRadius: 15,
              opacity: 0.95,
            }}
          >
            <Text style={styles.headerInCard}>
              Thinking you may have Covid?
            </Text>
            <Text style={styles.descriptionInCard}>
              Taking a self-assessment online now
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const handleViewAllButton = () => {
    navigation.navigate("DiscoverScreen");
  };

  //To render the layout of the homescreen and call the fucntions rendering the content
  return (
    <>
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        edges={["right", "left", "bottom"]}
      >
        <LinearGradient
          style={styles.outerBackground}
          colors={["#0B4F8C", "#0B66B9"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        ></LinearGradient>
        <LinearGradient
          style={
            Platform.OS === "ios"
              ? styles.outerlinearGradientStyleForIOS
              : styles.outerlinearGradientStyle
          }
          colors={["#0B4F8C", "#0B66B9"]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.navigationBarTextStyle}>CP CME</Text>
        </LinearGradient>
        <View
          style={{
            position: "absolute",
            width: "95%",
            top: 140,
            left: 10,
            shadowColor: "#000",
            shadowOffset: { width: 3, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            //Shadows for Android only
            // elevation: 1,
          }}
        >
          <FontAwesome
            name="search"
            size={22}
            color="#000"
            style={{
              position: "absolute",
              zIndex: 1,
              top: 14,
              left: 20,
            }}
          />
          <TextInput
            placeholder="Search By keyword"
            autoCapitalize="none"
            style={{
              backgroundColor: "#fff",
              height: 50,
              fontSize: 14,
              paddingLeft: 40,
              color: "#000",
              borderRadius: 30,
              marginRight: 10,
              marginLeft: 10,
            }}
          />
        </View>
        <View style={styles.navigationBarInnerColor}></View>
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.safeAreaForBody}>
            <View style={styles.topIconsContainer}>{renderTopIcons()}</View>
            <View style={styles.discoverContainer}>
              <View style={styles.discoverLabelandBtn}>
                <Text style={styles.label}>Discover</Text>
                <TouchableOpacity
                  onPress={handleViewAllButton}
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      marginRight: 5,
                    }}
                  >
                    View All
                  </Text>
                  <AntDesign name="right" size={18} color="black" />
                </TouchableOpacity>
              </View>

              {renderDiscover()}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
