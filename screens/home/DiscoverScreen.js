import React, { useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./StyleOfComingSoonScreen";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function DiscoverScreen({ navigation }) {
  //Whenever the component is focused, the logic runs once
  useFocusEffect(
    useCallback(() => {
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  //If user clicks the back button, the previous screen displays
  const onClickedBackBtn = () => {
    navigation.goBack();
  };

  //To render the coming soon page
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
          <TouchableOpacity
            activeOpacity={1}
            style={styles.naviBackBtnContainerStyle}
            onPress={onClickedBackBtn}
          >
            <Ionicons
              style={styles.naviBackBtnStyle}
              name="ios-chevron-back"
              size={28}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.navigationBarTextStyle}>Coming Soon</Text>
        </LinearGradient>
        <View style={styles.navigationBarInnerColor}></View>
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.safeAreaForBody}>
            <Text>This is the coming soon page</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
