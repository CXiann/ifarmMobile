import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Home!</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
