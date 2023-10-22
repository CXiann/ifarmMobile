import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskCard from '../../components/taskCard';
import DateCardCarousel from '../../components/dateCardCarousel';

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
  console.log("Today's date: ", today);

  const [selectedDate, setSelectedDate] = useState({
    getDay: today.getDay(),
    getDate: today.getDate(),
    getMonth: today.getMonth(),
    getFullYear: today.getFullYear(),
  });

  const handleChangeDate = date => {
    setSelectedDate({
      getDay: date.getDay(),
      getDate: date.getDate(),
      getMonth: date.getMonth(),
      getFullYear: date.getFullYear(),
    });
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
    const currentUserAllTasks = allTasks.filtered(
      'date == $0 && assigneeId CONTAINS $1 && farmId CONTAINS $2',
      new Date(
        selectedDate.getFullYear,
        selectedDate.getMonth,
        selectedDate.getDate,
      ),
      userId.toString(),
      farmId.toString(),
    );
    setTasksToDisplay(currentUserAllTasks);
    console.log('currentUserAllTasks: ', currentUserAllTasks);
    setIsLoading(false);
  }, [selectedDate]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topContent}>
          <View style={styles.firstRow}>
            <View style={styles.textColumn}>
              <Text style={styles.dateTitle}>
                {dayOfWeek[selectedDate.getDay]},{' '}
                {monthOfYear[selectedDate.getMonth]} {selectedDate.getDate}
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
            />
          ))}
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
