import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Button, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';

import Realm, {BSON} from 'realm';
import {realmContext} from '../../RealmContext';

import {Farm} from '../schemas/farm.schema';

const FarmSelectorScreen = ({navigation}) => {
  Feather.loadFont();
  const {colors} = useTheme();

  const {useQuery, useRealm} = realmContext;
  const realm = useRealm();

  const farms = useQuery(Farm);
  const [selectedFarm, setSelectedFarm] = useState({id: '', title: ''}); //store farm information in {id:objectId(string), title:}

  console.log('Total farms: ', farms.length);
  global.currentUserAllFarmId = global.currentUser?.farms;
  global.currentUserAllFarmBSONId = global.currentUserAllFarmId.map(
    farmIdStr => new BSON.ObjectId(farmIdStr),
  );
  global.currentUserAllFarm = farms.filtered(
    '_id IN $0',
    global.currentUserAllFarmBSONId,
  );
  console.log('User All farms: ', global.currentUserAllFarm.length);

  const getDataSetFormatFarm = farms => {
    return farms.map((farm, index) => {
      const newObj = {id: '', title: ''};
      newObj['id'] = farm._id;
      newObj['title'] = farm.name.eng;
      return newObj;
    });
  };

  const [dataSetFormatFarm, setDataSetFormatFarm] = useState(
    getDataSetFormatFarm(global.currentUserAllFarm),
  );

  console.log('DataSetFormatFarm: ', dataSetFormatFarm);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Farm));
    });
  }, [realm]);

  console.log('Selected farm: ', selectedFarm);

  const handleManageButton = () => {
    console.log('Before navigating: ', Object.values(selectedFarm));
    global.currentUserSelectedFarm = selectedFarm;
    selectedFarm
      ? navigation.navigate('Tabs')
      : console.log('No farm selected');
  };

  return (
    <SafeAreaView style={style.container}>
      <Text>Select the farm you wish to manage</Text>
      <AutocompleteDropdown
        inputContainerStyle={{
          backgroundColor: colors.primaryContainer,
          borderColor: 'gray',
          borderRadius: 25,
        }}
        textInputProps={{
          autoCorrect: false,
          autoCapitalize: 'none',
          editable: false,
          style: {
            borderRadius: 25,
            backgroundColor: colors.primaryContainer,
            color: colors.primary,
            paddingLeft: 18,
          },
        }}
        suggestionsListContainerStyle={{
          backgroundColor: colors.primaryContainer,
        }}
        renderItem={(item, text) => (
          <Text style={{color: colors.primary, padding: 15}}>{item.title}</Text>
        )}
        ChevronIconComponent={
          <Feather name="chevron-down" size={20} color={colors.primary} />
        }
        ClearIconComponent={
          <Feather name="x-circle" size={18} color={colors.primary} />
        }
        clearOnFocus={true}
        closeOnBlur={true}
        closeOnSubmit={true}
        showChevron={true}
        showClear={true}
        useFilter={false}
        initialValue={dataSetFormatFarm[0]}
        onSelectItem={item => {
          item && setSelectedFarm(item);
        }}
        dataSet={dataSetFormatFarm}
      />
      <Button
        style={style.button}
        mode="contained"
        onPress={handleManageButton}>
        Manage
      </Button>
    </SafeAreaView>
  );
};

export default FarmSelectorScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 40,
    justifyContent: 'center',
    // flexDirection: 'row',
    // flexDirection: 'column-reverse',
  },
  button: {width: '40%', alignSelf: 'flex-end', marginTop: 16},
});
