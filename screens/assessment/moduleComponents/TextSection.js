/**
 *
 * TextSection.js
 * Jongsu An
 * Feb 15, 2021
 *
 * This is a react native component for showing text
 *
 */

import React from "react";
import { Text } from "react-native";

export default function TextSection(props) {
  //Below are elements of props
  //props.propsForChild.section.title
  //props.propsForChild.section.content

  const { title, content } = props.propsForChild.section;

  //To render text section
  return (
    <>
      <Text style={{ fontSize: 18, marginBottom: 5, fontWeight: "bold" }}>
        {title}
      </Text>
      <Text>{content}</Text>
    </>
  );
}
