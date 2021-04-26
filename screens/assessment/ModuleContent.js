/**
 *
 * ModuleContent.js
 * Neal Yan
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component of the module detail screen
 *
 */

import React, {
  useState,
  useCallback,
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useFocusEffect } from "@react-navigation/native";
import { AuthContext } from "../../helpers/context/AuthContext";
import { Text, Alert, View } from "react-native";
import { ActivityIndicator } from "react-native";
import { styles } from "./StyleOfModuleContent";
import TextSection from "./moduleComponents/TextSection";
import DropDownSection from "./moduleComponents/DropDownSection";
import RadioSection from "./moduleComponents/RadioSection";
import TextInputSection from "./moduleComponents/TextInputSection";
import CheckboxSection from "./moduleComponents/CheckboxSection";
import PictureSection from "./moduleComponents/PictureSection";
import CalculationSection from "./moduleComponents/CalculationSection";
import { firebase } from "../../helpers/firebase/config";
import {
  RESULTOFASSESSMENTFIRESOTRE,
  NOTIFICATIONSFIRESTORE,
} from "../../helpers/namesOfCollectionOfFirestore";
import { useSelector } from "react-redux";

//To declare string constants to parse structure of a module
const textSection = "TextSection";
const textInputSection = "TextInputSection";
const checkboxInputSection = "CheckboxInputSection";
const radioSection = "RadioSection";
const dropDownSection = "DropdownInputSection";
const pictureSection = "PictureSection";
const calculationSection = "CalculationSection";

const ModuleContent = forwardRef((props, ref) => {
  const { editable } = props.data;
  const [structure, setStructure] = useState(props.data.structure);

  //To get the documentId that user chose
  const documentId = useSelector(
    (state) => state.reducerForDcumentIdOfResultAssessment.documentId
  );

  //To get information of user logged in
  const { userLoggedIn } = useContext(AuthContext);

  //To initialize variable to collect data that user will input
  const [collectionsValuesInputted, setCollectionsValuesInputted] = useState(
    new Map()
  );

  //To declare a state to set the visiblity of spinner
  const [isVisibleSpiner, setIsVisibleSpiner] = useState(false);

  //Whenever the component is focused, the logic runs once
  useFocusEffect(
    useCallback(() => {
      reset();
      return () => {};
    }, [props.data.structure])
  );

  //To set the structure of this screen as the structure passed
  const reset = () => {
    setStructure(props.data.structure);
  };

  //To collect data that user inputs
  const collectValuesFromUsers = (index, value) => {
    let tmpMap = new Map();
    for (let [key, value] of collectionsValuesInputted) {
      tmpMap.set(key, value);
    }
    tmpMap.set(`${index}`, value);
    setCollectionsValuesInputted(tmpMap);
  };

  //To convert data that user inputs to structure of module
  //To send structure of module with data to firestore
  async function submit() {
    if (structure === null || collectionsValuesInputted.size === 0) {
      if (props.from === "history") {
        Alert.alert("There is no information to edit");
      } else {
        Alert.alert("There is no information to input");
      }
      return;
    }

    //To convert data that user inputs to structure of module
    for (let [key, value] of collectionsValuesInputted) {
      let identifierOfSection = structure.sections[parseInt(key)].type;

      switch (identifierOfSection) {
        case calculationSection:
          for (let [subKey, subValue] of value) {
            let subIdentifierOfcalcSection =
              structure.sections[parseInt(key)].calcSections[parseInt(subKey)]
                .type;
            switch (subIdentifierOfcalcSection) {
              case "numberInput":
                let valueParsed = parseInt(subValue.value);
                structure.sections[parseInt(key)].calcSections[
                  parseInt(subKey)
                ].value = valueParsed.toString() === "NaN" ? null : valueParsed;
                break;
              case "checkboxInputSection":
                subValue.forEach((el, index) => {
                  if (el.value === null || el.value === undefined) {
                  } else {
                    structure.sections[parseInt(key)].calcSections[
                      parseInt(subKey)
                    ].options[index].value = el.value;
                  }
                });
                break;
              case "dropdownInputSection":
                structure.sections[parseInt(key)].calcSections[
                  parseInt(subKey)
                ].selected = subValue.index;
                break;
              default:
                break;
            }
          }
          break;
        case textInputSection:
          value.forEach((el, index) => {
            if (el === null || el === undefined) {
            } else {
              structure.sections[parseInt(key)].options[index].value = el;
            }
          });
          break;
        case checkboxInputSection:
          value.forEach((el, index) => {
            if (el === null || el === undefined) {
            } else {
              structure.sections[parseInt(key)].options[index].value = el;
            }
          });
          break;
        case radioSection:
          structure.sections[parseInt(key)].selected = value;
          break;
        case dropDownSection:
          structure.sections[parseInt(key)].selected = value;
          break;
        default:
          break;
      }
    }

    //'props.from === "history"' means
    //that this ModuleContent is called by the history of assessment
    //in order to edit the result of assessment
    setIsVisibleSpiner(true);
    if (props.from === "history") {
      structure.assessmentMetaData.updatedBy = userLoggedIn.uid;
      // structure.assessmentMetaData.updatedAt = firebase.firestore.Timestamp.fromDate(
      //   new Date()
      // ).toDate();

      // Keep offline and online data structure consistent
      structure.assessmentMetaData.updatedAt = new Date().getTime();

      //To send the structure of module having data thay user inputs to firestore
      await firebase
        .firestore()
        .collection(RESULTOFASSESSMENTFIRESOTRE)
        .doc(structure.documentId)
        .set(structure)
        .then((docRef) => {
          Alert.alert(`Assessment Updated`);
          //The content of accordian is updated forcelly by re-rendering the content of accordian
          props.shrinkAccordian();
          props.expandAccordian();
          props.closeModal();
        })
        .catch((error) => {
          setIsVisibleSpiner(false);
          Alert.alert(`Error updating document: ${error.message}`);
        });
    } else {
      //'props.from !== "history"' means
      //that this ModuleContent is called in order to create the result of assessment
      structure.assessmentMetaData.createdBy = userLoggedIn.uid;
      // structure.assessmentMetaData.createdAt = firebase.firestore.Timestamp.fromDate(
      //   new Date()
      // ).toDate();

      // Keep offline and online data structure consistent
      structure.assessmentMetaData.createdAt = new Date().getTime();

      //To send the structure of module having data thay user inputs to firestore
      await firebase
        .firestore()
        .collection(RESULTOFASSESSMENTFIRESOTRE)
        .add(structure)
        .then((docRef) => {
          Alert.alert(`Assessment Submitted`);

          //To create the notification
          firebase
            .firestore()
            .collection(NOTIFICATIONSFIRESTORE)
            .add({
              content: `patientId ${structure.patientId} ${structure.title} Assessment Done`,
              // createdAt: firebase.firestore.Timestamp.fromDate(
              //   new Date()
              // ).toDate(),
              createdAt: new Date().getTime(),
              createdBy: userLoggedIn.uid,
              seen: false,
            })
            .then((docRef) => {
              props.closeModal();
            })
            .catch((error) => {
              setIsVisibleSpiner(false);
            });
        })
        .catch((error) => {
          setIsVisibleSpiner(false);
          Alert.alert(`Error adding documen: ${error.message}`);
        });
    }
  }

  //In order to allow the 'submit' function to be called by the parent component,
  //the 'submit' function is wrapped by 'useImperativeHandle'
  useImperativeHandle(ref, () => {
    return {
      submit: submit,
    };
  });

  //To render structure of module
  const renderModule = () => {
    let components = [];
    if (structure !== null) {
      components = structure.sections.map((section, index) => {
        let identifierOfSection = section.type;
        switch (identifierOfSection) {
          case textSection:
            return (
              <View key={index} style={styles.sectionStyleForViewing}>
                <TextSection propsForChild={{ section: section }} />
              </View>
            );
            break;
          case textInputSection:
            return (
              <View
                key={index}
                style={
                  editable ? styles.section : styles.sectionStyleForViewing
                }
              >
                <TextInputSection
                  propsForChild={{
                    section: section,
                    index,
                    collectValuesFromUsers,
                    editable: editable,
                  }}
                />
              </View>
            );
            break;
          case checkboxInputSection:
            return (
              <View
                key={index}
                style={
                  editable ? styles.section : styles.sectionStyleForViewing
                }
              >
                <CheckboxSection
                  key={index}
                  propsForChild={{
                    section: section,
                    index,
                    collectValuesFromUsers,
                    editable: editable,
                  }}
                />
              </View>
            );
            break;
          case radioSection:
            return (
              <View
                key={index}
                style={
                  editable ? styles.section : styles.sectionStyleForViewing
                }
              >
                <RadioSection
                  key={index}
                  propsForChild={{
                    section: section,
                    index,
                    collectValuesFromUsers,
                    editable: editable,
                  }}
                />
              </View>
            );
            break;
          case dropDownSection:
            return (
              <View
                key={index}
                style={
                  editable ? styles.section : styles.sectionStyleForViewing
                }
              >
                <DropDownSection
                  key={index}
                  propsForChild={{
                    section: section,
                    index,
                    collectValuesFromUsers,
                    editable: editable,
                  }}
                />
              </View>
            );
            break;
          case calculationSection:
            return (
              <View
                key={index}
                style={
                  editable ? styles.section : styles.sectionStyleForViewing
                }
              >
                <CalculationSection
                  key={index}
                  propsForChild={{
                    section: section,
                    index,
                    collectValuesFromUsers,
                    editable: editable,
                  }}
                />
              </View>
            );
          case pictureSection:
            return (
              <View
                key={index}
                style={
                  editable ? styles.section : styles.sectionStyleForViewing
                }
              >
                <PictureSection
                  key={index}
                  propsForChild={{
                    section: section,
                  }}
                />
              </View>
            );
          default:
            return <Text key={index}>Default</Text>;
        }
      });
    } else {
      components = <Text>There is no content of module</Text>;
    }
    return components;
  };

  //To render the container wrapping renderers of structure of a module
  return (
    <View style={styles.moduleContainer}>
      {structure ? renderModule() : <></>}

      {isVisibleSpiner && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="#103A9E" />
        </View>
      )}
    </View>
  );
});

export default ModuleContent;
