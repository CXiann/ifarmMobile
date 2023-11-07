import React, {useState, useEffect} from 'react';
import {StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Button, Text, Snackbar, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {realmContext} from '../../../RealmContext';
import {Activity} from '../../schemas/activity.schema';
import {Activity_Props as actProps} from '../../constants/activity-props';

import DateInput from '../../components/dateInput';
import FieldInput from '../../components/fieldInput';
import NumberInput from '../../components/numberInput';
import AutocompleteItemInput from '../../components/autocompleteItemInput';
import AutocompleteUnitInput from '../../components/autocompleteUnitInput';
import SnackbarBottom from '../../components/snackbarBottom';
import {useGlobal} from '../../contexts/GlobalContext';
// import {createStackNavigator} from '@react-navigation/stack';

const ActivityScreenAddForm = ({route, navigation}) => {
  // const Stack = createStackNavigator();
  // const Wrapper = {
  //   <Stack.Navigator>
  // }

  //find the input fields for corresponding action selected
  const selectedAction = route.params.action;
  const selectedActionAllProps = actProps.find(
    act => act.action == selectedAction,
  );
  const selectedActionFields = selectedActionAllProps.fields;
  const {userId, farmId, userName, farmName} = useGlobal();

  const {useRealm, useObject, useQuery} = realmContext;
  const realm = useRealm();

  const initialValueActivities = {
    userId: userId.toString(),
    userName: {eng: userName, chs: '', cht: ''},
    farmId: farmId.toString(),
    farmName: {eng: farmName, chs: '', cht: ''},
    row: '', //int
    field: '0', //int
    quantity: '', //int
    price: '', //int
    unit: '',
    item: {eng: '', chs: '', cht: ''},
    action: '',
    remarks: '',
    date: new Date(),
    isActual: true,
    originalQuantity: '', //int
    originalUnit: '', //modified in input component
    convertQuantity: '', //int
    createdAt: new Date(new Date().toISOString()),
    __v: 0,
  };
  const [dataForm, setDataForm] = useState(initialValueActivities);
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Activity));
    });
  }, [realm]);

  const handleAddActivity = () => {
    console.log('########');
    for (const key in dataForm) {
      if (dataForm.hasOwnProperty(key)) {
        console.log(`${key}: ${dataForm[key]}`);
      }
    }
    realm.write(() => {
      realm.create('activities', {
        ...dataForm,
        row: !isNaN(parseInt(dataForm['row'])) ? parseInt(dataForm['row']) : 0,
        field: !isNaN(parseInt(dataForm['field']))
          ? parseInt(dataForm['field'])
          : 0,
        quantity: !isNaN(parseInt(dataForm['quantity']))
          ? /kg|^ℓ$/.test(dataForm['originalUnit'])
            ? parseInt(dataForm['quantity'])
            : /mg/.test(dataForm['originalUnit'])
            ? parseInt(dataForm['quantity']) / 1000000
            : /^g$|mℓ/.test(dataForm['originalUnit'])
            ? parseInt(dataForm['quantity']) / 1000
            : parseInt(dataForm['quantity']) / 2
          : 0,
        unit: /g/.test(dataForm['originalUnit']) ? 'kg' : 'ℓ',
        price: !isNaN(parseFloat(dataForm['price']))
          ? parseFloat(dataForm['price'])
          : 0,
        action: selectedAction,
        date: new Date(dataForm['date'].toISOString()),
        originalQuantity: !isNaN(parseInt(dataForm['quantity']))
          ? parseInt(dataForm['quantity'])
          : 0,

        convertQuantity: !isNaN(parseInt(dataForm['convertQuantity']))
          ? /kg|ℓ/.test(dataForm['unit'])
            ? parseInt(dataForm['convertQuantity'])
            : parseInt(dataForm['convertQuantity']) * 1000
          : 0,
      });
    });
    console.log('Successfully created data');
    setDataForm(initialValueActivities);
    setVisible(true);
  };
  // console.log('########');
  // for (const key in dataForm) {
  //   if (dataForm.hasOwnProperty(key)) {
  //     console.log(`${key}: ${dataForm[key]}`);
  //   }
  // }
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.topBar}>
        <IconButton
          icon="arrow-left"
          iconColor="black"
          size={25}
          onPress={() => navigation.goBack()}
        />
        <SafeAreaView style={styles.topBarText}>
          <Text variant="titleLarge" style={{fontWeight: 700}}>
            {route.params.action}
          </Text>
        </SafeAreaView>
      </SafeAreaView>
      <ScrollView
        nestedScrollEnabled
        keyboardDismissMode="on-drag"
        contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={styles.inputContainer}>
          <KeyboardAvoidingView behavior="padding">
            {selectedActionFields.map((field, index) => {
              switch (field.type) {
                case 'date': {
                  return (
                    <React.Fragment key={field.type + '_' + index}>
                      <DateInput
                        label={'Date'}
                        dataForm={dataForm}
                        setDataForm={setDataForm}
                        minWidth={'100%'}
                        dateFieldName={'date'}
                      />
                    </React.Fragment>
                  );
                }
                case 'field':
                  return (
                    <React.Fragment key={field.type + '_' + index}>
                      <FieldInput
                        label={'Field Number'}
                        dataForm={dataForm}
                        setDataForm={setDataForm}
                      />
                    </React.Fragment>
                  );
                case 'number':
                  return (
                    <React.Fragment key={field.type + '_' + index}>
                      <NumberInput
                        label={field.name}
                        dataFormOption={field.id}
                        dataForm={dataForm}
                        setDataForm={setDataForm}
                      />
                    </React.Fragment>
                  );
                case 'autocomplete':
                  return (
                    <React.Fragment key={field.type + '_' + index}>
                      <AutocompleteItemInput
                        label={field.name}
                        id={'_id'}
                        title={'name'}
                        options={field.options}
                        dataForm={dataForm}
                        setDataForm={setDataForm}
                        initialValue={false}
                      />
                    </React.Fragment>
                  );
                case 'unit':
                  return (
                    <React.Fragment key={field.type + '_' + index}>
                      <AutocompleteUnitInput
                        label={field.name}
                        dataSet={field.units}
                        dataForm={dataForm}
                        setDataForm={setDataForm}
                        initialValue={true}
                      />
                    </React.Fragment>
                  );
                default:
                  return (
                    <React.Fragment key={field.type + '_' + index}>
                      <Text key={index} variant="bodyLarge">
                        Error
                      </Text>
                    </React.Fragment>
                  );
              }
            })}
            <Button
              mode="contained"
              style={styles.button}
              onPress={handleAddActivity}>
              Add
            </Button>
            <SnackbarBottom
              label={'Dismiss'}
              title={'Successfully created data.'}
              visible={visible}
              dismiss={onDismissSnackBar}
            />
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityScreenAddForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    backgroundColor: 'white',
    maxHeight: '15%',
    minWidth: '100%',
    flexDirection: 'row',
  },
  topBarText: {
    justifyContent: 'center',
    marginLeft: '3%',
    color: 'black',
  },
  inputContainer: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  button: {marginVertical: 10, minWidth: '100%'},
});
