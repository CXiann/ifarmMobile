import React, {useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView, Button, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Realm, {BSON} from 'realm';
import {realmContext} from '../../RealmContext';

import {Activity} from '../schemas/activity.schema';
import {Results} from 'realm/dist/bundle';

const ActivitiesScreen = () => {
  const {useRealm, useObject, useQuery} = realmContext;
  const realm = useRealm();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [option, setOption] = useState('');
  const allActivities = useQuery(Activity);
  const [activitiesToDisplay, setActivitiesToDisplay] = useState(allActivities);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Activity));
    });
  }, [realm, Activity]);

  useEffect(() => {
    const currentUserAllActivities = allActivities.filtered(
      'date >= $0 && date <= $1',
      new Date(new Date(startDate.setHours(0, 0, 0, 0)).toISOString()), //set earliest possible starting of date
      new Date(new Date(endDate.setHours(23, 59, 59, 999)).toISOString()), //set latest possible ending of date
    );
    setActivitiesToDisplay(currentUserAllActivities);
  }, [startDate, endDate, setActivitiesToDisplay]);

  console.log('ATD: ', activitiesToDisplay.length);

  const handleDateCalendar = (event, selectedDate) => {
    if (option) {
      setShow(false);
      option == 'start' ? setStartDate(selectedDate) : setEndDate(selectedDate);
    }
  };

  const showCalendar = selectedOption => {
    setOption(selectedOption);
    setShow(true);
  };

  return (
    <SafeAreaView>
      <TextInput
        label="From"
        value={startDate.toLocaleDateString()}
        // onChangeText={(startDate) => setDate(startDate)}
        onTouchStart={() => showCalendar('start')}
        style={{backgroundColor: '#ffffff'}}
      />
      <TextInput
        label="To"
        value={endDate.toLocaleDateString()}
        // onChangeText={(startDate) => setDate(startDate)}
        onTouchStart={() => showCalendar('end')}
        style={{backgroundColor: '#ffffff'}}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={option == 'start' ? startDate : endDate}
          mode="date"
          onChange={handleDateCalendar}
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
