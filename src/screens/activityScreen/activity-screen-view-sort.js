import Realm, {BSON} from 'realm';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
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
  const {colors} = useTheme();
  const initialButtonValues = actProps.map(prop => {
    return prop.action;
  });

  const [tempForm, setTempForm] = useState(dataForm);

  const renderItem = useCallback(({item, index}) => {
    return (
      <React.Fragment key={item.label + '_' + index}>
        <AutocompleteItemSortInput
          tempForm={tempForm}
          setTempForm={setTempForm}
          initialValue={true}
          label={item.label}
          id={'_id'}
          title={'name'}
          options={item.options}
        />
      </React.Fragment>
    );
  }, []);

  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 20,
          // height: 500,
        }}
        style={{flex: 1}}>
        <SafeAreaView>
          <SafeAreaView
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              variant="titleLarge"
              style={{
                alignSelf: 'center',
                // marginBottom: 20,
              }}>
              Filtering Options
            </Text>
            <Button
              style={{backgroundColor: colors.primaryContainer, margin: 5}}
              mode="elevated"
              onPress={() => {
                setDataForm({...dataForm, ...tempForm});
                showModal();
              }}>
              Filter
            </Button>
          </SafeAreaView>
          <GestureHandlerRootView>
            <FlatList
              removeClippedSubviews={true}
              data={itemProps}
              initialNumToRender={4}
              keyExtractor={item => item.id.toString()} // Replace 'id' with the unique identifier in your data
              renderItem={renderItem}
            />
          </GestureHandlerRootView>
          {/* {itemProps.map((prop, index) => {
            return (
              <React.Fragment key={prop.label + '_' + index}>
                <AutocompleteItemSortInput
                  tempForm={tempForm}
                  setTempForm={setTempForm}
                  initialValue={true}
                  label={prop.label}
                  id={'_id'}
                  title={'name'}
                  options={prop.options}
                />
              </React.Fragment>
            );
          })} */}
          {/* <AutocompleteItemSortInput
            tempForm={tempForm}
            setTempForm={setTempForm}
            initialValue={true}
            label={'Plants'}
            id={'_id'}
            title={'name'}
            options={'plants'}
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
