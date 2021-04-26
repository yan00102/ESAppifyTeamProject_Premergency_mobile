/**
 *
 * AssessmentModuleListScreen.js
 * Jongsu An
 * March 15, 2021
 *
 * This is a react native component of the module list screen
 *
 */

import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  Platform,
} from "react-native";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./StyleOfAssessmentModuleListScreen.js";
import { firebase } from "../../helpers/firebase/config";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { MODULESFIRESTORE } from "../../helpers/namesOfCollectionOfFirestore";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";
import ModalForModuleContent from "./ModalForModuleContent";

const nameOfKeyOfListOfModulesInLocalStorage = "ListOfModules";

export default function AssessmentModuleListScreen({ navigation }) {
  const [moduleList, setModuleList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [module, setModule] = useState(null);

  //To declare a state to set the visiblity of spinner
  const [isVisibleSpiner, setIsVisibleSpiner] = useState(false);

  //Whenever the component is focused, the logic runs once
  //To get the title of assessment.
  useFocusEffect(
    useCallback(() => {
      getListOfModules();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  //To retrieve the list of names of assessment from the local database
  const getListOfModules = async () => {
    await AsyncStorage.getItem(nameOfKeyOfListOfModulesInLocalStorage).then(
      (tmp) => {
        if (tmp !== null) {
          const parsedTmp = JSON.parse(tmp);
          setModuleList(parsedTmp);
        }
      }
    );
  };

  //If user clicks the update button,
  //all tempates of assessemts from firestore are fetched and stored into the local database
  const onClickedUpdateModulesBtn = async () => {
    setIsVisibleSpiner(true);
    let ListOfModules = [];
    const modulesRef = firebase.firestore().collection(MODULESFIRESTORE);
    const snapshot = await modulesRef.get();
    await snapshot.forEach((doc) => {
      try {
        AsyncStorage.setItem(`${doc.id}`, JSON.stringify(doc.data()));
        ListOfModules.push({
          moduleIdInDB: doc.id,
          moduleTitle: doc.data().title,
        });
      } catch (e) {
        setIsVisibleSpiner(false);
      }
    });
    if (ListOfModules.length === 0) {
      setIsVisibleSpiner(false);
      Alert.alert(`There is no assessment to download`);
      return;
    }
    try {
      await AsyncStorage.setItem(
        nameOfKeyOfListOfModulesInLocalStorage,
        JSON.stringify(ListOfModules)
      );
      setIsVisibleSpiner(false);
      Alert.alert(`Updated Module`);
      await getListOfModules();
    } catch (e) {
      setIsVisibleSpiner(false);
    }
  };

  //If user clicks a module,
  //the clicked module is sent to the modal(pop-up) showing the template of assessment
  const onClickedTheModule = (module) => {
    setModule(module);
    setIsModalVisible(true);
  };

  //In order to close modal, the state of isModalVisible is set as false
  const closeModal = () => {
    setIsModalVisible(false);
  };

  //If user clicks the back button, the previous screen displays
  const onClickedBackBtn = () => {
    navigation.goBack();
  };

  //To render list of name of assessment
  const renderListModules = () => {
    let tmpModuleList = null;
    if (moduleList.length === 0) {
      tmpModuleList = <Text>There is no module list</Text>;
    } else {
      tmpModuleList = moduleList.map((module, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.cardOuterContainer}
            key={index}
            onPress={() => onClickedTheModule(module)}
          >
            <LinearGradient
              style={styles.cardOuterLinearContainer}
              colors={["#D14545", "#FA7F7F", "#D14545"]}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
            >
              <View style={styles.cardInnerContainer}>
                <View style={styles.textsContainerInCard}>
                  <Text style={styles.mouleTitleStyle}>
                    {module.moduleTitle}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        );
      });
    }
    return tmpModuleList;
  };

  //To render the layout of the list of assessment
  //To call the function rendering the list of assessment
  //If the title of the module is clicked, the pop up for the detail displays.
  return (
    <SafeAreaView
      style={styles.safeAreaViewContainer}
      edges={["right", "left", "bottom"]}
    >
      <LinearGradient
        style={styles.linearGradientStyle}
        colors={["#1366B1", "#1A213C"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0.7 }}
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
        <Text style={styles.navigationBarTextStyle}>Modules</Text>
      </LinearGradient>
      <ScrollView style={styles.scrollViewStyle}>
        <View
          style={
            Platform.OS === "ios"
              ? styles.safeAreaForBodyForIOS
              : styles.safeAreaForBodyForAndroid
          }
        >
          <View style={styles.subTitleContainer}>
            <TouchableOpacity
              onPress={onClickedUpdateModulesBtn}
              style={styles.iconAreaForSubTitle}
            >
              <Text style={styles.menuTitle}>Update Modules</Text>
              <MaterialIcons
                style={styles.menuIcon}
                name="system-update-alt"
                size={16}
                color="#0B4F8C"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.listModulesContainer}>{renderListModules()}</View>
        </View>
      </ScrollView>
      {isVisibleSpiner && (
        <View
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#103A9E" />
        </View>
      )}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <ModalForModuleContent
          shrinkAccordian={() => {}}
          expandAccordian={() => {}}
          structure={{}}
          from="list"
          closeModal={closeModal}
          module={module}
        />
      </Modal>
    </SafeAreaView>
  );
}
