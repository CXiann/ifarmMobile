import React, {useEffect, useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTheme, Button, Text} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';

import {realmContext} from '../../../RealmContext';
import {useGlobal} from '../../contexts/GlobalContext';

import {Activity} from '../../schemas/activity.schema';
import {Activity_Props as actProps} from '../../constants/activity-props';

import DateInput from '../../components/dateInput';
import ActivityScreenViewSort from './activity-screen-view-sort';
import ActivityViewCards from '../../components/activityViewCards';

const ActivityScreenView = ({navigation}) => {
  const {useRealm, useQuery} = realmContext;
  const realm = useRealm();
  const {userId, farmId, setIsLoading} = useGlobal();
  const {colors} = useTheme();
  const activities = useQuery(Activity);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },
    dateInputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
      marginBottom: 10,
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });

  const initialValues = {
    startDate: new Date(),
    endDate: new Date(),
    plants: '',
    fertilizers: '',
    pesticides: '',
    foliars: '',
    fungicides: '',
    selectedValue: [],
    options: [],
    previousValue: {
      plants: '',
      fertilizers: '',
      pesticides: '',
      foliars: '',
      fungicides: '',
    },
  };

  const [dataForm, setDataForm] = useState(initialValues);
  // const [visible, setVisible] = useState(false);
  const [activitiesToDisplay, setActivitiesToDisplay] = useState([]);

  console.log('Prev value: ', dataForm['previousValue']);

  useEffect(() => {
    setIsLoading(true);
    const keysToExtract = [
      'plants',
      'fertilizers',
      'pesticides',
      'foliars',
      'fungicides',
    ];
    const propsForQuery = keysToExtract.map(key => dataForm[key]);
    console.log('Props: ', propsForQuery);
    var currentUserAllActivities = activities
      .filtered(
        'date >= $0 && date <= $1 && farmId CONTAINS $2' +
          (dataForm['selectedValue'].length > 0 ? ' && action IN $3' : ''),
        new Date(dataForm['startDate'].setHours(0, 0, 0, 0)), //set earliest possible starting of date
        new Date(dataForm['endDate'].setHours(23, 59, 59, 999)), //set latest possible ending of date
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

    setIsLoading(false);
    setActivitiesToDisplay(currentUserAllActivities);
    console.log('Done useeffect');
  }, [dataForm]);

  console.log('ATD: ', activitiesToDisplay.length);

  // const showModal = useCallback(() => setVisible(!visible), [visible]);
  console.log('Selected action: ', dataForm['selectedValue']);

  const renderItem = ({item}) => (
    <ActivityViewCards item={item} actProps={actProps} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button
            style={{marginEnd: 20}}
            buttonColor="honeydew"
            // textColor="white"
            icon="plus"
            mode="elevated"
            onPress={() =>
              navigation.navigate('Add Activity', {action: 'Add Activity'})
            }>
            Add
          </Button>
          {/* Test old filter */}
          {/* <Button
          icon="filter-variant"
          mode="elevated"
          onPress={() => showModal()}>
          Filter
        </Button> */}
          <Button
            icon="chart-bar"
            mode="elevated"
            onPress={() => navigation.navigate('Activity Chart')}>
            Charts
          </Button>
        </View>
        <Button
          icon="filter-variant"
          mode="text"
          onPress={() =>
            navigation.navigate('Sort', {
              dataForm: dataForm,
              setDataForm: setDataForm,
              actProps: actProps,
            })
          }>
          Filter
        </Button>
      </View>
      <View style={styles.dateInputContainer}>
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
      </View>
      {activitiesToDisplay.length == 0 ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text variant="bodyLarge">No Activities Recorded</Text>
        </View>
      ) : (
        <FlatList
          removeClippedSubviews={true}
          data={activitiesToDisplay}
          initialNumToRender={4}
          keyExtractor={item => item._id.toString()} // Replace 'id' with the unique identifier in your data
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

export default ActivityScreenView;
