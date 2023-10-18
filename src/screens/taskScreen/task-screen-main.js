import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, IconButton, MD3Colors} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateCard from '../../components/dateCard';

import DateInput from '../../components/dateInput';
import FieldInput from '../../components/fieldInput';
import NumberInput from '../../components/numberInput';
import AutocompleteItemInput from '../../components/autocompleteItemInput';
import AutocompleteUnitInput from '../../components/autocompleteUnitInput';
import TaskCard from '../../components/taskCard';
import TaskStatusIndicator from '../../components/taskStatusIndicator';

const TaskScreenMain = ({navigation}) => {
  // const initialValueTasks = {
  //   userId: global.currentUserId.toString(),
  //   userName: {},
  //   farmId: global.currentUserSelectedFarmId.toString(),
  //   farmName: {},
  //   date: new Date(),
  //   createdAt: new Date(new Date().toISOString()),
  //   __v: 0,
  // };

  // const [dataForm, setDataForm] = useState(initialValueTasks);
  const dayOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const monthOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const today = new Date();
  const [todayDate, setTodayDate] = useState({
    getDay: today.getDay(),
    getDate: today.getDate(),
    getMonth: today.getMonth(),
    getFullYear: today.getFullYear(),
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* <DateInput label={'Date'} data={dataForm} setData={setDataForm} /> */}
      <View style={styles.top}>
        <View style={styles.topContent}>
          <View style={styles.firstRow}>
            <View style={styles.textColumn}>
              <Text style={styles.dateTitle}>
                {dayOfWeek[todayDate.getDay]}, {monthOfYear[todayDate.getMonth]}{' '}
                {todayDate.getDate}
              </Text>
              <Text style={styles.taskCount}>You have total 3 tasks today</Text>
            </View>
            <View style={styles.buttonColumn}>
              <IconButton
                icon="plus"
                mode="contained-tonal"
                iconColor={MD3Colors.neutral100}
                containerColor={MD3Colors.tertiary80}
                size={20}
                style={styles.addTaskButton}
                accessibilityLabel="Add New Task"
                onPress={() =>
                  navigation.navigate('Add_Task_Screen')
                }></IconButton>
            </View>
          </View>
          <DateCard date={todayDate.getDate} day={todayDate.getDay} />
        </View>
        <View style={styles.bottom}>
          <Text variant="titleLarge" style={styles.bottomTitle}>
            Today's Tasks
          </Text>
          <View style={styles.taskRow}>
            {/* <TaskStatusIndicator /> */}
            <TaskCard taskTitle="Apply 50kg Fertilizers" taskType="Urgent" />
            <TaskCard taskTitle="Prune the grass" taskType="Normal" />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  textInput: {
    // marginHorizontal: 10,
    marginVertical: 5,
    // backgroundColor: '#ffffff',
  },
  button: {marginVertical: 10},
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTitle: {
    fontSize: 18,
    marginTop: 5,
    color: '#ffffff',
  },
  taskCount: {
    fontSize: 14,
    marginTop: 3,
    marginBottom: 20,
    color: '#d3d3d3',
    fontWeight: 'ultralight',
  },
  textColumn: {
    flexDirection: 'column',
  },
  buttonColumn: {
    alignContent: 'flex-end',
  },
  addTaskButton: {
    alignSelf: 'center',
    width: 35,
    height: 35,
    borderRadius: 15,
  },
  top: {
    backgroundColor: 'green',
    height: '100%',
  },
  topContent: {
    padding: 15,
  },
  bottom: {
    backgroundColor: 'white',
    height: '100%',
    padding: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  bottomTitle: {
    marginTop: 8,
    marginBottom: 15,
    fontWeight: 'bold',
  },
});

export default TaskScreenMain;
