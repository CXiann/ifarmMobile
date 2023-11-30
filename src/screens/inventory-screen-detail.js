import React from 'react';
import {BSON} from 'realm';
import {realmContext} from '../../RealmContext';
import {View, StyleSheet} from 'react-native';
import {Text, IconButton, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import PieChartComponent from '../components/pieChartComponent';
import InventoryPercentage from '../components/inventoryPercentage';
import {getColor} from '../utils/colorGenerator-utils';
import {useGlobal} from '../contexts/GlobalContext';
import {Farm} from '../schemas/farm.schema';

const InventoryScreenDetail = ({route, navigation}) => {
  const {useObject, useRealm} = realmContext;
  const realm = useRealm();
  const {farmId} = useGlobal();
  const farm = useObject(Farm, BSON.ObjectId(farmId));

  //all data
  const visibleData = route.params.data;
  const allData = route.params.fullData;
  const selectedStock = route.params.stockName;
  const selectedCardColor = route.params.cardColor;
  const selectedIcon = route.params.iconName;

  //volume data
  const volumeList = visibleData?.filter(
    data => data.unit == 'volume' ?? false,
  );
  //randomly generating colors
  const volumeColor = volumeList?.map(() => {
    return getColor();
  });
  const volumeColor2 = volumeList?.map(() => {
    return getColor();
  });

  //mass data
  const massList = visibleData.filter(data => data.unit == 'mass' ?? false);
  //randomly generating colors
  const massColor = massList?.map(() => {
    return getColor();
  });
  const massColor2 = massList?.map(() => {
    return getColor();
  });

  const pieData = massList?.map((data, index) => {
    return {
      value: data.quantity,
      name: data.name?.eng,
      color: massColor[index],
      gradientCenterColor: massColor2[index],
    };
  });
  console.log('Option: ', visibleData.length);
  // const pieData = [
  //   {
  //     value: 47,
  //     name: 'Item1',
  //     color: '#009FFF',
  //     gradientCenterColor: '#006DFF',
  //     focused: true,
  //   },
  //   {
  //     value: 20,
  //     name: 'Item2',
  //     color: '#93FCF8',
  //     gradientCenterColor: '#3BE9DE',
  //   },
  //   {
  //     value: 16,
  //     name: 'Item3',
  //     color: '#BDB2FA',
  //     gradientCenterColor: '#8F80F3',
  //   },
  //   {
  //     value: 40,
  //     name: 'Item4',
  //     color: '#FFA5BA',
  //     gradientCenterColor: '#FF7F97',
  //   },
  // ];
  console.log('Farm ', farm);
  const handleAddButton = () => {
    realm.write(() => {
      const addObj = {
        name: {eng: 'Test foliar 6', chs: '', cht: ''},
        unit: 'mass',
        quantity: 2.5,
      };
      farm.foliars.map(f => {
        if (f.name.eng === addObj.name.eng) {
          f.quantity = f.quantity + addObj.quantity;
        }
      });
      console.log('Farm foliar', farm.foliars);

      // lacking visible tags and normal tags
      // realm.create('farms', farm, 'modified');
      console.log('Successfully added');
    });
  };

  const getTotal = data => {
    return data.reduce((a, b) => a + b.value, 0);
  };

  const calculatePercentage = (data, value) => {
    let total = getTotal(data);
    percentage = Math.round((value / total) * 100);

    return percentage;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    topBar: {
      backgroundColor: selectedCardColor,
      height: '8%',
      minWidth: '100%',
      flexDirection: 'row',
    },
    topBarBackIcon: {
      alignSelf: 'center',
    },
    topBarText: {
      justifyContent: 'center',
      marginLeft: '3%',
      color: 'white',
    },
    legendMainRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 10,
    },
    legendFirstColumn: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 120,
      marginRight: 20,
    },
    legendSecondColumn: {
      flexDirection: 'row',
      alignItems: 'center',
      width: 120,
    },
    legendText: {
      color: '#5F6369',
      fontSize: 12,
      fontWeight: 'bold',
    },
    addStockButton: {
      backgroundColor: selectedCardColor,
      marginTop: 30,
      width: '85%',
      alignSelf: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.topBar}>
        <IconButton
          icon="arrow-left"
          iconColor="black"
          size={25}
          style={styles.topBarBackIcon}
          onPress={() => navigation.goBack()}
        />
        <SafeAreaView style={styles.topBarText}>
          <Text variant="titleLarge" style={{fontWeight: 700}}>
            {selectedStock} Details
          </Text>
        </SafeAreaView>
      </SafeAreaView>
      <PieChartComponent
        pieData={pieData}
        getTotal={getTotal}
        calculatePercentage={calculatePercentage}
      />
      <InventoryPercentage
        pieData={pieData}
        calculatePercentage={calculatePercentage}
        icon={selectedIcon}
      />
      <Button
        mode="contained"
        style={styles.addStockButton}
        onPress={() => {
          handleAddButton();
          console.log('Add New Stock');
        }}>
        Add Stock
      </Button>
    </SafeAreaView>
  );
};

export default InventoryScreenDetail;
