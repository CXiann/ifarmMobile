import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import AutocompleteFarmInput from '../components/autocompleteFarmInput';

import Realm, {BSON} from 'realm';
import {realmContext} from '../../RealmContext';

import {Farm} from '../schemas/farm.schema';

const FarmSelectorScreen = ({navigation}) => {
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
    global.currentUserSelectedFarmId = global.currentUserSelectedFarm.id;
    selectedFarm
      ? navigation.navigate('Tabs')
      : console.log('No farm selected');
  };

  return (
    <SafeAreaView style={style.container}>
      <Text>Select the farm you wish to manage</Text>
      <AutocompleteFarmInput
        dataSet={global.currentUserAllFarm} //Array of data to filter
        id={'_id'}
        title={'name'}
        setSelectedOption={setSelectedFarm}
        initialValue={true}
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
