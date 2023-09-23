import React, {useEffect, useState} from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';

import {View, StyleSheet, SafeAreaView, Button, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActivitiesScreen = () => {
  const [inputDate, setInputDate] = useState('');

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showCalendar = () => {
    setShow(true);
  };

  return (
    <SafeAreaView>
      <TextInput
        label="Date"
        value={date.toLocaleDateString()}
        // onChangeText={(date) => setDate(date)}
        onTouchStart={showCalendar}
        style={{backgroundColor: '#ffffff'}}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          onChange={onChange}
        />
      )}
    </SafeAreaView>
  );
};

export default ActivitiesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
