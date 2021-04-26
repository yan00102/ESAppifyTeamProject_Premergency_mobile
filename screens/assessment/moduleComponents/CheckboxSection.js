/**
 *
 * CheckboxSection.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component for the wrapper of the 'Checkbox' form
 *
 */

import React, { useState } from "react";
import { Text } from "react-native";
import CheckboxElement from "./CheckboxElement";

export default function CheckboxSection(props) {
  //Below are elements of props
  //props.propsForChild.section
  //props.propsForChild.section.title
  //props.propsForChild.section.options
  //props.propsForChild.section.options[0].fieldName
  //props.propsForChild.section.options[0].value

  //To declare constant extracted from props
  const [editable] = useState(props.propsForChild.editable);

  //variables to store value that user inputs
  const [valuesFromUsers, setValuesFromUsers] = useState(
    props.propsForChild.section.options.map((option) => option.value)
  );

  //To hold values passed from the chilren component(CheckboxElement)
  //To pass data that user inputs to the parent component(ModuleDetailScreen)
  const storeValuesFromUsers = (index, value) => {
    let tmpArray = [];
    tmpArray = [...valuesFromUsers];
    tmpArray[index] = value;
    props.propsForChild.collectValuesFromUsers(
      props.propsForChild.index,
      tmpArray
    );
    setValuesFromUsers(tmpArray);
  };

  //To render the container wrapping the 'Checkbox' form
  const render = () => {
    let components = [];
    if (props.propsForChild.section.options.length > 0) {
      components = props.propsForChild.section.options.map((option, index) => {
        return (
          <CheckboxElement
            key={index}
            propsForChild={{
              option,
              index,
              storeValuesFromUsers,
              editable,
            }}
          />
        );
      });
    } else {
      components = <Text>There is no checkbox form</Text>;
    }
    return components;
  };

  //To call function rendering the container wrapping the 'Checkbox' form
  return (
    <>
      <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: "bold" }}>
        {props.propsForChild.section.title}
      </Text>
      {render()}
    </>
  );
}
