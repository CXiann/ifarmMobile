import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SafeAreaView} from 'react-native-safe-area-context';

import {realmContext} from '../../../RealmContext';

import {Activity} from '../../schemas/activity.schema';

const ActivityScreenAddForm = () => {
  const {useRealm, useObject, useQuery} = realmContext;

  const realm = useRealm();
  // const readFoliars = useQuery(Foliar);

  const [date, setDate] = useState(new Date());
  const [fieldNumber, setFieldNumber] = useState(0);
  const [row, setRow] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Activity));
    });
  }, [realm]);

  const handleAddActivity = () => {
    realm.write(() => {
      const initialValueActivities = {
        userId: '',
        userName: {},
        farmId: '',
        farmName: {},
        row: 0,
        field: 0,
        quantity: 0,
        price: 0,
        unit: '',
        item: {},
        action: '',
        date: new Date(),
        isActual: true,
        originalQuantity: 0,
        convertUnit: '',
        convertQuantity: 0,
        createdAt: new Date(new Date().toISOString()),
        __v: 0,
      };
      realm.create('activities', {
        ...initialValueActivities,
        userId: global.currentUserId.toString(),
        farmId: global.currentUserSelectedFarmId.toString(),
        row: parseInt(row),
        field: parseInt(fieldNumber),
        action: 'Aerating',
        date: new Date(date.toISOString()),
      });
      console.log('Successfully created data');
    });
  };

  const handleDateCalendar = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
  };

  const showCalendar = () => {
    setShow(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        label="Date"
        mode="outlined"
        value={date.toLocaleDateString()}
        onTouchStart={() => showCalendar()}
        style={styles.textInput}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          onChange={handleDateCalendar}
        />
      )}
      <TextInput
        label="Field Number"
        mode="outlined"
        value={fieldNumber.toString()}
        onChangeText={field => setFieldNumber(field)}
        right={
          <TextInput.Icon
            icon="chevron-up"
            onPress={() => {
              setFieldNumber(fieldNumber + 1);
            }}
          />
        }
        left={
          <TextInput.Icon
            icon="chevron-down"
            onPress={() => {
              setFieldNumber(fieldNumber - 1);
            }}
          />
        }
        style={styles.textInput}></TextInput>
      <TextInput
        label="Row"
        mode="outlined"
        value={row}
        onChangeText={row => setRow(row)}
        style={styles.textInput}></TextInput>
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleAddActivity}>
        Add
      </Button>
    </SafeAreaView>
  );
};

export default ActivityScreenAddForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  textInput: {
    // marginHorizontal: 10,
    marginVertical: 5,
    // backgroundColor: '#ffffff',
  },
  button: {marginVertical: 10},
});
