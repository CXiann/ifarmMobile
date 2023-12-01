import React, {useState, useEffect} from 'react';
import {BSON} from 'realm';
import {realmContext} from '../../RealmContext';
import {StyleSheet} from 'react-native';
import {Text, IconButton, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getColor} from '../utils/colorGenerator-utils';
import {useGlobal} from '../contexts/GlobalContext';
import {Farm} from '../schemas/farm.schema';

import PieChartComponent from './pieChartComponent';
import InventoryPercentage from './inventoryPercentage';

const InventoryDetails = ({route, navigation, type, action}) => {
  const {useObject, useRealm} = realmContext;
  const realm = useRealm();
  const {farmId} = useGlobal();
  const farm = useObject(Farm, BSON.ObjectId(farmId));
  const [pieData, setPieData] = useState(null);

  const visibleData = route.params.data;
  const allData = route.params.fullData;
  const selectedStock = route.params.stockName;
  const selectedCardColor = route.params.cardColor;
  const selectedIcon = route.params.iconName;

  useEffect(() => {
    const unit = type == 'Liquid' ? 'ℓ' : 'kg';
    const displayList = visibleData?.filter(data => data.unit == unit ?? false);
    setPieData(
      displayList?.map(data => {
        const colors = getColor();
        return {
          value: data.quantity,
          name: data.name?.eng,
          unit: data.unit,
          color: colors[0],
          gradientCenterColor: colors[1],
        };
      }),
    );
  }, [type, allData, realm]);

  console.log('Option: ', visibleData.length);

  console.log('Farm ', farm);
  const handleAddButton = () => {
    navigation.navigate('Add Item', {action: action});
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
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingLeft: 10,
      // textAlign: 'center',
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
      width: '100%',
      alignSelf: 'center',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>{type.toUpperCase()}</Text>
      <PieChartComponent
        pieData={pieData ?? []}
        getTotal={getTotal}
        calculatePercentage={calculatePercentage}
      />
      <InventoryPercentage
        pieData={pieData ?? []}
        calculatePercentage={calculatePercentage}
        icon={selectedIcon}
      />
      <Button
        mode="contained"
        style={styles.addStockButton}
        onPress={() => handleAddButton()}>
        Add Inventory
      </Button>
    </SafeAreaView>
  );
};

export default InventoryDetails;
