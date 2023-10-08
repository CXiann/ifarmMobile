import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import {realmContext} from '../../../RealmContext';
import {Activity} from '../../schemas/activity.schema';
import {Activity_Props as actProps} from '../../constants/activity-props';

import DateInput from '../../components/dateInput';
import FieldInput from '../../components/fieldInput';
import NumberInput from '../../components/numberInput';
import AutocompleteItemInput from '../../components/autocompleteItemInput';
import AutocompleteUnitInput from '../../components/autocompleteUnitInput';

const ActivityScreenAddForm = ({route}) => {
  //find the input fields for corresponding action selected
  const selectedAction = route.params.action;
  const selectedActionFields = actProps.filter(
    act => act.action == selectedAction,
  )[0].fields;

  const {useRealm, useObject, useQuery} = realmContext;
  const realm = useRealm();

  const initialValueActivities = {
    userId: global.currentUserId.toString(),
    userName: {},
    farmId: global.currentUserSelectedFarmId.toString(),
    farmName: {},
    row: '',
    field: 0,
    quantity: 0,
    price: 0,
    unit: '',
    item: {eng: '', chs: '', cht: ''},
    action: '',
    remarks: '',
    date: new Date(),
    isActual: true,
    originalQuantity: 0,
    convertUnit: '',
    convertQuantity: 0,
    createdAt: new Date(new Date().toISOString()),
    __v: 0,
  };
  const [dataForm, setDataForm] = useState(initialValueActivities);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Activity));
    });
  }, [realm]);

  const handleAddActivity = () => {
    realm.write(() => {
      realm.create('activities', {
        ...dataForm,
        row: parseInt(dataForm['row']),
        field: parseInt(dataForm['field']),
        quantity: parseInt(dataForm['quantity']),
        price: parseInt(dataForm['price']),
        action: selectedAction,
        date: new Date(dataForm['date'].toISOString()),
        convertQuantity: parseInt(dataForm['convertQuantity']),
      });
      console.log('Successfully created data');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {selectedActionFields.map(field => {
        switch (field.type) {
          case 'date':
            return (
              <DateInput label={'Date'} data={dataForm} setData={setDataForm} />
            );
          case 'field':
            return (
              <FieldInput
                label={'Field Number'}
                dataForm={dataForm}
                setDataForm={setDataForm}
              />
            );
          case 'number':
            return (
              <NumberInput
                label={field.name}
                dataFormOption={field.id}
                dataForm={dataForm}
                setDataForm={setDataForm}
              />
            );
          case 'autocomplete':
            return (
              <AutocompleteItemInput
                label={field.name}
                action={selectedAction}
                id={'_id'}
                title={'name'}
                options={field.options}
                dataForm={dataForm}
                setDataForm={setDataForm}
                initialValue={false}
              />
            );
          case 'unit':
            return (
              <AutocompleteUnitInput
                label={field.name}
                dataSet={field.units}
                dataForm={dataForm}
                setDataForm={setDataForm}
                initialValue={true}
              />
            );
          default:
            return <Text variant="bodyLarge">Error</Text>;
        }
      })}
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleAddActivity}>
        Add
      </Button>
    </SafeAreaView>
  );
};

export default ActivityScreenAddForm;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  textInput: {
    // marginHorizontal: 10,
    marginVertical: 5,
    // backgroundColor: '#ffffff',
  },
  button: {marginVertical: 10},
});
