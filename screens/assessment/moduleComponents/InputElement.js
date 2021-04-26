/**
 *
 * InputElement.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component for 'TextInput' form
 *
 */

import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "./StyleOfInputElement";

export default function InputElement(props) {
  //Below are elements of props
  //props.propsForChild.editable
  //props.propsForChild.option.fieldName
  //props.propsForChild.index
  //props.propsForChild.option.value

  //To declare constants extracted from props
  const [editable] = useState(props.propsForChild.editable);
  const [label] = useState(props.propsForChild.option.fieldName);
  const [index] = useState(props.propsForChild.index);
  const [value, setValue] = useState(props.propsForChild.option.value);

  //To pass data that user inputs to the parent componet(TextInputSection)
  //To hold data that user inputs
  function handleOnChangeText(text) {
    if (editable === true) {
      setValue(text);
      props.propsForChild.storeValuesFromUsers(index, text);
    }
  }

  //To render the 'TextInput' form
  return (
    <>
      {editable ? (
        <View>
          {label && <Text>{label}</Text>}
          <TextInput
            style={styles.textInputStyle}
            onChangeText={handleOnChangeText}
            value={value}
            autoCapitalize="none"
          />
        </View>
      ) : (
        <View>
          <Text>- {label}</Text>
          <Text style={{ marginBottom: 5 }}>
            {`  `}
            {value}
          </Text>
        </View>
      )}
    </>
  );
}
