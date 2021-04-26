/**
 *
 * CheckboxInputSection.js
 * Jongsu An
 * Mar 29, 2021
 *
 * This is a react native component for the wrapper of the 'Checkbox' form
 *
 */

import React, { useState } from "react";
import { Text } from "react-native";
import CheckboxInputElement from "./CheckboxInputElement";

export default function CheckboxInputSection(props) {
  //Below are elements of props
  // props.propsForChild.calcSection.mathOp: '*'
  // props.propsForChild.calcSection.sectionid: 'xxxxx'
  // props.propsForChild.calcSection.selected: null
  // props.propsForChild.calcSection.title: "Family History"
  // props.propsForChild.calcSection.type: "checkboxInputSection"
  // props.propsForChild.calcSection.options[0].fieldName: "Mother"
  // props.propsForChild.calcSection.options[0].value: null
  // props.propsForChild.calcSection.options[0].weight: 2
  // props.propsForChild.calcSection.options[0].itemid: "xxxxx"

  //To declare constant extracted from props
  const [editable] = useState(props.propsForChild.editable);

  //variables to store value that user inputs
  const [valuesFromUsers, setValuesFromUsers] = useState(
    props.propsForChild.calcSection.options.map((option) => {
      return { value: option.value, weight: option.weight };
    })
  );

  //To hold values passed from the chilren component(CheckboxElement)
  //To pass data that user inputs to the parent component(CaculationSection)
  const storeValuesFromUsers = (index, value) => {
    let tmpArray = [];
    tmpArray = [...valuesFromUsers];
    tmpArray[index] = value;
    props.propsForChild.subCollectValuesFromUsers(
      props.propsForChild.index,
      tmpArray
    );
    setValuesFromUsers(tmpArray);
  };

  //To render the container wrapping the 'Checkbox' form
  const render = () => {
    let components = [];
    if (props.propsForChild.calcSection.options.length > 0) {
      components = props.propsForChild.calcSection.options.map(
        (option, index) => {
          return (
            <CheckboxInputElement
              key={index}
              propsForChild={{
                option,
                index,
                storeValuesFromUsers,
                editable,
              }}
            />
          );
        }
      );
    } else {
      components = <Text>There is no checkbox form</Text>;
    }
    return components;
  };

  //To call function rendering the container wrapping the 'Checkbox' form
  return (
    <>
      <Text style={{ fontSize: 15, marginBottom: 5, fontWeight: "bold" }}>
        {props.propsForChild.calcSection.title}
      </Text>
      {render()}
    </>
  );
}
