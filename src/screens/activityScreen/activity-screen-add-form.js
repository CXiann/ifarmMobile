import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, KeyboardAvoidingView, ScrollView} from 'react-native';
import {Button, Text, Snackbar, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BSON} from 'realm';
import {realmContext} from '../../../RealmContext';
import {Activity_Props as actProps} from '../../constants/activity-props';

import DateInput from '../../components/dateInput';
import FieldInput from '../../components/fieldInput';
import NumberInput from '../../components/numberInput';
import AutocompleteItemInput from '../../components/autocompleteItemInput';
import AutocompleteUnitInput from '../../components/autocompleteUnitInput';
import SnackbarBottom from '../../components/snackbarBottom';
import {useGlobal} from '../../contexts/GlobalContext';
import {validateRange} from '../../utils/field-utils';
import {convertItemName} from '../../utils/convertAction-utils';

const ActivityScreenAddForm = ({route, navigation}) => {
  //find the input fields for corresponding action selected
  const selectedAction = route.params.action;
  const themeColor = route.params.color;
  const selectedActionAllProps = actProps.find(
    act => act.action == selectedAction,
  );
  const selectedActionFields = selectedActionAllProps.fields;
  const {userId, farmId, userName, farmName} = useGlobal();

  const {useRealm, useObject} = realmContext;
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
    action: selectedAction,
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
  const [msg, setMsg] = useState(null);
  const [visible, setVisible] = useState(false);
  const [refUnit, setRefUnit] = useState(null);
  const [refItem, setRefItem] = useState(null);
  const [updateRows, setUpdateRows] = useState([]);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects('activites'));
      mutableSubs.add(realm.objects('farms'));
    });
  }, [realm]);

  useEffect(() => {
    setUpdateRows(validateRange(dataForm['row']));
  }, [dataForm]);

  const convertQuantity = () => {
    return {
      ...dataForm,
      quantity: !isNaN(parseFloat(dataForm['originalQuantity']))
        ? /kg|^ℓ$/.test(dataForm['originalUnit'])
          ? parseFloat(dataForm['originalQuantity'])
          : /mg/.test(dataForm['originalUnit'])
          ? parseFloat(dataForm['originalQuantity']) / 1000000
          : /^g$|mℓ/.test(dataForm['originalUnit'])
          ? parseFloat(dataForm['originalQuantity']) / 1000
          : parseFloat(dataForm['originalQuantity']) / 2
        : 0,
    };
  };
  const convertForm = useCallback(
    row => {
      return {
        ...dataForm,
        row: !isNaN(parseInt(row)) ? parseInt(row) : 0,
        field: !isNaN(parseInt(dataForm['field']))
          ? parseInt(dataForm['field'])
          : 0,
        quantity: !isNaN(parseFloat(dataForm['originalQuantity']))
          ? /kg|^ℓ$/.test(dataForm['originalUnit'])
            ? parseFloat(dataForm['originalQuantity'])
            : /mg/.test(dataForm['originalUnit'])
            ? parseFloat(dataForm['originalQuantity']) / 1000000
            : /^g$|mℓ/.test(dataForm['originalUnit'])
            ? parseFloat(dataForm['originalQuantity']) / 1000
            : parseFloat(dataForm['originalQuantity']) / 2
          : 0,
        unit: /g/.test(dataForm['originalUnit']) ? 'kg' : 'ℓ',
        price: !isNaN(parseFloat(dataForm['price']))
          ? parseFloat(dataForm['price'])
          : 0,
        date: new Date(dataForm['date'].toISOString()),
        originalQuantity: !isNaN(parseFloat(dataForm['originalQuantity']))
          ? parseFloat(dataForm['originalQuantity'])
          : 0,

        convertQuantity: !isNaN(parseInt(dataForm['convertQuantity']))
          ? /kg|ℓ/.test(dataForm['unit'])
            ? parseInt(dataForm['convertQuantity'])
            : parseInt(dataForm['convertQuantity']) * 1000
          : 0,
      };
    },
    [dataForm, selectedAction],
  );

  const validateDataInput = () => {
    return selectedActionFields.every(field => {
      console.log(field.id + '_' + field.validate(dataForm[field.id]));
      return field.validate(dataForm[field.id]);
    });
  };

  const validateQuantity = () => {
    var flag;
    realm.write(() => {
      //update farm
      const farm = realm.objectForPrimaryKey('farms', BSON.ObjectId(farmId));
      const activityForm = convertQuantity();
      const items = convertItemName(activityForm.action);
      console.log('Farm: ', farm[items]);
      console.log('Activity: ', activityForm);
      const totalActQuantity = activityForm.quantity * updateRows.length;

      farm[items].map(f => {
        if (f.name.eng === activityForm.item.eng) {
          if (totalActQuantity < f.quantity) {
            f.quantity = parseFloat(
              (parseFloat(f.quantity) - totalActQuantity).toFixed(3),
            );
            flag = true;
          } else {
            flag = false;
          }
          return;
        }
      });
      console.log('Farm items', farm[items]);
    });
    return flag;
  };

  const setRefUnitFunction = useCallback(ref => {
    setRefUnit(ref);
  }, []);

  const setRefItemFunction = useCallback(ref => {
    setRefItem(ref);
  }, []);

  const handleAddActivity = () => {
    // console.log('########');
    // for (const key in dataForm) {
    //   if (dataForm.hasOwnProperty(key)) {
    //     if (key == 'item') {
    //       console.log(`${key}.eng: ${dataForm[key]['eng']}`);
    //     } else {
    //       console.log(`${key}: ${dataForm[key]}`);
    //     }
    //   }
    // }
    console.log('DataForm: ', dataForm);
    const vInput = validateDataInput();
    const vQuantity =
      dataForm.action == 'Foliar' ||
      dataForm.action == 'Fertilizer' ||
      dataForm.action == 'Pesticide' ||
      dataForm.action == 'Fungicide'
        ? validateQuantity()
        : true;

    const isValid = vInput && vQuantity;
    console.log('AllValid: ', isValid);

    // const farm = realm.objectForPrimaryKey('farms', BSON.ObjectId(farmId));
    // const activityForm = convertForm();
    // const items = convertItemName(activityForm.action);
    // console.log('Final Farm: ', farm[items]);

    if (isValid) {
      refUnit?.current.clear();
      refItem?.current.clear();

      //update activities
      realm.write(() => {
        updateRows.map(row => realm.create('activities', convertForm(row)));
      });
      console.log('Successfully created data');
      setDataForm(initialValueActivities);
      setMsg('Successfully created data.');
    } else {
      var errMsg = '';
      errMsg = vInput
        ? vQuantity
          ? ''
          : 'Quantity Exceeded Available Inventory.'
        : 'Incorrect Input Data.';
      console.log('Error');
      setMsg(errMsg);
    }
    setVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topBar: {
      backgroundColor: themeColor,
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
    button: {
      marginVertical: 10,
      minWidth: '100%',
      backgroundColor: themeColor,
    },
  });

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
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        style={{flex: 1}}>
        <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
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
                      setRefItemFunction={setRefItemFunction}
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
                      setRefUnitFunction={setRefUnitFunction}
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
        </KeyboardAvoidingView>
      </ScrollView>
      <SnackbarBottom
        label={'Dismiss'}
        title={msg}
        visible={visible}
        textColor={msg == 'Successfully created data.' ? 'yellowgreen' : 'red'}
        dismiss={onDismissSnackBar}
      />
    </SafeAreaView>
  );
};

export default ActivityScreenAddForm;
