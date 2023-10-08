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
import DateInput from '../../components/dateInput';

const ActivityScreenView = () => {
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();

  const defaultActProps = actProps[9];

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

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
      'date >= $0 && date <= $1 && userId CONTAINS $2 && farmId CONTAINS $3',
      new Date(startDate.setHours(0, 0, 0, 0)), //set earliest possible starting of date
      new Date(endDate.setHours(23, 59, 59, 999)), //set latest possible ending of date
      global.currentUserId.toString(),
      global.currentUserSelectedFarmId.toString(),
    );
    setActivitiesToDisplay(currentUserAllActivities);
  }, [startDate, endDate, setActivitiesToDisplay]);

  console.log('ATD: ', activitiesToDisplay.length);

  const getActionFromActivityProp = action => {
    return actProps.filter(item => item.action == action)[0]?.icon;
  };

  const getBgColorFromActivityProp = action => {
    return actProps.filter(item => item.action == action)[0]?.bgColor;
  };

  return (
    <SafeAreaView>
      <DateInput label={'From'} data={startDate} setData={setStartDate} />
      <DateInput label={'To'} data={endDate} setData={setEndDate} />
      <FlatList
        data={activitiesToDisplay}
        initialNumToRender={7}
        keyExtractor={item => item._id.toString()} // Replace 'id' with the unique identifier in your data
        renderItem={({item}) => (
          <Card mode="contained" style={styles.card}>
            <Card.Title
              title={item?.action}
              subtitle={item?.item.eng}
              left={props => (
                <Avatar.Icon
                  {...props}
                  icon={
                    getActionFromActivityProp(item.action) ||
                    defaultActProps.icon
                  }
                  style={{
                    backgroundColor:
                      getBgColorFromActivityProp(item.action) ||
                      defaultActProps.bgColor,
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
