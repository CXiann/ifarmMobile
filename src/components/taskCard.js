import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Card, Avatar} from 'react-native-paper';

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

  const getTaskStatus = taskStatus => {
    switch (taskStatus) {
      case 'Not Started':
        return 'checkbox-blank-circle';
      case 'In Progress':
        return 'checkbox-blank-circle';
      case 'Completed':
        return 'check-bold';
      default:
        return 'checkbox-blank-circle';
    }
  };

  const taskStatusIcon = getTaskStatus(props.taskStatus);

  const getTaskStatusColor = taskStatus => {
    switch (taskStatus) {
      case 'Not Started':
        return styles.inProgress;
      case 'In Progress':
        return styles.inProgress;
      case 'Completed':
        return styles.completed;
      default:
        return styles.default;
    }
  };

  const taskStatusBgColor = getTaskStatusColor(props.taskStatus);

  return (
    <View style={styles.container}>
      <View style={styles.statusIndicator}>
        <Avatar.Icon
          size={22}
          icon={taskStatusIcon}
          style={taskStatusBgColor}
          color="#ffffff"
        />
        <View style={styles.dottedLine}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      <Card style={styles.taskCard}>
        <Card.Content>
          <Text style={styles.taskTitle}>{props.taskTitle}</Text>
          <View style={[styles.taskType, taskTypeStyle]}>
            <Text style={styles.taskTypeText}>{props.taskType}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskCard: {
    width: '80%',
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
  statusIndicator: {
    flexDirection: 'column', // Ensures vertical alignment
    alignItems: 'center', // Centers the bars horizontally
    marginRight: 20,
  },
  dottedLine: {
    width: 1,
    height: 40,
    flexDirection: 'column',
    alignItems: 'center',
  },
  dot: {
    width: 1,
    height: 5,
    backgroundColor: '#c6c6c6',
    borderRadius: 2,
    marginVertical: 2,
  },
  inProgress: {
    backgroundColor: '#ADD8E6',
  },
  completed: {
    backgroundColor: '#90EE90',
  },
});

export default TaskCard;
