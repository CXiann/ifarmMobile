import Realm, {BSON} from 'realm';
import React, {useEffect, useState, useCallback} from 'react';
import {Modal, Portal, Text, useTheme, Button} from 'react-native-paper';
import ActivityViewSortingButtons from '../../components/activityViewSortingButtons';
import {SafeAreaView} from 'react-native-safe-area-context';
import AutocompleteItemSortInput from '../../components/autocompleteItemSortInput';
import {Item_Props as itemProps} from '../../constants/item-props';

const ActivityScreenViewSort = ({
  visible,
  showModal,
  dataForm,
  setDataForm,
  actProps,
}) => {
  const initialButtonValues = actProps.map(prop => {
    return prop.action;
  });

  const [tempForm, setTempForm] = useState(dataForm);

  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => {
          setDataForm({...dataForm, ...tempForm});
          showModal();
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 20,
          // height: 500,
        }}
        style={{flex: 1}}>
        <SafeAreaView>
          <Text variant="titleLarge" style={{marginBottom: 20}}>
            Filtering Options
          </Text>

          {itemProps.map((prop, index) => {
            return (
              <AutocompleteItemSortInput
                tempForm={tempForm}
                setTempForm={setTempForm}
                initialValue={true}
                label={prop.label}
                id={'_id'}
                title={'name'}
                options={prop.options}
                myKey={prop.label + '_' + index}
              />
            );
          })}
          {/* <AutocompleteItemSortInput
            tempForm={tempForm}
            setTempForm={setTempForm}
            initialValue={true}
            label={'Fertilizers'}
            id={'_id'}
            title={'name'}
            options={'fertilizers'}
          /> */}
          <ActivityViewSortingButtons
            dataForm={tempForm}
            setDataForm={setTempForm}
            props={actProps}
          />
          <SafeAreaView
            style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Button
              onPress={() =>
                setTempForm({
                  ...tempForm,
                  selectedValue: [],
                  plants: '',
                  fertilizers: '',
                  pesticides: '',
                  foliars: '',
                })
              }
              rippleColor={'white'}>
              Clear All Options
            </Button>
            <Button
              onPress={() =>
                setTempForm({...tempForm, selectedValue: initialButtonValues})
              }
              rippleColor={'white'}>
              Select All Options
            </Button>
          </SafeAreaView>
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};

export default ActivityScreenViewSort;
