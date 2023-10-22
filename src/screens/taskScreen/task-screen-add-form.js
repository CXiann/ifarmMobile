import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateInput from '../../components/dateInput';
import TaskInput from '../../components/taskInput';
import AutoCompleteAssigneeInput from '../../components/autocompleteAssigneeInput';

import Realm, {BSON} from 'realm';
import {realmContext} from '../../../RealmContext';
import {useGlobal} from '../../contexts/GlobalContext';
import {User} from '../../schemas/user.schema';
import {Task} from '../../schemas/task.schema';
import SnackbarBottom from '../../components/snackbarBottom';

const TaskScreenAddForm = ({navigation}) => {
  const {useQuery, useRealm} = realmContext;
  const {userData, farmId, userId} = useGlobal();
  const realm = useRealm();

  const users = useQuery(User);
  const [selectedUser, setSelectedUser] = useState({id: '', title: ''});

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(User));
    });
    console.log('Total users: ', users.length);
  }, [realm]);

  const currentFarmBSONID = new BSON.ObjectId(farmId);

  const filteredUsers = users.filtered('farms.@size > 0'); // Filter users with non-empty farms

  const allUsers = filteredUsers.filter(user => {
    return user.farms.some(farmId => farmId.equals(currentFarmBSONID));
  });
  console.log('Current Farm All Users: ', allUsers?.length);

  const farmerUsers = allUsers.filter(user => user.role === 'farmer');

  const initialValueTasks = {
    title: '',
    farmId: farmId.toString(),
    date: new Date(),
    completed: false,
    farmName: {},
    creatorId: userId.toString(),
    creatorName: {},
    assigneeId: '',
    assigneeName: {},
    createdAt: new Date(new Date().toISOString()),
    __v: 0,
  };
  const [dataForm, setDataForm] = useState(initialValueTasks);
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Task));
    });
  }, [realm]);

  const handleAddTask = () => {
    realm.write(() => {
      realm.create('tasks', {
        ...dataForm,
        title: dataForm['title'],
        date: new Date(dataForm['date'].toISOString()),
        assigneeId: dataForm['assigneeId'],
        assigneeName: dataForm['assigneeName'],
      });
    });
    console.log('Successfully created data');
    setDataForm(initialValueTasks);
    setVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <DateInput label={'Date'} data={dataForm} setData={setDataForm} />
      <TaskInput label={'Task'} dataForm={dataForm} setDataForm={setDataForm} />
      <AutoCompleteAssigneeInput
        label={'Assignee'}
        dataSet={allUsers}
        id={'_id'}
        title={'name'}
        dataForm={dataForm}
        setDataForm={setDataForm}
        initialValue={true}
      />
      <Button mode="contained" style={styles.button} onPress={handleAddTask}>
        Add
      </Button>
      <SnackbarBottom
        label={'Dismiss'}
        title={'Successfully Created Task.'}
        visible={visible}
        dismiss={onDismissSnackBar}
      />
    </SafeAreaView>
  );
};

export default TaskScreenAddForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
  },
  button: {marginVertical: 10, minWidth: '100%'},
});
