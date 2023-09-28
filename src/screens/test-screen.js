import React, {useEffect, useState} from 'react';

import Realm from 'realm';
import {realmContext} from '../../RealmContext';
import {Foliar} from '../schemas/foliar.schema';
import {Fertilizer} from '../schemas/fertilizer.schema';

import {View, StyleSheet, ScrollView} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const TestScreen = () => {
  const [foliar, setFoliar] = useState('');
  const [foliarTags, setFoliarTags] = useState('');
  const [fertilizer, setFertilizer] = useState('');
  const [fertilizerTags, setFertilizerTags] = useState('');

  const {useRealm, useObject, useQuery} = realmContext;

  const realm = useRealm();
  const readFoliars = useQuery(Foliar);
  const readFertilizers = useQuery(Fertilizer);

  const allSubscriptionState = realm.subscriptions.state;

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Foliar));
    });
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Fertilizer));
    });
  }, [realm, Foliar, Fertilizer]);

  const handleAddFoliar = () => {
    var strArrFoliarTags = foliarTags.split(',');
    realm.write(() => {
      console.log(strArrFoliarTags);
      realm.create('foliars', {name: foliar, tags: strArrFoliarTags});
      console.log('Successfully create data');
    });
  };

  const handleAddFertilizer = () => {
    var strArrFertilizerTags = fertilizerTags.split(',');
    realm.write(() => {
      console.log(strArrFertilizerTags);
      realm.create('fertilizers', {
        name: fertilizer,
        tags: strArrFertilizerTags,
      });
      console.log('Successfully create data');
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <TextInput
          label="Foliar Name"
          mode="outlined"
          value={foliar}
          onChangeText={foliar => setFoliar(foliar)}
          style={{margin: 10}}
        />
        <TextInput
          label="Foliar Tags"
          mode="outlined"
          value={foliarTags}
          onChangeText={foliarTags => setFoliarTags(foliarTags)}
          style={{margin: 10}}
        />
        <Button
          mode="contained"
          onPress={() => handleAddFoliar()}
          style={{width: 100, alignSelf: 'flex-end', margin: 20}}>
          Submit
        </Button>
        {readFoliars ? (
          <Text variant="displayMedium">{readFoliars.length}</Text>
        ) : (
          <Text variant="displayMedium">No Data Found</Text>
        )}
        <Text variant="displayMedium">{allSubscriptionState}</Text>
        {/* Fertilizers */}
        <TextInput
          label="Fertilizer Name"
          mode="outlined"
          value={fertilizer}
          onChangeText={fertilizer => setFertilizer(fertilizer)}
          style={{margin: 10}}
        />
        <TextInput
          label="Fertilizer Tags"
          mode="outlined"
          value={fertilizerTags}
          onChangeText={fertilizerTags => setFertilizerTags(fertilizerTags)}
          style={{margin: 10}}
        />
        <Button
          mode="contained"
          onPress={() => handleAddFertilizer()}
          style={{width: 100, alignSelf: 'flex-end', margin: 20}}>
          Submit
        </Button>
        {readFertilizers ? (
          <Text variant="displayMedium">{readFertilizers.length}</Text>
        ) : (
          <Text variant="displayMedium">No Data Found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
