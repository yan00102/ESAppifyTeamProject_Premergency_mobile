/**
 *
 * DropdownInputSection.js
 * Jongsu An
 * Mar 29, 2021
 *
 * This is a react native component for the dropdown form
 *
 */

import React, { useState } from "react";
import { Text, Platform } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function DropdownInputSection(props) {
  //Below are elements of props
  const { mathOp, title } = props.propsForChild.calcSection;
  // props.propsForChild.calcSection.mathOp: '*'
  // props.propsForChild.calcSection.sectionid: 'xxxxx'
  // props.propsForChild.calcSection.selected: null
  // props.propsForChild.calcSection.title: "age"
  // props.propsForChild.calcSection.type: "dropdownInputSection"
  // props.propsForChild.calcSection.options[0].fieldName: "<65"
  // props.propsForChild.calcSection.options[0].itemid: "ckmnl18r000052a66dcr2yc10"
  // props.propsForChild.calcSection.options[0].weight: 1

  //To declare constant extracted from props
  const [indexSelected, setIndexSelected] = useState(
    props.propsForChild.calcSection.selected
  );
  const [editable] = useState(props.propsForChild.editable);

  //To pass data that user inputs to the parent component(CaculationSection)
  function handleOnValueChange(index) {
    if (editable === true) {
      if (index !== null) {
        props.propsForChild.subCollectValuesFromUsers(
          props.propsForChild.index,
          {
            index,
            weight: props.propsForChild.calcSection.options[index].weight,
          }
        );
      }
      setIndexSelected(index);
    }
  }

  //To render the dropdown form
  const render = () => {
    let components = [];

    if (editable === true) {
      let tempItems = props.propsForChild.calcSection.options.map(
        (option, index) => {
          return {
            label: option.fieldName,
            value: index,
          };
        }
      );
      if (props.propsForChild.calcSection.options.length > 0) {
        return (
          <RNPickerSelect
            onValueChange={handleOnValueChange}
            items={tempItems}
            value={indexSelected}
            style={{
              modalViewBottom: {
                backgroundColor: "white",
              },
              inputAndroid: { color: "black" },
            }}
            placeholder={{ label: "Select an item", value: null }}
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
          props.propsForChild.calcSection.options[indexSelected].fieldName;
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
      <Text style={{ fontSize: 15, marginBottom: 5, fontWeight: "bold" }}>
        {title}
      </Text>
      {render()}
    </>
  );
}
