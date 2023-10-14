import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import AutocompleteFarmInput from '../components/autocompleteFarmInput';
import Realm, {BSON} from 'realm';
import {realmContext} from '../../RealmContext';
import {useGlobal} from '../contexts/GlobalContext';

import {Farm} from '../schemas/farm.schema';

const FarmSelectorScreen = ({navigation}) => {
  const {useQuery, useRealm} = realmContext;
  const {userData, setFarmId} = useGlobal();
  const realm = useRealm();

  const farms = useQuery(Farm);
  const [selectedFarm, setSelectedFarm] = useState({id: '', title: ''}); //store farm information in {id:objectId(string), title:}

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Farm));
    });
    console.log('Total farms: ', farms.length);
  }, [realm]);

  const currentUserAllFarmBSONId = userData?.farms?.map(
    farmIdStr => new BSON.ObjectId(farmIdStr),
  );
  const allFarmData = farms.filtered('_id IN $0', currentUserAllFarmBSONId);
  // setAllFarmData(farms.filtered('_id IN $0', currentUserAllFarmBSONId));
  console.log('User All farms: ', allFarmData?.length);
  console.log('Selected farm: ', selectedFarm);

  const handleManageButton = () => {
    console.log('Before navigating: ', Object.values(selectedFarm));
    setFarmId(selectedFarm.id);
    selectedFarm
      ? navigation.navigate('Tabs')
      : console.log('No farm selected');
  };

  return (
    <SafeAreaView style={style.container}>
      <Text>Select the farm you wish to manage</Text>
      <AutocompleteFarmInput
        dataSet={allFarmData} //Array of data to filter
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
