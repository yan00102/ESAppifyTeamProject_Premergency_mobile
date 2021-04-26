/**
 *
 * RadioSection.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component for 'RadioButton' form
 *
 */

import React, { useState } from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";

export default function RadioSection(props) {
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
  function handleOnPress(index) {
    if (editable === true) {
      props.propsForChild.collectValuesFromUsers(
        props.propsForChild.index,
        index
      );
      setIndexSelected(index);
    }
  }

  //To render the 'RadioButton' form
  const render = () => {
    let components = [];
    if (editable === true) {
      if (props.propsForChild.section.options.length > 0) {
        components = props.propsForChild.section.options.map(
          (option, index) => {
            return (
              <View key={`view:${index}`}>
                <Text key={`text:${index}`}>{option.fieldName}</Text>
                <RadioButton
                  key={index}
                  value={index}
                  status={index === indexSelected ? "checked" : "unchecked"}
                  onPress={() => handleOnPress(index)}
                />
              </View>
            );
          }
        );
      } else {
        components = <Text>There is no radio button</Text>;
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

  //To call function rendering the 'RadioButton' form
  return (
    <>
      <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: "bold" }}>
        {props.propsForChild.section.title}
      </Text>
      {render()}
    </>
  );
}
