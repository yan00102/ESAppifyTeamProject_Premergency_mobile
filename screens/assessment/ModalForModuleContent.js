/**
 *
 * ModalForModuleContent.js
 * Jongsu An
 * March 15, 2021
 *
 * This is a react native component of the modal wrapping the content of assessment
 *
 */

import React, { useState, useRef, useEffect } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "./StyleOfModalForModuleContent.js";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModuleContent from "./ModuleContent";

export default function ModalForModuleContent(props) {
  //To initialize the variable to store structure of a module
  const [structure, setStructure] = useState(
    props.from === "history" ? props.structure : null
  );

  const moduleContentRef = useRef(null);

  //To get the patient Id that user chose
  const patientId = useSelector((state) => state.reducerForPatientId.patientId);

  //Whenever the component is focused, the logic runs once
  useEffect(() => {
    if (props.from === "history") {
    } else {
      let tmpStructure = {};
      AsyncStorage.getItem(props.module.moduleIdInDB).then((tmpStructure) => {
        if (tmpStructure !== null) {
          tmpStructure = JSON.parse(tmpStructure);
          tmpStructure.templateId = props.module.moduleIdInDB;
          tmpStructure.patientId = patientId;
          setStructure(tmpStructure);
        }
      });
    }
    return () => {};
  }, []);

  //To excute the logic of storing values of assessment that user inputs
  //The logic is in the child component(ModuleContent)
  const onClickedSubmitButton = async () => {
    moduleContentRef.current.submit();
  };

  //To render the modal wrapping the content of assessment
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modal}>
        <LinearGradient
          style={styles.linearGradientStyle}
          colors={["#1366B1", "#1A213C"]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0.7 }}
        >
          <TouchableOpacity
            activeOpacity={1}
            style={styles.naviBackBtnContainerStyle}
            onPress={props.closeModal}
          >
            <AntDesign
              style={styles.naviBackBtnStyle}
              name="close"
              size={23}
              color="white"
            />
          </TouchableOpacity>
          <Text style={styles.navigationBarTextStyle}>
            {props.module.moduleTitle}
          </Text>
        </LinearGradient>
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.safeAreaForBody}>
            {structure === null ? (
              <Text>There is no content</Text>
            ) : (
              <ModuleContent
                shrinkAccordian={props.shrinkAccordian}
                expandAccordian={props.expandAccordian}
                from={props.from}
                ref={moduleContentRef}
                closeModal={props.closeModal}
                data={{ structure: structure, editable: true }}
              />
            )}
          </View>
          <View style={styles.separator2} />
          <View style={styles.submitButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.touchableOpacityStyleForSubmitButton}
              onPress={onClickedSubmitButton}
            >
              <LinearGradient
                style={styles.linearGradientStyleForSubmitButton}
                colors={["#CB6161", "#D14545"]}
                start={{ x: 0.7, y: 0.3 }}
                end={{ x: 0, y: 0.9 }}
              >
                <Text style={styles.submitButtonTitle}>Submit</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
