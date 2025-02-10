import React from "react";
import { Button } from "react-native";

const TimerQuickOption = ({ label, duration, onPress }) => {
  return <Button title={label} onPress={() => onPress(duration)} />;
};

export default TimerQuickOption;
