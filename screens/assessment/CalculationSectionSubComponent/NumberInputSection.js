/**
 *
 * NumberInputSection.js
 * Jongsu An
 * Mar 29, 2021
 *
 * This is a react native component for the NumberInputSection
 *
 */

import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, Alert } from "react-native";

export default function NumberInputSection(props) {
  //Below are elements of props
  // props.propsForChild.calcSection.fieldName: 'xxxx'
  // props.propsForChild.calcSection.mathOp: '*'
  // props.propsForChild.calcSection.sectionid: 'xxxxx'
  // props.propsForChild.calcSection.title: "xxx"
  // props.propsForChild.calcSection.type: "numberInput"
  // props.propsForChild.calcSection.value: 13

  //To declare constant extracted from props
  const { mathOp, title } = props.propsForChild.calcSection;
  const [editable] = useState(props.propsForChild.editable);

  const [value, setValue] = useState(
    props.propsForChild.calcSection.value === null ||
      props.propsForChild.calcSection.value === undefined
      ? ""
      : `${props.propsForChild.calcSection.value}`
  );

  //To pass data that user inputs to the parent component(CaculationSection)
  function handleOnChangeText(text) {
    if (editable === true) {
      if (/^\d+$/.test(text) || text === "") {
      } else {
        Alert.alert("Please input number");
        return;
      }
      setValue(text);
      props.propsForChild.subCollectValuesFromUsers(props.propsForChild.index, {
        value: text,
      });
    }
  }

  //To render the dropdown form
  const render = () => {
    let components = "";
    if (editable === true) {
      return (
        <View>
          <TextInput
            keyboardType="numeric"
            style={styles.textInputStyle}
            onChangeText={handleOnChangeText}
            value={value}
            autoCapitalize="none"
          />
        </View>
      );
    } else {
      components = <Text>{value}</Text>;
    }
    return components;
  };

  //To render the function rendering the number input form
  return (
    <>
      <Text style={{ fontSize: 15, marginBottom: 5, fontWeight: "bold" }}>
        {title}
      </Text>
      {render()}
    </>
  );
}

const styles = StyleSheet.create({
  textInputStyle: {
    width: "35%",
    borderWidth: 1,
    borderColor: "#A3A3A3",
    height: 40,
    fontSize: 15,
    marginTop: 3,
    marginBottom: 15,
    borderRadius: 15,
    padding: 10,
  },
});
