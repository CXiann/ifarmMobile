import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Card,
  Avatar,
  Text,
  useTheme,
  Button,
  Portal,
  Modal,
} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';

import Realm from 'realm';
import {realmContext} from '../../../RealmContext';
import {useGlobal} from '../../contexts/GlobalContext';

import {Activity} from '../../schemas/activity.schema';
import {Activity_Props} from '../../constants/activity-props';
import {Item_Props as itemProps} from '../../constants/item-props';
import DateInput from '../../components/dateInput';
import ActivityScreenViewSort from './activity-screen-view-sort';
import AutocompleteItemInput from '../../components/autocompleteItemInput';

const ActivityScreenView = () => {
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const {userId, farmId, isLoading, setIsLoading} = useGlobal();
  console.log('View: ', farmId);
  const {colors} = useTheme();

  const defaultActProps = Activity_Props[9];
  const actProps = Activity_Props.filter(
    (item, index) => index <= Activity_Props.length - 2,
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    dateInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    filterButton: {
      backgroundColor: colors.primaryContainer,
      marginVertical: 10,
    },
    filterLabel: {
      color: colors.onSurface,
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

  const initialItemValues = itemProps.map(prop => {
    return prop.options;
  });

  const initialValues = {
    startDate: new Date(),
    endDate: new Date(),
    selectedValue: initialButtonValues,
    options: initialItemValues,
  };

  const [dataForm, setDataForm] = useState(initialValues);
  const [visible, setVisible] = useState(false);
  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);

  const farm = useQuery(Activity);

  useEffect(() => {
    setIsLoading(true);
    const currentUserAllActivities = farm.filtered(
      'date >= $0 && date <= $1 && userId CONTAINS $2 && farmId CONTAINS $3 && action IN $4',
      new Date(dataForm['startDate'].setHours(0, 0, 0, 0)), //set earliest possible starting of date
      new Date(dataForm['endDate'].setHours(23, 59, 59, 999)), //set latest possible ending of date
      userId.toString(),
      farmId.toString(),
      dataForm['selectedValue'],
    );
    // const subscribe = async () => {
    //   await realm.subscriptions.update(mutableSubs => {
    //     // Create subscription for filtered results.
    //     mutableSubs.add(currentUserAllActivities);
    //   });
    //   setIsLoading(false);
    //   // setInterval(() => setIsLoading(false), 3000);
    // };
    // subscribe();
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(currentUserAllActivities);
    });
    setIsLoading(false);
    setActivitiesToDisplay(currentUserAllActivities);
  }, [realm, dataForm, setActivitiesToDisplay]);

  console.log('ATD: ', activitiesToDisplay.length);

  const getActionFromActivityProp = action => {
    return actProps.filter(item => item.action == action)[0]?.icon;
  };

  const getBgColorFromActivityProp = action => {
    return actProps.filter(item => item.action == action)[0]?.bgColor;
  };

  const showModal = () => setVisible(!visible);
  console.log(dataForm['selectedValue']);
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.dateInputContainer}>
        <DateInput
          label={'From'}
          dataForm={dataForm}
          setDataForm={setDataForm}
          dateFieldName={'startDate'}
          minWidth={'48%'}
        />
        <DateInput
          label={'To'}
          dataForm={dataForm}
          setDataForm={setDataForm}
          dateFieldName={'endDate'}
          minWidth={'48%'}
        />
      </SafeAreaView>
      <Button
        style={styles.filterButton}
        labelStyle={styles.filterLabel}
        mode="contained"
        onPress={showModal}>
        Filter
      </Button>
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
      <ActivityScreenViewSort
        visible={visible}
        showModal={showModal}
        dataForm={dataForm}
        setDataForm={setDataForm}
        actProps={actProps}
      />
      {/* 
      <AutocompleteItemInput
        dataForm={dataForm}
        setDataForm={setDataForm}
        initialValue={false}
        label={'Test'}
        id={'_id'}
        title={'name'}
        options={'plants'}
      /> */}
    </SafeAreaView>
  );
};

export default ActivityScreenView;
