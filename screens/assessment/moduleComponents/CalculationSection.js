/**
 *
 * CalculationSection.js
 * Jongsu An
 * Mar 29, 2021
 *
 * This is a react native component for calculation section
 *
 */

import React, { useState, useCallback } from "react";
import { Text, View } from "react-native";
import CheckboxInputSection from "../CalculationSectionSubComponent/CheckboxInputSection";
import DropdownInputSection from "../CalculationSectionSubComponent/DropdownInputSection";
import NumberInputSection from "../CalculationSectionSubComponent/NumberInputSection";
import { styles } from "./StyleOfCalculationSection";
import { useFocusEffect } from "@react-navigation/native";

//To declare the identifier for each sub-sections and elements
const numberInputSection = "numberInput";
const checkboxInputSection = "checkboxInputSection";
const dropdownInputSection = "dropdownInputSection";
const percentage = "percentage";
const number = "number";

export default function CalculationSection(props) {
  //Below are elements of props
  //props.propsForChild.section.title
  //props.propsForChild.section.calcSections[0]

  //To destructure props from the parent component
  const { section, collectValuesFromUsers, editable } = props.propsForChild;

  //To declare the state to hold data that user inputts in the children components
  const [
    subCollectionsValuesInputted,
    setSubCollectionsValuesInputted,
  ] = useState(new Map());

  //To initailize the state
  //(1) in order to get holding values the user inputs
  //(2) in order to calculate the score based on user's input
  useFocusEffect(
    useCallback(() => {
      if (section !== null) {
        let tmpMap = new Map();
        section.calcSections.forEach((calcSection, index) => {
          let identifierOfCalcSection = calcSection.type;
          switch (identifierOfCalcSection) {
            case numberInputSection:
              tmpMap.set(`${index}`, { value: `${calcSection.value}` });
              break;
            case checkboxInputSection:
              let tmpArray = [];
              tmpArray = calcSection.options.map((option) => {
                return { value: option.value, weight: option.weight };
              });
              tmpMap.set(`${index}`, tmpArray);
              break;
            case dropdownInputSection:
              if (calcSection.selected !== null) {
                tmpMap.set(`${index}`, {
                  index: calcSection.selected,
                  weight: calcSection.options[calcSection.selected].weight,
                });
              }
              break;
            default:
              break;
          }
        });
        props.propsForChild.collectValuesFromUsers(
          props.propsForChild.index,
          tmpMap
        );
        setSubCollectionsValuesInputted(tmpMap);
      }
      return () => {};
    }, [])
  );

  //To collect data of child components such as checkbox, dropdown
  const subCollectValuesFromUsers = (index, value) => {
    let tmpMap = new Map();
    for (let [key, value] of subCollectionsValuesInputted) {
      tmpMap.set(key, value);
    }
    tmpMap.set(`${index}`, value);
    props.propsForChild.collectValuesFromUsers(
      props.propsForChild.index,
      tmpMap
    );
    setSubCollectionsValuesInputted(tmpMap);
  };

  //To call children components wrapping the content of calculation section
  const render = () => {
    let components = [];
    if (section !== null) {
      components = section.calcSections.map((calcSection, index) => {
        let identifierOfCalcSection = calcSection.type;
        switch (identifierOfCalcSection) {
          case numberInputSection:
            return (
              <View
                key={index}
                style={
                  editable ? styles.subSection : styles.subSctionStyleForViewing
                }
              >
                <NumberInputSection
                  key={index}
                  propsForChild={{
                    calcSection: calcSection,
                    index,
                    subCollectValuesFromUsers,
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
                  editable ? styles.subSection : styles.subSctionStyleForViewing
                }
              >
                <CheckboxInputSection
                  key={index}
                  propsForChild={{
                    calcSection: calcSection,
                    index,
                    subCollectValuesFromUsers,
                    editable: editable,
                  }}
                />
              </View>
            );
            break;
          case dropdownInputSection:
            return (
              <View
                key={index}
                style={
                  editable ? styles.subSection : styles.subSctionStyleForViewing
                }
              >
                <DropdownInputSection
                  key={index}
                  propsForChild={{
                    calcSection: calcSection,
                    index,
                    subCollectValuesFromUsers,
                    editable: editable,
                  }}
                />
              </View>
            );
            break;
          default:
            return <Text key={index}>Default</Text>;
        }
      });
    } else {
      components = <Text>There is no content of Calculation</Text>;
    }
    return components;
  };

  //To render the score through calculation base on user's input
  const renderCalcResult = () => {
    let result = parseFloat(section.initialValue);
    if (section !== null) {
      try {
        section.calcSections.forEach((calcSection, index) => {
          let identifierOfCalcSection = calcSection.type;
          let tmpValue = subCollectionsValuesInputted.get(`${index}`);
          let middleResult = null;
          if (tmpValue !== undefined) {
            switch (identifierOfCalcSection) {
              case numberInputSection:
                let tmpParsedFloat = parseFloat(tmpValue.value);
                if (tmpParsedFloat.toString() !== "NaN") {
                  middleResult = tmpParsedFloat;
                }
                break;
              case checkboxInputSection:
                let tmpPreArray = [];
                tmpPreArray = tmpValue
                  .filter((el) => el.value === true)
                  .map((el) => el.weight);
                let tmpArray = [];
                tmpPreArray.forEach((weight) => {
                  let tmpPreParsedFloat = parseFloat(weight);
                  if (tmpPreParsedFloat.toString() !== "NaN") {
                    tmpArray.push(tmpPreParsedFloat);
                  }
                });
                if (tmpArray.length > 0) {
                  middleResult = tmpArray.reduce(
                    (accumulator, currentValue) => {
                      if (calcSection.mathOp === "*") {
                        return accumulator * currentValue;
                      } else if (calcSection.mathOp === "+") {
                        return accumulator + currentValue;
                      } else if (calcSection.mathOp === "-") {
                        return accumulator - currentValue;
                      } else if (calcSection.mathOp === "/") {
                        return accumulator / currentValue;
                      } else {
                        return accumulator;
                      }
                    }
                  );
                }
                break;
              case dropdownInputSection:
                let tmpPre2ParsedFloat = parseFloat(tmpValue.weight);
                if (tmpPre2ParsedFloat.toString() !== "NaN") {
                  middleResult = tmpPre2ParsedFloat;
                }
                break;
              default:
                break;
            }
            if (middleResult !== null) {
              if (section.calculationType === percentage) {
                result = result * middleResult;
              } else if (section.calculationType === number) {
                result = result + middleResult;
              }
            }
          }
        });
      } catch (error) {
        result = parseFloat(section.initialValue);
      }
    }
    return (
      <Text style={{ fontSize: 15, marginBottom: 5, fontWeight: "bold" }}>
        Result: {`${+result.toFixed(4)}`}
      </Text>
    );
  };

  //To render the layout on the screen and call functions to render the content
  return (
    <>
      <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: "bold" }}>
        {props.propsForChild.section.title}
      </Text>
      {render()}
      {renderCalcResult()}
    </>
  );
}
