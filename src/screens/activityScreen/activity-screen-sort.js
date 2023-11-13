import Realm, {BSON} from 'realm';
import {ScrollView, StyleSheet} from 'react-native';
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

const ActivityScreenSort = ({navigation, route}) => {
  const {colors} = useTheme();
  const {dataForm, setDataForm, actProps} = route.params;
  const initialButtonValues = actProps.map(prop => {
    return prop.action;
  });

  const styles = StyleSheet.create({
    topBar: {
      backgroundColor: colors.primaryContainer,
      maxHeight: '15%',
      minWidth: '100%',
      flexDirection: 'row',
    },
    topBarText: {
      justifyContent: 'center',
      marginLeft: '3%',
      color: 'black',
    },
  });
  const [tempForm, setTempForm] = useState(dataForm);

  console.log('Selected action: ', dataForm['selectedValue']);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <SafeAreaView style={styles.topBar}>
        <IconButton
          icon="arrow-left"
          iconColor="black"
          size={25}
          onPress={() => navigation.goBack()}
        />
        <SafeAreaView style={styles.topBarText}>
          <Text variant="titleLarge" style={{fontWeight: 700}}>
            Filtering Options
          </Text>
        </SafeAreaView>
      </SafeAreaView>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: 'white',
          paddingHorizontal: 20,
          paddingVertical: 10,
        }}>
        <SafeAreaView style={{marginBottom: 10, marginTop: 5}}>
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
        <SafeAreaView
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
            onPress={() => navigation.navigate('Activities')}>
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
              navigation.navigate('Activities');
            }}>
            Filter
          </Button>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityScreenSort;
