import React, {useState, useEffect} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {Button, Text, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskCard from '../../components/taskCard';
import SnackbarBottom from '../../components/snackbarBottom';
import {FlatList} from 'react-native-gesture-handler';
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
    assigneeId: '',
    assigneeName: {},
    selectAllUsers: false,
  };

  const [filterTodayValues, setFilterTodayValues] = useState(initialValues);
  const [filterFutureValues, setFilterFutureValues] = useState(initialValues);

  // Get Task According to Date
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const {userId, farmId, setIsLoading, userData} = useGlobal();

  console.log("User's role: ", userData['role']);
  const [disableAddTask, setDisableAddTask] = useState(false);

  const allTasks = useQuery(Task);
  const [todayTasksToDisplay, setTodayTasksToDisplay] = useState([]);
  const [allTasksToDisplay, setAllTasksToDisplay] = useState([]);
  console.log('Current User Id: ', userId.toString());

  // useEffect(() => {
  //   setIsLoading(true);
  //   realm.subscriptions.update(mutableSubs => {
  //     // Create subscription for filtered results.
  //     mutableSubs.add(realm.objects(Task));
  //   });
  // }, [realm]);

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

    const currentUserTaskFilteredByRole = filterTasksAccordingToRole();
    // Filter tasks in the database using a range for the date field
    let currentUserTodayTasks = currentUserTaskFilteredByRole
      .filtered('date >= $0 && date < $1', startDate, endDate)
      .sorted('date');

    currentUserTodayTasks = filterTasks(
      currentUserTodayTasks,
      filterTodayValues,
    );

    let currentUserAllTasks = currentUserTaskFilteredByRole
      .filtered(
        'date >= $0 && date < $1',
        filterFutureValues['startDate'],
        filterFutureValues['endDate'],
      )
      .sorted('date');

    currentUserAllTasks = filterTasks(currentUserAllTasks, filterFutureValues);

    setAllTasksToDisplay(currentUserAllTasks);
    console.log('Total filteredTasks: ', currentUserAllTasks.length);

    setTodayTasksToDisplay(currentUserTodayTasks);
    console.log('Total currentUserTodayTasks: ', currentUserTodayTasks.length);

    setIsLoading(false);
  }, [selectedDate, filterTodayValues, filterFutureValues]);

  const filterTasksAccordingToRole = () => {
    if (userData['role'] == 'farmer') {
      return allTasks.filtered(
        'assigneeId CONTAINS $0 && farmId CONTAINS $1',
        userId.toString(),
        farmId.toString(),
      );
    } else if (userData['role'] == 'owner') {
      return allTasks.filtered('farmId CONTAINS $0', farmId.toString());
    }
  };

  const filterTasks = (currentUserTasks, filterValues) => {
    console.log('Filtered Role: ' + filterValues['assigneeId']);
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

    let filteredTasks = currentUserTasks;

    if (!taskAll) {
      filteredTasks = currentUserTasks.filtered('completed == $0', taskStatus);
    }

    console.log(
      'filterValues selectAllUsers: ' + filterValues['selectAllUsers'],
    );

    if (
      userData['role'] == 'owner' &&
      filterValues['assigneeId'] != '' &&
      filterValues['selectAllUsers'] == false
    ) {
      filteredTasks = filteredTasks.filtered(
        'assigneeId CONTAINS $0',
        filterValues['assigneeId'].toString(),
      );
    }

    return filteredTasks;
  };

  const renderTaskCard = ({taskToDisplay}) => {
    if (taskToDisplay.length == 0) {
      return (
        <View>
          <Text style={{alignSelf: 'center', fontSize: 20, padding: 15}}>
            No Task
          </Text>
        </View>
      );
    }

    return (
      <View>
        <FlatList
          ListHeaderComponent={<View />} // Empty view to avoid warning
          ListFooterComponent={<View />}
          removeClippedSubviews={true}
          data={taskToDisplay}
          initialNumToRender={4}
          keyExtractor={item => item._id.toString()} // Replace 'id' with the unique identifier in your data
          renderItem={({item}) => (
            <TaskCard
              taskType="Normal"
              taskObject={item}
              showSnackBar={showSnackBar}
            />
          )}
        />
        {/* {taskToDisplay
          .slice() // Create a shallow copy of the array to avoid mutating the original array
          .map((task, i) => (
            <TaskCard
              key={i}
              taskType="Normal"
              taskObject={task}
              showSnackBar={showSnackBar}
            />
          ))} */}
      </View>
    );
  };

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
                  Total {todayTasksToDisplay.length} tasks today
                </Text>
              </View>
              <View style={styles.buttonColumn}>
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
              </View>
            </View>
            <TaskProgressCard
              totalTasks={todayTasksToDisplay.length}
              completedTasks={
                todayTasksToDisplay.filter(task => task.completed).length
              }
              month={monthOfYear[selectedDate.getMonth()]}
              day={selectedDate.getDate()}
            />
          </View>
          <View style={styles.bottomToday}>
            <View style={{flexDirection: 'row'}}>
              <Text variant="titleLarge" style={styles.bottomTitle}>
                Today's Tasks
              </Text>
              <Button
                icon="filter-variant"
                mode="elevated"
                style={styles.filterButton}
                onPress={() =>
                  navigation.navigate('Filter Task', {
                    filterValues: filterTodayValues,
                    setFilterValues: setFilterTodayValues,
                    todayOrFuture: 'today',
                  })
                }>
                Filter
              </Button>
            </View>
            {renderTaskCard({taskToDisplay: todayTasksToDisplay})}
          </View>
          <View style={styles.bottomFuture}>
            <View style={{flexDirection: 'row'}}>
              <Text variant="titleLarge" style={styles.bottomTitle}>
                All Tasks
              </Text>
              <Button
                icon="filter-variant"
                mode="elevated"
                style={styles.filterButton}
                onPress={() =>
                  navigation.navigate('Filter Task', {
                    filterValues: filterFutureValues,
                    setFilterValues: setFilterFutureValues,
                    todayOrFuture: 'future',
                  })
                }>
                Filter
              </Button>
            </View>
            {renderTaskCard({taskToDisplay: allTasksToDisplay})}
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
