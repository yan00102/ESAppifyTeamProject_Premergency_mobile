/**
 *
 * RecentModules.js
 * Jongsu An
 * March 14, 2021
 *
 * This is a react native component of the RecentModules screen
 *
 */

import React, { useCallback, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, TouchableOpacity, Modal } from "react-native";
import { styles } from "./StyleOfRecentModules";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalForModuleContent from "./ModalForModuleContent";

const nameOfKeyOfListOfModulesInLocalStorage = "ListOfModules";

export default function RecentModules(props) {
  const listOfUsedTemplatedId = props.listOfUsedTemplatedId;

  //To declare a state to store the list of template of assessment used recently
  const [
    refinedListOfUsedTemplatedId,
    setRefinedListOfUsedTemplatedId,
  ] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [module, setModule] = useState(null);

  //Whenever the component is focused, the logic runs once
  useFocusEffect(
    useCallback(() => {
      refine();
      return () => {};
    }, [props.listOfUsedTemplatedId])
  );

  //To extract the list of template of assessment used recently
  const refine = async () => {
    await AsyncStorage.getItem(nameOfKeyOfListOfModulesInLocalStorage).then(
      (tmp) => {
        if (tmp !== null) {
          const parsedTmp = JSON.parse(tmp);
          const tmpRefinedKeysArray = [];
          let idx = -1;
          parsedTmp.forEach((key) => {
            idx = Object.keys(listOfUsedTemplatedId).findIndex((templateId) => {
              return templateId === key.moduleIdInDB;
            });
            if (idx > -1) tmpRefinedKeysArray.push(key);
          });
          setRefinedListOfUsedTemplatedId(tmpRefinedKeysArray);
        }
      }
    );
  };

  //To prepare the module that will be showed in the modal in order that user will input data
  const onClickedTheModule = (module) => {
    setModule(module);
    setIsModalVisible(true);
  };

  //In order to close modal, isModalVisible is set as false
  const closeModal = () => {
    setIsModalVisible(false);
  };

  //To render the content
  const renderRecentModules = () => {
    let tmpRecentModules = null;
    if (refinedListOfUsedTemplatedId.length === 0) {
      tmpRecentModules = <Text>There is no recent module</Text>;
    } else {
      tmpRecentModules = refinedListOfUsedTemplatedId.map((module, index) => {
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
    return tmpRecentModules;
  };

  //To render the layout and call the function that renders the content
  return (
    <>
      <View style={styles.recentModulesContainer}>{renderRecentModules()}</View>
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
    </>
  );
}
