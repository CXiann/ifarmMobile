import React, {useState, useCallback} from 'react';
import {StyleSheet, KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {Button, Text, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BSON} from 'realm';
import {realmContext} from '../../../RealmContext';
import {Inventory_Props as newProps} from '../../constants/inventory-new-props';
import StringInput from '../../components/stringInput';
import AutocompleteUnitInput from '../../components/autocompleteUnitInput';
import SnackbarBottom from '../../components/snackbarBottom';
import {useGlobal} from '../../contexts/GlobalContext';

import {convertItemName} from '../../utils/convertAction-utils';

const InventoryScreenAddExistingForm = ({route, navigation}) => {
  //find the input fields for corresponding action selected
  const items = convertItemName(route.params.action);
  const field = route.params.field;

  const {farmId} = useGlobal();

  const {useRealm, useObject} = realmContext;
  const realm = useRealm();

  const initialValueActivities = {
    id: new BSON.ObjectId(),
    name: '',
    tags: ['all'],
    originalUnit: '', //modified in input component
    unitType: '',
    __v: 0,
  };
  const [dataForm, setDataForm] = useState(initialValueActivities);
  const [msg, setMsg] = useState(null);
  const [visible, setVisible] = useState(false);
  const [refUnit, setRefUnit] = useState(null);

  const onDismissSnackBar = () => setVisible(false);

  const convertForm = useCallback(() => {
    const newObj = {
      ...dataForm,
      name: {eng: dataForm['name'], chs: '', cht: ''},
      unitType: /g/.test(dataForm['originalUnit']) ? 'kg' : 'ℓ',
    };
    delete newObj['originalUnit'];
    return newObj;
  }, [dataForm]);

  const validateDataInput = () => {
    return newProps.every(field => {
      console.log(field.id + '_' + field.validate(dataForm[field.id]));
      return field.validate(dataForm[field.id]);
    });
  };

  const setRefUnitFunction = useCallback(ref => {
    setRefUnit(ref);
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
    console.log('DataForm add inv: ', dataForm);

    const isValid = validateDataInput();
    const inventoryForm = convertForm();
    console.log('AllValid: ', isValid);

    if (isValid) {
      refUnit?.current.clear();

      realm.write(() => {
        const farm = realm.objectForPrimaryKey('farms', BSON.ObjectId(farmId));
        console.log('Farm: ', farm[items]);
        console.log('Activity: ', inventoryForm);
        var existed = false;
        //update farm
        farm[items].map(f => {
          if (f.name.eng === inventoryForm.name.eng) {
            existed = true;
            return;
          }
        });
        if (!existed) {
          //create new item globally
          realm.create(items, inventoryForm);

          //create new item locally in farm
          const localInventoryForm = {
            ...inventoryForm,
            _id: inventoryForm.id,
            unit: inventoryForm['unitType'],
            quantity: 0,
          };
          delete localInventoryForm['unitType'];
          farm[items].push(localInventoryForm);
          console.log('Successfully created data');
          setDataForm(initialValueActivities);
          setMsg('Successfully created data.');
        } else {
          console.log('Error');
          setMsg(route.params.action + ' existed.');
        }
      });
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
      marginVertical: 20,
      minWidth: '100%',
      backgroundColor: field.cardColor,
    },
  });

  console.log('dataform Main: ', dataForm);

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
            {'Add New ' + route.params.action}
          </Text>
        </View>
      </View>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        style={{flex: 1}}>
        <KeyboardAvoidingView behavior="padding" style={styles.inputContainer}>
          {newProps.map((field, index) => {
            switch (field.type) {
              case 'text':
                return (
                  <React.Fragment key={field.type + '_' + index}>
                    <StringInput
                      label={route.params.action + ' name'}
                      dataFormOption={field.id}
                      dataForm={dataForm}
                      setDataForm={setDataForm}
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
                      dataFormOption={field.id}
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

export default InventoryScreenAddExistingForm;
