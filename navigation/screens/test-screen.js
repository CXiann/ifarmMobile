import React, {useEffect, useState} from 'react';

import Realm from 'realm';
import {realmContext} from '../../RealmContext';
import {Foliar} from '../../schemas/foliar.schema';

import {View, StyleSheet, SafeAreaView} from 'react-native';
import {TextInput, Button, Text} from 'react-native-paper';

const TestScreen = () => {
  const [foliar, setFoliar] = useState('');
  const [foliarTags, setFoliarTags] = useState('');

  const {useRealm, useObject, useQuery} = realmContext;
  const realm = useRealm();
  const readFoliars = useQuery(Foliar);

  const allSubscriptionState = realm.subscriptions.state;

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(Foliar));
    });
  });

  const handleAddFoliar = () => {
    var strArrFoliarTags = foliarTags.split(',');
    realm.write(() => {
      console.log(strArrFoliarTags);
      realm.create('foliars', {name: foliar, tags: strArrFoliarTags});
      console.log('Successfully create data');
    });
  };

  return (
    <SafeAreaView>
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
