import React, {useEffect, useState} from 'react';
import Realm, {BSON} from 'realm';
import {
  StatusBar,
  StyleSheet,
  View,
  Platform,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import {useGlobal} from '../contexts/GlobalContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import StockCard from '../components/stockCard';
import {realmContext} from '../../RealmContext';
import {Farm} from '../schemas/farm.schema';
import {getVisibleTagsItems} from '../utils/visibleTagsItems-utils';
import {Item_Props as itemProps} from '../constants/item-props';
import {FlatList} from 'react-native-gesture-handler';
import WeatherMainCard from '../components/weatherMainCard';

const HomeScreen = ({navigation}) => {
  const initialState = {
    fertilizers: [],
    pesticides: [],
    foliars: [],
    fungicides: [],
  };
  const monthOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  const {colors} = useTheme();
  const {userName, userData, farmName, farmId} = useGlobal();
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
      marginBottom: 10,
      width: '70%',
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
        [prop.options]: selectedFarmAllProps[0][prop.options],
      };
    });
    // }
    setItemList(filteredTagsList);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: 'yellowgreen'}}>Farm Name</Text>
      <SafeAreaView
        style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.farmTitle}>{farmName}</Text>
        <Text style={{color: colors.outline}}>
          {today.getDate()} {monthOfYear[today.getMonth()]}{' '}
          {today.getFullYear()}
        </Text>
      </SafeAreaView>
      <Text style={{color: 'yellowgreen'}}>User Name</Text>
      <Text style={styles.farmTitle}>
        {userName}
        <Text style={{color: 'yellowgreen'}}>({userData.role})</Text>
      </Text>
      <FlatList
        // style={{flex: 1}}
        data={filteredItemProps}
        keyExtractor={item => item.id.toString()} // Replace 'id' with the unique identifier in your data
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
        ListHeaderComponent={<WeatherMainCard />}
        renderItem={({item}) => (
          <StockCard navigation={navigation} data={itemList} field={item} />
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
