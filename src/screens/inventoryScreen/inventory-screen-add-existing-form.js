import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {Button, Text, Snackbar, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BSON} from 'realm';
import {realmContext} from '../../../RealmContext';
import {Inventory_Props as invProps} from '../../constants/inventory-existing-props';

import DateInput from '../../components/dateInput';
import NumberInput from '../../components/numberInput';
import AutocompleteItemInput from '../../components/autocompleteItemInput';
import AutocompleteUnitInput from '../../components/autocompleteUnitInput';
import SnackbarBottom from '../../components/snackbarBottom';
import {useGlobal} from '../../contexts/GlobalContext';

import {convertItemName} from '../../utils/convertAction-utils';

const InventoryScreenExistngNewForm = ({route, navigation}) => {
  //find the input fields for corresponding action selected
  const items = convertItemName(route.params.action);
  const field = route.params.field;

  const {userId, farmId, userName, farmName} = useGlobal();

  const {useRealm, useObject} = realmContext;
  const realm = useRealm();

  const initialValueActivities = {
    userId: userId.toString(),
    userName: {eng: userName, chs: '', cht: ''},
    farmId: farmId.toString(),
    farmName: {eng: farmName, chs: '', cht: ''},
    row: 0, //int
    field: 0, //int
    quantity: '', //int
    price: '', //int
    unit: '',
    item: {eng: '', chs: '', cht: ''},
    action: 'Add Inventory',
    remarks: '',
    date: new Date(),
    isActual: true,
    originalQuantity: '', //int
    originalUnit: '', //modified in input component
    convertQuantity: 0, //int
    createdAt: new Date(new Date().toISOString()),
    __v: 0,
  };
  const [dataForm, setDataForm] = useState(initialValueActivities);
  const [msg, setMsg] = useState(null);
  const [visible, setVisible] = useState(false);
  const [refUnit, setRefUnit] = useState(null);
  const [refItem, setRefItem] = useState(null);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects('activities'));
      mutableSubs.add(realm.objects('farms'));
    });
  }, [realm]);

  const convertForm = useCallback(
    row => {
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
        unit: /g/.test(dataForm['originalUnit']) ? 'kg' : 'ℓ',
        price: !isNaN(parseFloat(dataForm['price']))
          ? parseFloat(dataForm['price'])
          : 0,
        date: new Date(dataForm['date'].toISOString()),
        originalQuantity: !isNaN(parseFloat(dataForm['originalQuantity']))
          ? parseFloat(dataForm['originalQuantity'])
          : 0,
      };
    },
    [dataForm],
  );

  const validateDataInput = () => {
    return invProps.every(field => {
      console.log(field.id + '_' + field.validate(dataForm[field.id]));
      return field.validate(dataForm[field.id]);
    });
  };

  const setRefUnitFunction = useCallback(ref => {
    setRefUnit(ref);
  }, []);

  const setRefItemFunction = useCallback(ref => {
    setRefItem(ref);
  }, []);

  const handleAddInventory = () => {
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

    const isValid = validateDataInput();
    console.log('AllValid: ', isValid);
    const inventoryForm = convertForm();

    if (isValid) {
      refUnit?.current.clear();
      refItem?.current.clear();

      //update activities
      realm.write(() => {
        const farm = realm.objectForPrimaryKey('farms', BSON.ObjectId(farmId));
        console.log('Farm: ', farm[items]);
        console.log('Activity: ', inventoryForm);

        //update farm
        farm[items].map(f => {
          if (f.name.eng === inventoryForm.item.eng) {
            updated = true;
            f.quantity = parseFloat(
              (parseFloat(f.quantity) + inventoryForm.quantity).toFixed(3),
            );
            return;
          }
        });

        //update activity
        realm.create('activities', inventoryForm);
        console.log('Farm items', farm[items]);
      });
      console.log('Successfully created data');
      setDataForm(initialValueActivities);
      setMsg('Successfully created data.');
    } else {
      console.log('Error');
      setMsg('Incorrect Input Data.');
    }
    setVisible(true);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topBar: {
      backgroundColor: field.cardColor,
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
      backgroundColor: field.cardColor,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <IconButton
          icon="arrow-left"
          iconColor="black"
          size={25}
          onPress={() => navigation.goBack()}
        />
        <View style={styles.topBarText}>
          <Text variant="titleLarge" style={{fontWeight: 700}}>
            {'Add Existing ' + route.params.action}
          </Text>
        </View>
      </View>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        style={{flex: 1}}>
        <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
          {invProps.map((field, index) => {
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
                      label={route.params.action + ' name'}
                      id={'_id'}
                      title={'name'}
                      options={items}
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
                      dataFormOption={'originalUnit'}
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
            onPress={handleAddInventory}>
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

export default InventoryScreenExistngNewForm;
