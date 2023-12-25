import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, View, Keyboard} from 'react-native';
import {Button, Text, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import NumberInput from '../../components/numberInput';
import TaskInput from '../../components/taskInput';
import AutoCompleteAssigneeInput from '../../components/autocompleteAssigneeInput';

import Realm, {BSON} from 'realm';
import {useTheme} from 'react-native-paper';
import {realmContext} from '../../../RealmContext';
import {useGlobal} from '../../contexts/GlobalContext';
import {User} from '../../schemas/user.schema';
import {Task} from '../../schemas/task.schema';
import SnackbarBottom from '../../components/snackbarBottom';
import DateInput from '../../components/dateInput';

const TaskScreenAddForm = ({navigation}) => {
  const {useQuery, useRealm} = realmContext;
  const {userName, userId, farmId, farmName} = useGlobal();
  const realm = useRealm();
  const {colors} = useTheme();

  const [refAssignee, setRefAssignee] = useState(null);
  const [msg, setMsg] = useState(null);

  const users = useQuery(User);
  const currentFarmBSONID = new BSON.ObjectId(farmId);

  const filteredUsers = users.filtered('farms.@size > 0'); // Filter users with non-empty farms

  const allUsers = filteredUsers.filter(user => {
    return user.farms.some(farmId => farmId.equals(currentFarmBSONID));
  });

  const farmerUsers = allUsers.filter(user => user.role === 'farmer');

  const initialValueTasks = {
    title: '',
    farmId: farmId.toString(),
    date: new Date(),
    completed: false,
    farmName: {eng: farmName, cht: '', chs: ''},
    creatorId: userId.toString(),
    creatorName: {eng: userName, cht: '', chs: ''},
    assigneeId: '',
    assigneeName: {eng: '', cht: '', chs: ''},
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

  const setRefAssigneeFunction = useCallback(ref => {
    setRefAssignee(ref);
  }, []);

  const handleAddTask = () => {
    Keyboard.dismiss();
    console.log('dataForm: ', dataForm);
    if (dataForm.title && dataForm.assigneeId) {
      refAssignee?.current.clear();
      realm.write(() => {
        realm.create('notifications', {
          userId: dataForm.creatorId,
          userName: dataForm.creatorName,
          farmId: dataForm.farmId,
          farmName: dataForm.farmName,
          assigneeId: dataForm.assigneeId,
          assigneeName: dataForm.assigneeName,
          content: dataForm.title,
          date: new Date(dataForm['date'].toISOString()),
          createdAt: new Date(new Date().toISOString()),
          readUsers: [],
          category: 'task',
        });
        realm.create('tasks', {
          ...dataForm,
          title: dataForm['title'],
          date: new Date(dataForm['date'].toISOString()),
          assigneeId: dataForm['assigneeId'],
          assigneeName: dataForm['assigneeName'],
        });
        console.log('dataForm date: ', new Date(dataForm['date']));
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
      backgroundColor: colors.primaryContainer,
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

  return (
    <SafeAreaView style={styles.outter}>
      <View style={styles.topBar}>
        <IconButton
          icon="arrow-left"
          iconColor="black"
          size={25}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.topBarText}>
          <Text variant="titleLarge" style={{fontWeight: 700}}>
            {'Add Task'}
          </Text>
        </View>
      </View>
      <View style={styles.container}>
        <DateInput
          label={'Date'}
          dataForm={dataForm}
          setDataForm={setDataForm}
          minWidth={'100%'}
          dateFieldName={'date'}
        />
        <NumberInput
          label={'Task'}
          dataFormOption={'title'}
          dataForm={dataForm}
          setDataForm={setDataForm}
        />
        {/* <TaskInput
          label={'Task'}
          dataForm={dataForm}
          setDataForm={setDataForm}
        /> */}
        <AutoCompleteAssigneeInput
          label={'Assignee'}
          dataSet={allUsers}
          id={'_id'}
          title={'name'}
          dataForm={dataForm}
          setDataForm={setDataForm}
          initialValue={true}
          setRefAssigneeFunction={setRefAssigneeFunction}
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
      </View>
    </SafeAreaView>
  );
};

export default TaskScreenAddForm;
