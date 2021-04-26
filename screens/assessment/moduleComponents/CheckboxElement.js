/**
 *
 * CheckboxElement.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component for the 'Checkbox' form
 *
 */

import React, { useState } from "react";
import { Text, View, Platform } from "react-native";
import { Checkbox } from "react-native-paper";
import { styles } from "./StyleOfCheckboxElement";

export default function CheckboxElement(props) {
  //Below are elements of props
  //props.propsForChild.option.fieldName
  //props.propsForChild.option.value

  //To declare constants extracted from props
  const [editable] = useState(props.propsForChild.editable);
  const [label] = useState(props.propsForChild.option.fieldName);
  const [index] = useState(props.propsForChild.index);
  const [checked, setChecked] = useState(props.propsForChild.option.value);

  //To pass data that user inputs to the parent componet(CheckboxSection)
  //To hold data that user inputs
  function handleOnPress() {
    if (editable === true) {
      props.propsForChild.storeValuesFromUsers(index, !checked);
      setChecked(!checked);
    }
  }

  //To render the 'Checkbox' form
  //The react-native-paper doesn't have the outline of checkbox in the iOS.
  //Therefore, the outline is put only in the iOS
  return (
    <>
      <View>
        {label && <Text>{label}</Text>}
        <View
          style={
            Platform.OS === "ios"
              ? styles.checkBoxContainerForIOS
              : styles.checkBoxContainerForAndroid
          }
        >
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={handleOnPress}
            color="gray"
          />
        </View>
      </View>
    </>
  );
}
