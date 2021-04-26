/**
 *
 * DropDownSection.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component for the dropdown form
 *
 */

import React, { useState } from "react";
import { Text, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function DropDownSection(props) {
  //Below are elements of props
  //props.propsForChild.section.title
  //props.propsForChild.section.options
  //props.propsForChild.section.options[0].fieldName
  //props.propsForChild.section.selected

  //To declare constant extracted from props
  const [indexSelected, setIndexSelected] = useState(
    props.propsForChild.section.selected
  );
  const [editable] = useState(props.propsForChild.editable);

  //To pass data that user inputs to the parent component(ModuleDetailScreen)
  function handleOnValueChange(index) {
    if (editable === true) {
      props.propsForChild.collectValuesFromUsers(
        props.propsForChild.index,
        index
      );
      setIndexSelected(index);
    }
  }

  //To render the dropdown form
  const render = () => {
    let components = [];

    if (editable === true) {
      let tempItems = props.propsForChild.section.options.map(
        (option, index) => {
          return {
            label: option.fieldName,
            value: index,
          };
        }
      );
      if (props.propsForChild.section.options.length > 0) {
        return (
          <RNPickerSelect
            value={indexSelected}
            style={{
              modalViewBottom: {
                backgroundColor: "white",
              },
              inputAndroid: { color: "black" },
            }}
            onValueChange={handleOnValueChange}
            items={tempItems}
          >
            <Text>
              {indexSelected != null
                ? `${tempItems[indexSelected].label}`
                : "Select an item"}
            </Text>
          </RNPickerSelect>
        );
      } else {
        components = <Text>There is no dropbox form</Text>;
      }
    } else {
      try {
        let chosenItem =
          props.propsForChild.section.options[indexSelected].fieldName;
        components = <Text>{chosenItem}</Text>;
      } catch (error) {
        components = <Text>No Selected</Text>;
      }
    }
    return components;
  };

  //To render the function rendering the dropdown form
  return (
    <>
      <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: "bold" }}>
        {props.propsForChild.section.title}
      </Text>
      {render()}
    </>
  );
}
