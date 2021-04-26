/**
 *
 * PictureSection.js
 * Jongsu An
 * Mar 2, 2021
 *
 * This is a react native component for redering an image encoded by base64
 *
 */

import React from "react";
import { Text, Image, View } from "react-native";
import { styles } from "./StyleOfPictureSection";

export default function PictureSection(props) {
  //Below are elements of props
  //props.propsForChild.section.content
  //props.propsForChild.section.title

  //To render an image encoded by base64
  const render = () => {
    let components = <></>;
    if (props.propsForChild.section.content.length > 0) {
      components = (
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageEncodedBase64}
            source={{
              uri: props.propsForChild.section.content,
            }}
          />
        </View>
      );
    } else {
      components = <Text>There is no image</Text>;
    }
    return components;
  };

  //To call the function rendering an image encoded by base64
  return (
    <>
      <Text style={styles.title}>{props.propsForChild.section.title}</Text>
      {render()}
    </>
  );
}
