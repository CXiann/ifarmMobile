import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const TaskProgressCard = ({totalTasks, completedTasks, month, day}) => {
  const progressPercentage = Math.round((completedTasks / totalTasks) * 100);

  return (
    <SafeAreaView style={styles.card}>
      <SafeAreaView style={styles.leftContainer}>
        <Text style={styles.totalTasks}>Task Progress</Text>
        <Text style={styles.labelTask}>
          {completedTasks}/{totalTasks} Tasks Completed today
        </Text>
        <SafeAreaView style={styles.calendarRow}>
          <IconButton
            icon="calendar-month"
            size={17}
            iconColor="white"
            style={styles.calendarIcon}
          />
          <Text style={styles.calendarText}>
            {month} {day}
          </Text>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.rightContainer}>
        <Text style={styles.progressPercentage}>{progressPercentage}%</Text>
        <Text style={styles.label}>Completed</Text>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  leftContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '65%',
    backgroundColor: '#FF9F1C',
    padding: 16,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rightContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
    backgroundColor: '#FDFFFC',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 16,
  },
  totalTasks: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9F1C',
  },
  label: {
    fontSize: 13,
    marginTop: 8,
  },
  labelTask: {
    fontSize: 13,
    marginTop: 4,
    color: '#F6F6F6',
  },
  calendarRow: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  calendarIcon: {
    margin: 0,
  },
  calendarText: {
    fontSize: 15,
    color: '#fff',
  },
});

export default TaskProgressCard;
