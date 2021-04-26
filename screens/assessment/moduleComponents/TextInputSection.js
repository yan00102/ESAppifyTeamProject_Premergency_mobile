/**
 *
 * TextInputSection.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component for wrapping 'TextInput' form
 *
 */

import React, { useState } from "react";
import { Text } from "react-native";
import InputElement from "./InputElement";

export default function TextInputSection(props) {
  //Below are elements of props
  //props.propsForChild.section.title
  //props.propsForChild.section.options
  //props.propsForChild.section.options[0].fieldName
  //props.propsForChild.section.options[0].value

  //To declare constant extracted from props
  const [editable] = useState(props.propsForChild.editable);

  //variables to store value that user inputs
  const [valuesFromUsers, setValuesFromUsers] = useState([]);

  //To hold values passed from the chilren component(TextInputElement)
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

  //To render a container wrapping 'TextInput' form
  const render = () => {
    let components = [];
    if (props.propsForChild.section.options.length > 0) {
      components = props.propsForChild.section.options.map((option, index) => {
        return (
          <InputElement
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
      components = <Text>There is no input form</Text>;
    }
    return components;
  };

  //To call function rendering a container wrapping 'TextInput' form
  return (
    <>
      <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: "bold" }}>
        {props.propsForChild.section.title}
      </Text>
      {render()}
    </>
  );
}
