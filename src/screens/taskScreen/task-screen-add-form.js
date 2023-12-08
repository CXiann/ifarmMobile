import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Keyboard} from 'react-native';
import {Button, Text, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import TaskInput from '../../components/taskInput';
import AutoCompleteAssigneeInput from '../../components/autocompleteAssigneeInput';

import Realm, {BSON} from 'realm';
import {realmContext} from '../../../RealmContext';
import {useGlobal} from '../../contexts/GlobalContext';
import {User} from '../../schemas/user.schema';
import {Task} from '../../schemas/task.schema';
import SnackbarBottom from '../../components/snackbarBottom';
import DateInput from '../../components/dateInput';

const TaskScreenAddForm = ({navigation}) => {
  const {useQuery, useRealm} = realmContext;
  const {userData, farmId, userId} = useGlobal();
  const realm = useRealm();

  const users = useQuery(User);
  const [selectedUser, setSelectedUser] = useState({id: '', title: ''});
  const [msg, setMsg] = useState(null);

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
    Keyboard.dismiss();
    console.log('dataForm: ', dataForm);
    if (dataForm.title && dataForm.assigneeId) {
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
      setMsg('Successfully created data.');
    } else {
      console.log('Error');
      setMsg('Incorrect Input Data.');
    }

    setVisible(true);
  };

  return (
    <SafeAreaView style={styles.outter}>
      <SafeAreaView style={styles.topBar}>
        <IconButton
          icon="arrow-left"
          iconColor="black"
          size={25}
          onPress={() => navigation.goBack()}
        />
        <SafeAreaView style={styles.topBarText}>
          <Text variant="titleLarge" style={{fontWeight: 700}}>
            {'Add Task'}
          </Text>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        <DateInput
          label={'Date'}
          dataForm={dataForm}
          setDataForm={setDataForm}
          minWidth={'100%'}
          dateFieldName={'date'}
        />
        <TaskInput
          label={'Task'}
          dataForm={dataForm}
          setDataForm={setDataForm}
        />
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
          title={msg}
          visible={visible}
          textColor={
            msg == 'Successfully created data.' ? 'yellowgreen' : 'red'
          }
          dismiss={onDismissSnackBar}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default TaskScreenAddForm;

const styles = StyleSheet.create({
  outter: {
    flex: 1,
  },
  container: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
  },
  button: {marginVertical: 10, minWidth: '100%'},
  topBar: {
    backgroundColor: '#4CB963',
    maxHeight: '15%',
    minWidth: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  topBarText: {
    justifyContent: 'center',
    marginLeft: '3%',
    color: 'black',
  },
});
