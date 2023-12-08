import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, Text, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskCard from '../../components/taskCard';
import DateCardCarousel from '../../components/dateCardCarousel';
import SnackbarBottom from '../../components/snackbarBottom';
import NotificationHandler from '../../components/notificationHandler';
import PushNotification, {Importance} from 'react-native-push-notification';

import Realm from 'realm';
import {realmContext} from '../../../RealmContext';
import {useGlobal} from '../../contexts/GlobalContext';

import {Task} from '../../schemas/task.schema';
import TaskProgressCard from '../../components/taskProgressCard';

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
  const todayYear = today.getUTCFullYear();
  const todayMonth = today.getUTCMonth();
  const todayDay = today.getUTCDate();

  const startDateFutureTask = new Date(todayYear, todayMonth, todayDay + 1);
  const endDateFutureTask = new Date(todayYear, todayMonth, todayDay + 7); // Add 7 to day to include all events on that day

  const [selectedDate, setSelectedDate] = useState(today);

  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const showSnackBar = () => setSnackBarVisible(true);
  const hideSnackBar = () => setSnackBarVisible(false);

  const handleChangeDate = date => {
    setSelectedDate(date);
    console.log('selectedDate: ', selectedDate);
  };

  const initialValues = {
    startDate: startDateFutureTask,
    endDate: endDateFutureTask,
    selectedStatus: 'all',
  };

  const [filterValues, setFilterValues] = useState(initialValues);

  // Get Task According to Date
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const {userId, farmId, setIsLoading, userData} = useGlobal();

  console.log("User's role: ", userData['role']);
  const [disableAddTask, setDisableAddTask] = useState(false);

  const allTasks = useQuery(Task);
  const [todayTasksToDisplay, setTodayTasksToDisplay] = useState([]);
  const [futureTasksToDisplay, setFutureTasksToDisplay] = useState([]);
  console.log('Current User Id: ', userId.toString());

  useEffect(() => {
    setIsLoading(true);
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Task));
    });
  }, [realm]);

  useEffect(() => {
    if (userData['role'] == 'farmer') {
      setDisableAddTask(true);
    }

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
    const currentUserTodayTasks = allTasks.filtered(
      'date >= $0 && date < $1 && assigneeId CONTAINS $2 && farmId CONTAINS $3',
      startDate,
      endDate,
      userId.toString(),
      farmId.toString(),
    );

    const currentUserFutureTasks = filterTasks();
    setFutureTasksToDisplay(currentUserFutureTasks);
    console.log(
      'Total currentUserFutureTasks: ',
      currentUserFutureTasks.length,
    );

    setTodayTasksToDisplay(currentUserTodayTasks);
    console.log('Total currentUserTodayTasks: ', currentUserTodayTasks.length);
    setIsLoading(false);
  }, [selectedDate, filterValues]);

  // const testPushNotification = () => {
  //   getChannels();
  //   console.log('Entered testPushNotification');
  //   PushNotification.localNotification({
  //     channelId: 'channel-1',
  //     title: 'TestNoti', // (optional)
  //     message: 'This is a Test Notification Message', // (required)
  //   });
  // };

  // const createChannel = () => {
  //   PushNotification.createChannel(
  //     {
  //       channelId: 'channel-1',
  //       channelName: 'Test Channel',
  //     },
  //     created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  //   );
  // };

  // const getChannels = () => {
  //   PushNotification.getChannels(function (channel_ids) {
  //     console.log('Channel-ids: ' + channel_ids); // ['channel_id_1']
  //   });
  // };

  const filterTasks = () => {
    let taskStatus;
    let taskAll = false;
    switch (filterValues['selectedStatus']) {
      case 'all':
        taskAll = true;
        break;

      case 'pending':
        taskStatus = false;
        break;

      case 'completed':
        taskStatus = true;
        break;

      default:
        break;
    }

    let currentUserFutureTasks = null;

    if (taskAll) {
      currentUserFutureTasks = allTasks.filtered(
        'date >= $0 && date < $1 && assigneeId CONTAINS $2 && farmId CONTAINS $3',
        filterValues['startDate'],
        filterValues['endDate'],
        userId.toString(),
        farmId.toString(),
      );
    } else {
      currentUserFutureTasks = allTasks.filtered(
        'date >= $0 && date < $1 &&  completed == $2 &&assigneeId CONTAINS $3 && farmId CONTAINS $4',
        filterValues['startDate'],
        filterValues['endDate'],
        taskStatus,
        userId.toString(),
        farmId.toString(),
      );
    }

    return currentUserFutureTasks;
  };

  const renderTaskCard = ({taskToDisplay}) => {
    if (taskToDisplay.length == 0) {
      return (
        <SafeAreaView>
          <Text style={{alignSelf: 'center', fontSize: 20, padding: 15}}>
            No Task
          </Text>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView>
        {taskToDisplay.map((task, i) => (
          <TaskCard
            key={i} // Add a unique key prop for each TaskCard
            taskTitle={task.title}
            taskType="Normal"
            taskCompleted={task.completed}
            taskDate={task.date}
            taskObject={task}
            showSnackBar={showSnackBar}
          />
        ))}
      </SafeAreaView>
    );
  };

  console.log('All Tasks: ' + allTasks.length);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <SafeAreaView style={styles.top}>
          <SafeAreaView style={styles.topContent}>
            <SafeAreaView style={styles.firstRow}>
              <SafeAreaView style={styles.textColumn}>
                <Text style={styles.dateTitle}>
                  {dayOfWeek[selectedDate.getDay()]},{' '}
                  {monthOfYear[selectedDate.getMonth()]}{' '}
                  {selectedDate.getDate()}
                </Text>
                <Text style={styles.taskCount}>
                  You have total {todayTasksToDisplay.length} tasks today
                </Text>
              </SafeAreaView>
              <SafeAreaView style={styles.buttonColumn}>
                <IconButton
                  icon="plus"
                  iconColor="white"
                  mode="contained-tonal"
                  size={20}
                  disabled={disableAddTask}
                  style={styles.addTaskButton}
                  accessibilityLabel="Add New Task"
                  onPress={() =>
                    navigation.navigate('Add New Task')
                  }></IconButton>
              </SafeAreaView>
            </SafeAreaView>
            {/* <DateCardCarousel handleChangeDate={handleChangeDate} /> */}
            <TaskProgressCard
              totalTasks={todayTasksToDisplay.length}
              completedTasks={
                todayTasksToDisplay.filter(task => task.completed).length
              }
              month={monthOfYear[selectedDate.getMonth()]}
              day={selectedDate.getDate()}
            />
          </SafeAreaView>
          <SafeAreaView style={styles.bottomToday}>
            <Text variant="titleLarge" style={styles.bottomTitle}>
              Today's Tasks
            </Text>
            {/* <IconButton
              icon="apple"
              iconColor="#035E7B"
              mode="contained"
              size={20}
              onPress={createChannel}></IconButton>
            <IconButton
              icon="plus"
              iconColor="#035E7B"
              mode="contained"
              size={20}
              onPress={testPushNotification}></IconButton> */}
            {renderTaskCard({taskToDisplay: todayTasksToDisplay})}
          </SafeAreaView>
          <SafeAreaView style={styles.bottomFuture}>
            <SafeAreaView style={{flexDirection: 'row'}}>
              <Text variant="titleLarge" style={styles.bottomTitle}>
                Future Tasks
              </Text>
              <Button
                icon="filter-variant"
                mode="elevated"
                style={styles.filterButton}
                onPress={() =>
                  navigation.navigate('Filter Task', {
                    filterValues: filterValues,
                    setFilterValues: setFilterValues,
                  })
                }>
                Filter
              </Button>
            </SafeAreaView>
            {renderTaskCard({taskToDisplay: futureTasksToDisplay})}
          </SafeAreaView>
        </SafeAreaView>
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
  container: {
    backgroundColor: 'white',
    height: '100%',
  },
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
  },
  top: {
    backgroundColor: '#4CB963',
    height: '100%',
  },
  topContent: {
    padding: 15,
  },
  bottomToday: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 40,
  },
  bottomFuture: {
    marginTop: 30,
    backgroundColor: '#ffffff',
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
  filterButton: {
    alignSelf: 'center',
    marginLeft: 20,
    marginBottom: 10,
  },
});

export default TaskScreenMain;
