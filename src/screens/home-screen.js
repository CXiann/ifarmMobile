import React, {useEffect} from 'react';
import Realm, {BSON} from 'realm';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useGlobal} from '../contexts/GlobalContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import StockCard from '../components/stockCard';
import {realmContext} from '../../RealmContext';
import {Farm} from '../schemas/farm.schema';
import {getVisibleTagsItems} from '../utils/visibleTagsItems-utils';
import {Item_Props as itemProps} from '../constants/item-props';

const HomeScreen = ({navigation}) => {
  const {setIsLoading, farmName, farmId} = useGlobal();
  const {useRealm} = realmContext;
  const realm = useRealm();
  const today = new Date();

  useEffect(() => {
    // setIsLoading(true);
  });
  console.log('FarmId: ', farmId);

  const selectedFarmAllProps = realm
    .objects(Farm)
    .filtered('_id == $0', BSON.ObjectId(farmId));
  console.log('Current Farm All Props: ', selectedFarmAllProps);
  const allFilteredOptions = itemProps.map(prop => {
    return getVisibleTagsItems(selectedFarmAllProps, prop.options);
  });

  const fullFoliars = [...selectedFarmAllProps[0]['foliars']];

  //need to remove [0] plants later
  const fertilizersList = allFilteredOptions[1];
  const pesticidesList = allFilteredOptions[2];
  const foliarsList = allFilteredOptions[3];
  const fungicidesList = allFilteredOptions[4];
  // console.log('Display 1: ', fertilizers.length);
  // console.log('Display 2: ', pesticides.length);
  // console.log('Display 3: ', foliars.length);
  // console.log('Display 4: ', fungicides.length);
  // console.log('Name: ', visibleTagsOptions[0].name.eng);
  // console.log('Quantity: ', visibleTagsOptions[0].quantity);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.farmTitle}>
        {farmName} ({today.getDate()}/{today.getMonth() + 1}/
        {today.getFullYear()})
      </Text>
      <View style={styles.stockCardContainer}>
        <View style={styles.stockCardRow}>
          <StockCard
            stockName="Fertilizer"
            navigation={navigation}
            data={fertilizersList}
          />
          <StockCard
            stockName="Fungicide"
            navigation={navigation}
            data={fungicidesList}
          />
        </View>
        <View style={styles.stockCardRow}>
          <StockCard
            stockName="Pesticide"
            navigation={navigation}
            data={pesticidesList}
          />
          <StockCard
            stockName="Foliar"
            navigation={navigation}
            data={foliarsList}
            fullData={fullFoliars}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  farmTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stockCardContainer: {},
  stockCardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default HomeScreen;
