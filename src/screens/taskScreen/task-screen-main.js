import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, Text, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskCard from '../../components/taskCard';
import DateCardCarousel from '../../components/dateCardCarousel';
import SnackbarBottom from '../../components/snackbarBottom';

import Realm from 'realm';
import {realmContext} from '../../../RealmContext';
import {useGlobal} from '../../contexts/GlobalContext';

import {Task} from '../../schemas/task.schema';

const TaskScreenMain = ({navigation}) => {
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

  const [selectedDate, setSelectedDate] = useState(today);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const showSnackBar = () => setSnackBarVisible(true);
  const hideSnackBar = () => setSnackBarVisible(false);

  const handleChangeDate = date => {
    setSelectedDate(date);
    console.log('selectedDate: ', selectedDate);
  };

  // Get Task According to Date
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const {userId, farmId, setIsLoading} = useGlobal();

  const allTasks = useQuery(Task);
  const [tasksToDisplay, setTasksToDisplay] = useState(allTasks);
  console.log('Current User Id: ', userId.toString());

  useEffect(() => {
    setIsLoading(true);
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Task));
    });
  }, [realm]);

  useEffect(() => {
    setIsLoading(true);
    const selectedDateChangeToDateType = new Date(selectedDate);

    // Extract year, month, and day from the selected date
    const selectedYear = selectedDateChangeToDateType.getUTCFullYear();
    const selectedMonth = selectedDateChangeToDateType.getUTCMonth();
    const selectedDay = selectedDateChangeToDateType.getUTCDate();

    // Calculate the start and end dates for the selected day
    const startDate = new Date(selectedYear, selectedMonth, selectedDay);
    const endDate = new Date(selectedYear, selectedMonth, selectedDay + 1); // Add 1 to day to include all events on that day

    // Filter tasks in the database using a range for the date field
    const currentUserAllTasks = allTasks.filtered(
      'date >= $0 && date < $1 && assigneeId CONTAINS $2 && farmId CONTAINS $3',
      startDate,
      endDate,
      userId.toString(),
      farmId.toString(),
    );

    setTasksToDisplay(currentUserAllTasks);
    console.log('Total currentUserAllTasks: ', currentUserAllTasks.length);
    setIsLoading(false);
  }, [selectedDate]);

  console.log('All Tasks: ' + allTasks.length);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.top}>
          <View style={styles.topContent}>
            <View style={styles.firstRow}>
              <View style={styles.textColumn}>
                <Text style={styles.dateTitle}>
                  {dayOfWeek[selectedDate.getDay()]},{' '}
                  {monthOfYear[selectedDate.getMonth()]}{' '}
                  {selectedDate.getDate()}
                </Text>
                <Text style={styles.taskCount}>
                  You have total {tasksToDisplay.length} tasks today
                </Text>
              </View>
              <View style={styles.buttonColumn}>
                <IconButton
                  icon="plus"
                  iconColor="white"
                  mode="contained-tonal"
                  size={20}
                  style={styles.addTaskButton}
                  accessibilityLabel="Add New Task"
                  onPress={() =>
                    navigation.navigate('Add New Task')
                  }></IconButton>
              </View>
            </View>
            <DateCardCarousel handleChangeDate={handleChangeDate} />
          </View>
          <View style={styles.bottom}>
            <Text variant="titleLarge" style={styles.bottomTitle}>
              Today's Tasks
            </Text>
            {tasksToDisplay.map((task, i) => (
              <TaskCard
                key={i} // Add a unique key prop for each TaskCard
                taskTitle={task.title}
                taskType="Normal"
                taskCompleted={task.completed}
                taskObject={task}
                showSnackBar={showSnackBar}
              />
            ))}
          </View>
        </View>
        <SnackbarBottom
          label={'Dismiss'}
          title={'Successfully Mark Task as Completed'}
          visible={snackBarVisible}
          dismiss={hideSnackBar}
        />
      </ScrollView>
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
    backgroundColor: '#035E7B',
    alignSelf: 'center',
    width: 35,
    height: 35,
    borderRadius: 15,
  },
  top: {
    backgroundColor: '#4CB963',
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
  taskRow: {
    flexDirection: 'row',
    spaceBetween: 0,
  },
  taskStatusColumn: {
    flexDirection: 'column',
    alignContent: 'center',
  },
  taskCardColumn: {
    flexDirection: 'column',
    width: '90%',
  },
});

export default TaskScreenMain;
