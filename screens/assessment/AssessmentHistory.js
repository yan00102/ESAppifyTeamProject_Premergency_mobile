/**
 *
 * AssessmentHistory.js
 * Jongsu An
 * March 14, 2021
 *
 * This is a react native component of Assessment History
 *
 */

import React, { useCallback, useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./StyleOfAssessmentHistory";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AccordianForHistory from "./AccordianForHistory";

export default function AssessmentHistory(props) {
  const [historyAssessments, setHistoryAssessments] = useState(
    props.historyAssessments
  );

  const patientId = useSelector((state) => state.reducerForPatientId.patientId);

  //Whenever the component is focused, the logic runs once
  useFocusEffect(
    useCallback(() => {
      reset();
      return () => {};
    }, [props.historyAssessments])
  );

  //When this component is called, the state of historyAssessments is initialized
  const reset = () => {
    setHistoryAssessments(props.historyAssessments);
  };

  //The function of rendering the body
  //each item is rendered by the AccordianForHistory component.
  const renderAssessmentHistory = () => {
    let tmpHistoryAssessments = null;
    if (historyAssessments.length === 0) {
      tmpHistoryAssessments = <Text>There is no Assessment history</Text>;
    } else {
      tmpHistoryAssessments = historyAssessments.map((item, index) => {
        return <AccordianForHistory key={index} history={item} index={index} />;
      });
    }
    return tmpHistoryAssessments;
  };

  //To render the layout of Assessment History and call the function of rendering the body
  return (
    <>
      <View style={styles.AssessmentHistoryContainer}>
        {renderAssessmentHistory()}
      </View>
    </>
  );
}
