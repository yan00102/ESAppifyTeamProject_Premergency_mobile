/**
 *
 * AccordianForHistory.js
 * Jongsu An
 * March 14, 2021
 *
 * This is a react native component of the Accordian for detail result of assessment
 *
 */

import React, { useState, useCallback, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Modal,
  LayoutAnimation,
} from "react-native";
import { styles } from "./StyleOfAccordianForHistory";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import ModuleContent from "./ModuleContent";
import ModalForModuleContent from "./ModalForModuleContent";
import { storeDocumentIdOfResultAssessment } from "../../helpers/reduxCollection/Actions";
import {
  convertFormatOfNameOfMonthDayYear,
  extractHhMmFromDate,
  getExactTime,
} from "../../helpers/utils";

export default function AccordianForHistory(props) {
  const { index } = props;
  const [history, setHistory] = useState(props.history);

  const [expanded, setExpanded] = useState(false);
  const moduleContentRef = useRef();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();

  //Whenever the component is focused, the logic runs once
  useFocusEffect(
    useCallback(() => {
      reset();
      return () => {};
    }, [props.history])
  );

  const reset = () => {
    console.log("each history is => ", history);
    setHistory(props.history);
  };

  //If user clicks an item of histor assessment, the accordian is expanded
  const onClickedHistoryItem = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const tmp = !expanded;
    dispatch(storeDocumentIdOfResultAssessment(history.documentId));
    setExpanded(tmp);
  };

  //If user clicks the edit button, modal(pop-up) displays
  const onClickedEditBtn = () => {
    setIsModalVisible(true);
  };

  //In order to expand accordian, the state of 'expanded' is set as true
  const expandAccordian = () => {
    setExpanded(true);
  };

  //In order to shrink accordian, the state of 'expanded' is set as false
  const shrinkAccordian = () => {
    setExpanded(false);
  };

  //In order to close modal, the state of 'isModalVisible' is set as false
  const closeModal = () => {
    setIsModalVisible(false);
  };

  //To convert date from firestore into the format 'Short Name of Month Day, year YY:MM:DD'
  const covertUpdateInformation = () => {
    try {
      return `${convertFormatOfNameOfMonthDayYear(
        "short",
        history.assessmentMetaData.updatedAt.toDate()
      )} ${extractHhMmFromDate(history.assessmentMetaData.updatedAt.toDate())}`;
    } catch (e) {
      return "";
    }
  };

  //To render accordian for history
  //The detail of history of assessment is from 'ModuleContent'
  return (
    <>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.cardOuterContainer}
        key={index}
        onPress={() => onClickedHistoryItem(index)}
      >
        <LinearGradient
          style={styles.cardOuterLinearContainer}
          colors={["#0B4F8C", "#2682D6", "#0B66B9"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
        >
          <View style={styles.cardInnerContainer}>
            <View style={styles.textsContainerInCard}>
              <Text style={styles.moduleTitleStyle}>{history.title}</Text>
              <AntDesign
                style={styles.upDownIcon}
                name={expanded ? "up" : "down"}
                size={20}
                color="#646565"
              />
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
      {expanded && (
        <View style={styles.moduleDetailContainer}>
          <LinearGradient
            style={styles.linearGradientStyle}
            colors={["#1366B1", "#1A213C"]}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0.7 }}
          >
            <View style={styles.datesContainer}>
              <View style={styles.assessmentDateContainer}>
                <Text style={styles.navigationBarTextStyle}>
                  Assessment date:
                </Text>
                <Text style={styles.navigationBarTextStyle}>
                  {/* {`${convertFormatOfNameOfMonthDayYear(
                    "short",
                    history.assessmentMetaData.createdAt.toDate()
                  )} ${extractHhMmFromDate(
                    history.assessmentMetaData.createdAt.toDate()
                  )}`} */}
                  {" " +
                    new Date(history.assessmentMetaData.createdAt)
                      .toLocaleString("en-US", { hour12: false })
                      .substring(0, 11) +
                    " " +
                    new Date(history.assessmentMetaData.createdAt)
                      .toLocaleString("en-US", { hour12: false })
                      .substring(11, 16) +
                    getExactTime(history.assessmentMetaData.createdAt)}
                </Text>
              </View>
              <View style={styles.modifiedDateContainer}>
                <Text style={styles.navigationBarTextStyle}>Last modified</Text>
                <Text style={styles.navigationBarTextStyle}>
                  {covertUpdateInformation()}
                </Text>
              </View>
            </View>
            <View style={styles.moduleContentContiner}>
              {history === null ? (
                <Text>There is no content</Text>
              ) : (
                <>
                  <View style={styles.editButtonContainer}>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={onClickedEditBtn}
                      style={styles.editButtonArea}
                    >
                      <Text style={styles.editTextStyle}>Edit</Text>
                      <AntDesign name="form" size={16} color="#0B4F8C" />
                    </TouchableOpacity>
                  </View>
                  <ModuleContent
                    shrinkAccordian={() => {}}
                    expandAccordian={() => {}}
                    from="history"
                    ref={moduleContentRef}
                    closeModal={() => {}}
                    data={{ structure: history, editable: false }}
                  />
                </>
              )}
            </View>
          </LinearGradient>
        </View>
      )}
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <ModalForModuleContent
          shrinkAccordian={shrinkAccordian}
          expandAccordian={expandAccordian}
          structure={history}
          from="history"
          closeModal={closeModal}
          module={{ moduleTitle: history.title }}
        />
      </Modal>
    </>
  );
}
