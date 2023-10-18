import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';

const TaskStatusIndicator = props => {
  return (
    <View style={styles.container}>
      <View style={styles.verticalBar} />
      <View style={styles.verticalBar} />
      <View style={styles.verticalBar} />
      <View style={styles.verticalBar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column', // Ensures vertical alignment
    alignItems: 'center', // Centers the bars horizontally
  },
  verticalBar: {
    width: 2, // Adjust the width to your desired bar thickness
    height: 30, // Adjust the height to your desired bar length
    backgroundColor: 'black', // Adjust the color to your desired bar color
  },
});

export default TaskStatusIndicator;
