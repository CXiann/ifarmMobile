import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, IconButton, MD3Colors, Appbar} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateInput from '../../components/dateInput';
import {useGlobal} from '../../contexts/GlobalContext';
import TaskInput from '../../components/taskInput';
import AssigneeInput from '../../components/assigneeInput';

const TaskScreenAddForm = ({navigation}) => {
  const {userId, farmId} = useGlobal();
  const initialValueActivities = {
    userId: userId.toString(),
    userName: {},
    farmId: farmId.toString(),
    farmName: {},
    date: new Date(),
    createdAt: new Date(new Date().toISOString()),
  };
  const [dataForm, setDataForm] = useState(initialValueActivities);

  return (
    <View>
      {/* <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Task_Screen');
          }}
        />
        <Appbar.Content title="Add New Task" />
      </Appbar.Header> */}
      <SafeAreaView style={styles.container}>
        <DateInput label={'Date'} data={dataForm} setData={setDataForm} />
        <TaskInput label={'Task'} />
        <AssigneeInput label={'Assignee'} />
        <Button
          mode="contained"
          style={styles.button}
          onPress={() => console.log('Added New Task')}>
          Add
        </Button>
      </SafeAreaView>
    </View>
  );
};

export default TaskScreenAddForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  button: {marginVertical: 10, minWidth: '100%'},
});
