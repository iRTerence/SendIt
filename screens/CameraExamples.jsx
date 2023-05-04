import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/style";
import CameraPicker from "../component/Camera/CameraPicker";
import React from "react";

const CameraExamples = () => {
  return (
    <View style={styles.container}>
      <CameraPicker />
    </View>
  );
};

export default CameraExamples;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
