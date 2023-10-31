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
      fontWeight: 'bold',
      fontSize: 15,
    },
    cardBodyText: {
      fontSize: 20,
      color: 'dimgray',
      marginBottom: '2%',
    },
    cardBottom: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardBottomText: {
      color: 'red',
      fontWeight: 'bold',
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
    plants: '',
    fertilizers: '',
    pesticides: '',
    foliars: '',
    selectedValue: initialButtonValues,
    options: initialItemValues,
    previousValue: {plants: '', fertilizers: '', pesticides: '', foliars: ''},
  };

  const [dataForm, setDataForm] = useState(initialValues);
  const [visible, setVisible] = useState(false);
  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);

  const farm = useQuery(Activity);
  console.log('here: ', dataForm['previousValue']);
  useEffect(() => {
    setIsLoading(true);
    const keysToExtract = ['plants', 'fertilizers', 'pesticides', 'foliars'];
    const propsForQuery = keysToExtract.map(key => dataForm[key]);
    console.log(propsForQuery);
    var currentUserAllActivities = farm
      .filtered(
        'date >= $0 && date <= $1 && userId CONTAINS $2 && farmId CONTAINS $3 && action IN $4',
        new Date(dataForm['startDate'].setHours(0, 0, 0, 0)), //set earliest possible starting of date
        new Date(dataForm['endDate'].setHours(23, 59, 59, 999)), //set latest possible ending of date
        userId.toString(),
        farmId.toString(),
        dataForm['selectedValue'],
      )
      .sorted('date', true);
    function containsOnlyOneNonEmptyString(arrs) {
      const nonEmptyStrings = arrs.filter(str => str != '');
      return nonEmptyStrings.length == 1;
    }
    function containsMoreThanOneNonEmptyString(arrs) {
      const nonEmptyStrings = arrs.filter(str => str != '');
      return nonEmptyStrings.length > 1;
    }
    function getNonEmptyStringValue(arrs) {
      for (const str of arrs) {
        if (str !== '') {
          return str;
        }
      }
      return null;
    }
    //just to return empty Realm.Results
    if (containsMoreThanOneNonEmptyString(propsForQuery)) {
      currentUserAllActivities = currentUserAllActivities.filtered(
        'isActual == $0',
        false,
      );
    }

    if (containsOnlyOneNonEmptyString(propsForQuery)) {
      currentUserAllActivities = currentUserAllActivities.filtered(
        'item.eng == $0',
        getNonEmptyStringValue(propsForQuery),
      );
    }

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
    return actProps.find(item => item.action == action).icon;
  };

  const getBgColorFromActivityProp = action => {
    return actProps.find(item => item.action == action).bgColor;
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
                <Text variant="bodyLarge" style={styles.cardBodyText}>
                  {item.remarks}
                </Text>
              )}
              {item?.originalUnit && (
                <Text variant="bodyLarge" style={styles.cardBodyText}>
                  {item.originalQuantity + ' ' + item.originalUnit}
                  <Text
                    variant="bodyLarge"
                    style={{
                      fontSize: 20,
                      color: 'yellowgreen',
                    }}>
                    {' (Std. unit: ' +
                      item.quantity +
                      ' ' +
                      actProps.find(prop => prop.action == item.action)
                        .standardUnit +
                      ')'}
                  </Text>
                </Text>
              )}
              {item?.price != 0 && (
                <Text
                  variant="titleMedium"
                  style={{
                    ...styles.cardBodyText,
                    fontWeight: 'bold',
                  }}>
                  {'RM ' + item.price}
                </Text>
              )}
              <SafeAreaView style={styles.cardBottom}>
                {item?.field != 0 || item?.row != 0 ? (
                  <Text variant="bodyLarge" style={styles.cardBottomText}>
                    {'F' + item.field + ' R' + item.row}
                  </Text>
                ) : (
                  <Text variant="bodyLarge" style={styles.cardBottomText}>
                    {'N/A'}
                  </Text>
                )}
                <Text variant="bodyLarge" style={{fontWeight: 'bold'}}>
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
    </SafeAreaView>
  );
};

export default ActivityScreenView;
