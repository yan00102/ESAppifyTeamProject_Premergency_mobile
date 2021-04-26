/**
 *
 * FocusedStatusBar.js
 * Jongsu An
 * Feb 14, 2021
 *
 * This is a react native component for activating 'StatusBar' in the focused screen
 *
 */

import React from "react";
import { StatusBar } from "expo-status-bar";
import { useIsFocused } from "@react-navigation/native";

export default function FocusedStatusBar(props) {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
}
