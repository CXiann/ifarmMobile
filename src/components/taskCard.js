import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Card} from 'react-native-paper';

const TaskCard = props => {
  const getTaskTypeStyle = taskType => {
    switch (taskType) {
      case 'Urgent':
        return styles.urgent;
      case 'Important':
        return styles.important;
      case 'Normal':
        return styles.normal;
      default:
        return styles.default; // Default style if taskType doesn't match any
    }
  };

  const taskTypeStyle = getTaskTypeStyle(props.taskType);

  return (
    <Card style={styles.taskCard}>
      <Card.Content>
        <Text style={styles.taskTitle}>{props.taskTitle}</Text>
        <View style={[styles.taskType, taskTypeStyle]}>
          <Text style={styles.taskTypeText}>{props.taskType}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    width: '70%',
    marginVertical: 10,
    alignSelf: 'flex-end',
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  taskType: {
    marginTop: 5,
    alignSelf: 'flex-end',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 30,
  },
  urgent: {
    backgroundColor: '#ff0000',
  },
  important: {
    backgroundColor: '#ff9900',
  },
  normal: {
    backgroundColor: '#00cc00',
  },
  default: {
    backgroundColor: 'gray', // Default color for an unknown taskType
  },
  taskTypeText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 10,
  },
});

export default TaskCard;
