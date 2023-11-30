import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, IconButton, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

import PieChartComponent from './pieChartComponent';
import InventoryPercentage from './inventoryPercentage';

const InventoryDetails = ({route, navigation, pieData, type}) => {
  const selectedStock = route.params.stockName;
  const selectedCardColor = route.params.cardColor;
  const selectedIcon = route.params.iconName;

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
      textAlign: 'center',
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
      <Text style={styles.titleText}>{type.toUpperCase()}</Text>
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
        onPress={() => console.log('Add New Stock')}>
        Add Stock
      </Button>
    </SafeAreaView>
  );
};

export default InventoryDetails;
