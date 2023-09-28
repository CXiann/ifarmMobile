import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, Card, Avatar} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Realm, {BSON} from 'realm';
import {realmContext} from '../../RealmContext';

import {Activity} from '../schemas/activity.schema';
import {Activity_Props as actProps} from '../constants/activity-props';

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

  const getActionFromActivityProp = action => {
    return actProps.filter(item => item.action == action)[0].icon;
  };

  const getBgColorFromActivityProp = action => {
    return actProps.filter(item => item.action == action)[0].bgColor;
  };

  return (
    <SafeAreaView>
      <TextInput
        label="From"
        value={startDate.toLocaleDateString()}
        onTouchStart={() => showCalendar('start')}
        style={{backgroundColor: '#ffffff'}}
      />
      <TextInput
        label="To"
        value={endDate.toLocaleDateString()}
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
      <FlatList
        data={activitiesToDisplay}
        keyExtractor={item => item._id.toString()} // Replace 'id' with the unique identifier in your data
        renderItem={({item}) => (
          <Card mode="contained" style={styles.card}>
            <Card.Title
              title={item?.action}
              subtitle={item?.item.eng}
              left={props => (
                <Avatar.Icon
                  {...props}
                  icon={getActionFromActivityProp(item.action)}
                  style={{
                    backgroundColor: getBgColorFromActivityProp(item.action),
                  }}
                />
              )}
            />
            <Card.Content>
              <Text variant="titleLarge">
                {item?.quantity + ' ' + item?.unit}
              </Text>
              <Text variant="bodyLarge">
                {'F' + item?.field + ' R' + item?.row}
              </Text>
            </Card.Content>
          </Card>
        )}
      />
      {/* <Card mode="contained" style={styles.card}>
        <Card.Title
          title={activitiesToDisplay[0]?.action}
          subtitle={activitiesToDisplay[0]?.item.eng}
          left={props => (
            <Avatar.Icon {...props} icon='shovel' />
          )}
        />
        <Card.Content>
          <Text variant="titleLarge">
            {activitiesToDisplay[0]?.quantity +
              ' ' +
              activitiesToDisplay[0]?.unit}
          </Text>
          <Text variant="bodyLarge">
            {'F' +
              activitiesToDisplay[0]?.field +
              ' R' +
              activitiesToDisplay[0]?.row}
          </Text>
        </Card.Content>
      </Card> */}
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
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
