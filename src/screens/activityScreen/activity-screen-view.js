import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Card, Avatar, Text, useTheme} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';

import Realm from 'realm';
import {realmContext} from '../../../RealmContext';
import {useGlobal} from '../../contexts/GlobalContext';

import {Activity} from '../../schemas/activity.schema';
import {Activity_Props} from '../../constants/activity-props';
import DateInput from '../../components/dateInput';
import ActivityViewSortingButtons from '../../components/activityViewSortingButtons';

const ActivityScreenView = () => {
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const {userId, farmId, isLoading, setIsLoading} = useGlobal();
  const {colors} = useTheme();

  const defaultActProps = Activity_Props[9];
  const actProps = Activity_Props.filter(
    (item, index) => index <= Activity_Props.length - 2,
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 16,
    },
    dateInputContainer: {
      flexDirection: 'row',
    },
    card: {
      marginVertical: 5,
      minWidth: '100%',
    },
    cardTitle: {
      fontWeight: 'bold',
    },
    cardSubtitle: {
      color: colors.primary,
    },
    cardBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardBottomText: {
      color: 'red',
    },
    textInput: {
      marginHorizontal: 10,
      marginVertical: 5,
      backgroundColor: '#ffffff',
    },
  });

  const initialButtonValues = actProps.map(prop => {
    return prop.action;
  });

  const [startDate, setStartDate] = useState({date: new Date()});
  const [endDate, setEndDate] = useState({date: new Date()});
  const [selectedValue, setSelectedValue] = useState(initialButtonValues);

  const allActivities = useQuery(Activity);
  const [activitiesToDisplay, setActivitiesToDisplay] = useState(allActivities);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Activity));
    });
  }, [realm]);

  useEffect(() => {
    console.log('filtered');
    const currentUserAllActivities = allActivities.filtered(
      'date >= $0 && date <= $1 && userId CONTAINS $2 && farmId CONTAINS $3 && action IN $4',
      new Date(startDate['date'].setHours(0, 0, 0, 0)), //set earliest possible starting of date
      new Date(endDate['date'].setHours(23, 59, 59, 999)), //set latest possible ending of date
      userId.toString(),
      farmId.toString(),
      selectedValue,
    );
    setActivitiesToDisplay(currentUserAllActivities);
  }, [startDate, endDate, selectedValue, setActivitiesToDisplay]);

  console.log('ATD: ', activitiesToDisplay.length);

  const getActionFromActivityProp = action => {
    return actProps.filter(item => item.action == action)[0]?.icon;
  };

  const getBgColorFromActivityProp = action => {
    return actProps.filter(item => item.action == action)[0]?.bgColor;
  };
  console.log(selectedValue);
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.dateInputContainer}>
        <DateInput
          label={'From'}
          dataForm={startDate}
          setDataForm={setStartDate}
          minWidth={'48%'}
        />
        <DateInput
          label={'To'}
          dataForm={endDate}
          setDataForm={setEndDate}
          minWidth={'48%'}
        />
      </SafeAreaView>
      <ActivityViewSortingButtons
        selectedValue={selectedValue}
        setSelectedValue={setSelectedValue}
        props={actProps}
      />
      <FlatList
        removeClippedSubviews={true}
        data={activitiesToDisplay}
        initialNumToRender={6}
        keyExtractor={item => item._id.toString()} // Replace 'id' with the unique identifier in your data
        renderItem={({item}) => (
          <Card mode="contained" style={styles.card}>
            <Card.Title
              title={item?.action}
              titleStyle={styles.cardTitle}
              subtitle={item?.item.eng}
              subtitleStyle={styles.cardSubtitle}
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
              {item?.remarks && (
                <Text variant="titleLarge">{item?.remarks}</Text>
              )}
              {item?.unit && (
                <Text variant="titleLarge">
                  {item?.quantity + '' + item?.unit}
                </Text>
              )}
              <SafeAreaView style={styles.cardBottom}>
                <Text variant="bodyLarge" style={styles.cardBottomText}>
                  {'F' + item?.field + ' R' + item?.row}
                </Text>
                <Text variant="bodyLarge">
                  {item?.date.toLocaleDateString()}
                </Text>
              </SafeAreaView>
            </Card.Content>
          </Card>
        )}
      />
    </SafeAreaView>
  );
};

export default ActivityScreenView;
