import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, IconButton, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import PieChartComponent from '../components/pieChartComponent';
import InventoryPercentage from '../components/inventoryPercentage';
import {getColor} from '../utils/colorGenerator-utils';

const InventoryScreenDetail = ({route, navigation}) => {
  //all data
  const allData = route.params.data;
  const selectedStock = route.params.stockName;
  const selectedCardColor = route.params.cardColor;
  const selectedIcon = route.params.iconName;

  //volume data
  const volumeList = allData?.filter(data =>
    data.quantity?.volume ? true : false,
  );
  const volumeColor = volumeList?.map(() => {
    return getColor();
  });
  const volumeColor2 = volumeList?.map(() => {
    return getColor();
  });

  //mass data
  const massList = allData.filter(data => (data.quantity?.mass ? true : false));

  const pieData = volumeList?.map((data, index) => {
    return {
      value: data.quantity?.volume,
      name: data.name?.eng,
      color: volumeColor[index],
      gradientCenterColor: volumeColor2[index],
    };
  });
  console.log('Option: ', allData.length);
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
        onPress={() => console.log('Add New Stock')}>
        Add Stock
      </Button>
    </SafeAreaView>
  );
};

export default InventoryScreenDetail;
