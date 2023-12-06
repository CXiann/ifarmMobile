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

const TaskScreenFilter = ({navigation, route}) => {
  const {colors} = useTheme();
  const {filterValues, setFilterValues} = route.params;

  const [radioButtonValue, setRadioButtonValue] = useState(
    filterValues['selectedStatus'],
  );

  const handleRadioButtonClicked = newValue => {
    setRadioButtonValue(newValue);
    setFilterValues({...filterValues, selectedStatus: newValue});
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
        <SafeAreaView style={styles.dateInputContainer}>
          <DateInput
            label={'From'}
            dataForm={filterValues}
            setDataForm={setFilterValues}
            dateFieldName={'startDate'}
            minWidth={'48%'}
            minimumDate={filterValues['startDate']}
          />
          <DateInput
            label={'To'}
            dataForm={filterValues}
            setDataForm={setFilterValues}
            dateFieldName={'endDate'}
            minWidth={'48%'}
            minimumDate={filterValues['startDate']}
          />
        </SafeAreaView>
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
