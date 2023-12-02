import React, {useEffect, useState} from 'react';
import Realm, {BSON} from 'realm';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useGlobal} from '../contexts/GlobalContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import StockCard from '../components/stockCard';
import {realmContext} from '../../RealmContext';
import {Farm} from '../schemas/farm.schema';
import {getVisibleTagsItems} from '../utils/visibleTagsItems-utils';
import {Item_Props as itemProps} from '../constants/item-props';
import {FlatList} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  const initialState = {
    fertilizers: [],
    pesticides: [],
    foliars: [],
    fungicides: [],
  };
  const {colors} = useTheme();
  const {setIsLoading, farmName, farmId} = useGlobal();
  const {useRealm, useQuery, useObject} = realmContext;
  const realm = useRealm();
  const today = new Date();
  const filteredItemProps = itemProps.filter(prop => prop.label !== 'Plant');
  const [itemList, setItemList] = useState(initialState);
  const farms = useQuery(Farm);

  // const selectedFarmAllProps = useObject('farms',BSON.ObjectId(farmId))
  console.log('rerender');
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    farmTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary,
    },
    stockCardContainer: {},
    stockCardRow: {
      flexDirection: 'row',
      minWidth: '50%',
      justifyContent: 'center',
    },
  });

  console.log('FarmId: ', farmId);

  useEffect(() => {
    var filteredTagsList = initialState;
    // if (selectedFarmAllProps.isValid()) {
    const selectedFarmAllProps = farms.filtered(
      '_id == $0',
      BSON.ObjectId(farmId),
    );
    console.log('valid realm: ', selectedFarmAllProps.isValid());
    console.log('Current Farm All Props: ', selectedFarmAllProps);
    filteredItemProps.map(prop => {
      filteredTagsList = {
        ...filteredTagsList,
        [prop.options]: getVisibleTagsItems(selectedFarmAllProps, prop.options),
      };
    });
    // }
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(currentUserAllActivities);
    });
    setItemList(filteredTagsList);
  }, [realm]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.farmTitle}>
        {farmName} ({today.getDate()}/{today.getMonth() + 1}/
        {today.getFullYear()})
      </Text>
      <FlatList
        data={filteredItemProps}
        keyExtractor={item => item.id.toString()} // Replace 'id' with the unique identifier in your data
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
        renderItem={({item}) => (
          <StockCard navigation={navigation} data={itemList} field={item} />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
