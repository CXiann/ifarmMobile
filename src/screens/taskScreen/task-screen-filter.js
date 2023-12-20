import React, {useEffect, useState, useCallback} from 'react';
import {
  Modal,
  Portal,
  Text,
  useTheme,
  Button,
  IconButton,
  RadioButton,
  TextInput,
} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import DateInput from '../../components/dateInput';
import AutoCompleteAssigneeInput from '../../components/autocompleteAssigneeInput';
import {useGlobal} from '../../contexts/GlobalContext';
import {User} from '../../schemas/user.schema';
import {BSON} from 'realm';
import {realmContext} from '../../../RealmContext';

const TaskScreenFilter = ({navigation, route}) => {
  const {useQuery} = realmContext;
  const users = useQuery(User);
  const {userData, farmId, userId} = useGlobal();
  const currentFarmBSONID = new BSON.ObjectId(farmId);

  const filteredUsers = users.filtered('farms.@size > 0'); // Filter users with non-empty farms
  const allUsers = filteredUsers.filter(user => {
    return user.farms.some(farmId => farmId.equals(currentFarmBSONID));
  });

  const {colors} = useTheme();
  const {filterValues, setFilterValues, todayOrFuture} = route.params;
  const [tempForm, setTempForm] = useState(filterValues);

  const [radioButtonValue, setRadioButtonValue] = useState(
    filterValues['selectedStatus'],
  );

  const [refAssignee, setRefAssignee] = useState(null);

  const setRefAssigneeFunction = useCallback(ref => {
    setRefAssignee(ref);
  }, []);

  const handleRadioButtonClicked = newValue => {
    setRadioButtonValue(newValue);
    setTempForm({...tempForm, selectedStatus: newValue});
  };

  const styles = StyleSheet.create({
    container: {
      padding: 16,
      flex: 1,
    },
    topBar: {
      backgroundColor: colors.primaryContainer,
      maxHeight: '15%',
      minWidth: '100%',
      flexDirection: 'row',
    },
    topBarText: {
      justifyContent: 'center',
      marginLeft: '3%',
      color: 'black',
    },
    dateInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      marginBottom: 10,
    },
    radioButtonContainer: {
      margin: 10,
      padding: 16,
      borderRadius: 10,
      backgroundColor: '#E1E3D5',
    },
    radioTitle: {
      fontSize: 17,
      fontWeight: 'bold',
    },
    assigneeContainer: {
      paddingLeft: 0,
      paddingRight: 16,
    },
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <SafeAreaView style={styles.topBar}>
        <IconButton
          icon="arrow-left"
          iconColor="black"
          size={25}
          onPress={() => navigation.goBack()}
        />
        <SafeAreaView style={styles.topBarText}>
          <Text variant="titleLarge" style={{fontWeight: 700}}>
            Filter Tasks
          </Text>
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={styles.container}>
        {todayOrFuture === 'future' && (
          <SafeAreaView style={styles.dateInputContainer}>
            <DateInput
              label={'From'}
              dataForm={tempForm}
              setDataForm={setTempForm}
              dateFieldName={'startDate'}
              minWidth={'48%'}
            />
            <DateInput
              label={'To'}
              dataForm={tempForm}
              setDataForm={setTempForm}
              dateFieldName={'endDate'}
              minWidth={'48%'}
            />
          </SafeAreaView>
        )}
        <SafeAreaView style={styles.radioButtonContainer}>
          <Text style={styles.radioTitle}>Task Status</Text>
          <RadioButton.Group
            onValueChange={handleRadioButtonClicked}
            value={radioButtonValue}>
            <RadioButton.Item label="All" value="all" />
            <RadioButton.Item label="Pending" value="pending" />
            <RadioButton.Item label="Completed" value="completed" />
          </RadioButton.Group>
        </SafeAreaView>
        <SafeAreaView style={styles.assigneeContainer}>
          {userData['role'] === 'owner' && (
            <AutoCompleteAssigneeInput
              label={'Assignee'}
              dataSet={allUsers}
              id={'_id'}
              title={'name'}
              dataForm={tempForm}
              setDataForm={setTempForm}
              initialValue={true}
              allOption={true}
              setRefAssigneeFunction={setRefAssigneeFunction}
            />
          )}
        </SafeAreaView>
        <SafeAreaView
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Button
            style={{
              backgroundColor: 'red',
              marginBottom: 15,
              marginTop: 5,
              alignSelf: 'center',
              minWidth: '47%',
            }}
            labelStyle={{color: 'white'}}
            mode="contained"
            onPress={() => navigation.navigate('Task')}>
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: colors.primaryContainer,
              marginBottom: 15,
              marginTop: 5,
              alignSelf: 'center',
              minWidth: '47%',
            }}
            labelStyle={{color: colors.primary}}
            mode="contained"
            onPress={() => {
              setFilterValues({...filterValues, ...tempForm});
              console.log('filteredValues' + filterValues);
              navigation.navigate('Task');
            }}>
            Filter
          </Button>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default TaskScreenFilter;
