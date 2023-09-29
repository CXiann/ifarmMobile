import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput, Card, Avatar, Text} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {FlatList} from 'react-native-gesture-handler';

import Realm from 'realm';
import {realmContext} from '../../../RealmContext';

import {Activity} from '../../schemas/activity.schema';
import {Activity_Props as actProps} from '../../constants/activity-props';

const ActivityScreenView = () => {
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
        mode="outlined"
        value={startDate.toLocaleDateString()}
        onTouchStart={() => showCalendar('start')}
        style={styles.textInput}
      />
      <TextInput
        label="To"
        mode="outlined"
        value={endDate.toLocaleDateString()}
        onTouchStart={() => showCalendar('end')}
        style={styles.textInput}
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
    </SafeAreaView>
  );
};

export default ActivityScreenView;

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
  textInput: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#ffffff',
  },
});
