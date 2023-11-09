import Realm, {BSON} from 'realm';
import {ScrollView} from 'react-native';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import React, {useEffect, useState, useCallback} from 'react';
import {
  Modal,
  Portal,
  Text,
  useTheme,
  Button,
  IconButton,
  TextInput,
} from 'react-native-paper';
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
        onDismiss={() => {
          showModal();
        }}
        contentContainerStyle={{
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 10,
          borderRadius: 20,
          marginTop: 50,
        }}>
        <GestureHandlerRootView>
          <ScrollView
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{flexGrow: 1}}>
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
              <IconButton
                icon="close"
                size={15}
                mode="contained"
                style={{
                  alignSelf: 'center',
                  backgroundColor: colors.primaryContainer,
                }}
                onPress={() => showModal()}
              />
            </SafeAreaView>
            <SafeAreaView style={{marginVertical: 10}}>
              <FlatList
                removeClippedSubviews={true}
                data={itemProps}
                initialNumToRender={1}
                maxToRenderPerBatch={4}
                keyExtractor={item => item.id.toString()}
                renderItem={renderItem}
              />
            </SafeAreaView>
            <SafeAreaView style={{marginVertical: 10}}>
              <ActivityViewSortingButtons
                dataForm={tempForm}
                setDataForm={setTempForm}
                props={actProps}
              />
            </SafeAreaView>
            <SafeAreaView
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
              <Button
                onPress={() =>
                  setTempForm({
                    ...tempForm,
                    selectedValue: [],
                    plants: '',
                    fertilizers: '',
                    pesticides: '',
                    foliars: '',
                    fungicides: '',
                  })
                }
                rippleColor={'white'}>
                Clear All Options
              </Button>
              <Button
                onPress={() =>
                  setTempForm({
                    ...tempForm,
                    selectedValue: initialButtonValues,
                  })
                }
                rippleColor={'white'}>
                Select All Options
              </Button>
            </SafeAreaView>
            <Button
              style={{
                backgroundColor: colors.primaryContainer,
                marginBottom: 15,
                margin: 5,
                alignSelf: 'center',
                width: '50%',
              }}
              labelStyle={{color: colors.primary}}
              mode="contained"
              onPress={() => {
                setDataForm({...dataForm, ...tempForm});
                showModal();
              }}>
              Filter
            </Button>
          </ScrollView>
        </GestureHandlerRootView>
      </Modal>
    </Portal>
  );
};

export default ActivityScreenViewSort;
