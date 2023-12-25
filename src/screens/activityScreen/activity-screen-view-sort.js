import Realm, {BSON} from 'realm';
import {ScrollView, View} from 'react-native';
import {
  FlatList,
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import React, {useEffect, useState, useCallback} from 'react';
import Modal from 'react-native-modal';

import {
  // Modal,
  // Portal,
  Text,
  useTheme,
  Button,
  Provider as PaperProvider,
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

  if (!visible) {
    return null;
  }

  return (
    // <Portal>
    //   <Modal
    //     visible={visible}
    //     onDismiss={() => {
    //       showModal();
    //     }}
    //     contentContainerStyle={{
    //       backgroundColor: 'white',
    //       paddingHorizontal: 20,
    //       paddingVertical: 10,
    //       borderRadius: 20,
    //       marginTop: 55,
    //     }}>
    //     <ScrollView
    //       keyboardDismissMode="on-drag"
    //       keyboardShouldPersistTaps="handled"
    //       contentContainerStyle={{flexGrow: 1}}>
    //       <SafeAreaView
    //         style={{
    //           flexDirection: 'row',
    //           justifyContent: 'space-between',
    //           marginTop: 8,
    //         }}>
    //         <Text
    //           variant="titleLarge"
    //           style={{
    //             alignSelf: 'center',
    //             // marginBottom: 20,
    //           }}>
    //           Filtering Options
    //         </Text>
    //       </SafeAreaView>
    //       <SafeAreaView style={{marginBottom: 10, marginTop: 5}}>

    //         {itemProps.map((prop, index) => {
    //           return (
    //             <React.Fragment key={prop.label + '_' + index}>
    //               <AutocompleteItemSortInput
    //                 tempForm={tempForm}
    //                 setTempForm={setTempForm}
    //                 initialValue={true}
    //                 label={prop.label}
    //                 id={'_id'}
    //                 title={'name'}
    //                 options={prop.options}
    //               />
    //             </React.Fragment>
    //           );
    //         })}
    //       </SafeAreaView>
    //       <SafeAreaView style={{marginVertical: 10}}>
    //         <ActivityViewSortingButtons
    //           dataForm={tempForm}
    //           setDataForm={setTempForm}
    //           props={actProps}
    //         />
    //       </SafeAreaView>
    //       <SafeAreaView
    //         style={{
    //           flexDirection: 'row',
    //           justifyContent: 'space-between',
    //           marginBottom: 10,
    //         }}>
    //         <Button
    //           onPress={() =>
    //             setTempForm({
    //               ...tempForm,
    //               selectedValue: [],
    //               plants: '',
    //               fertilizers: '',
    //               pesticides: '',
    //               foliars: '',
    //               fungicides: '',
    //             })
    //           }
    //           rippleColor={'white'}>
    //           Clear All Options
    //         </Button>
    //         <Button
    //           onPress={() =>
    //             setTempForm({
    //               ...tempForm,
    //               selectedValue: initialButtonValues,
    //             })
    //           }
    //           rippleColor={'white'}>
    //           Select All Options
    //         </Button>
    //       </SafeAreaView>
    //       <SafeAreaView
    //         style={{flexDirection: 'row', justifyContent: 'space-between'}}>
    //         <Button
    //           style={{
    //             backgroundColor: 'red',
    //             marginBottom: 15,
    //             marginTop: 5,
    //             alignSelf: 'center',
    //             minWidth: '47%',
    //           }}
    //           labelStyle={{color: 'white'}}
    //           mode="contained"
    //           onPress={() => showModal()}>
    //           Cancel
    //         </Button>
    //         <Button
    //           style={{
    //             backgroundColor: colors.primaryContainer,
    //             marginBottom: 15,
    //             marginTop: 5,
    //             alignSelf: 'center',
    //             minWidth: '47%',
    //           }}
    //           labelStyle={{color: colors.primary}}
    //           mode="contained"
    //           onPress={() => {
    //             setDataForm({...dataForm, ...tempForm});
    //             showModal();
    //           }}>
    //           Filter
    //         </Button>
    //       </SafeAreaView>
    //     </ScrollView>
    //   </Modal>
    <Modal
      isVisible={visible}
      onBackdropPress={() => {
        showModal();
      }}
      propagateSwipe={true}
      style={{
        backgroundColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        // marginHorizontal: 0,
        // marginTop: 55,
        flex: 1,
      }}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{flexGrow: 1}}>
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text
                variant="titleLarge"
                style={{
                  alignSelf: 'center',
                  // marginBottom: 20,
                }}>
                Filtering Options
              </Text>
            </View>
            <View style={{marginBottom: 10, marginTop: 5}}>
              {itemProps.map((prop, index) => {
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
              })}
            </View>
            <View style={{marginVertical: 10}}>
              <ActivityViewSortingButtons
                dataForm={tempForm}
                setDataForm={setTempForm}
                props={actProps}
              />
            </View>
            <View
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
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Button
                style={{
                  backgroundColor: 'red',
                  marginBottom: 15,
                  marginTop: 5,
                  alignSelf: 'center',
                  minWidth: '47%',
                }}
                labelStyle={{color: 'white'}}
                mode="contained"
                onPress={() => showModal()}>
                Cancel
              </Button>
              <Button
                style={{
                  backgroundColor: colors.primaryContainer,
                  marginBottom: 15,
                  marginTop: 5,
                  alignSelf: 'center',
                  minWidth: '47%',
                }}
                labelStyle={{color: colors.primary}}
                mode="contained"
                onPress={() => {
                  setDataForm({...dataForm, ...tempForm});
                  showModal();
                }}>
                Filter
              </Button>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
    // </Portal>
  );
};

export default ActivityScreenViewSort;
