import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useGlobal} from '../contexts/GlobalContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import StockCard from '../components/stockCard';

const HomeScreen = () => {
  const {setIsLoading, farmName} = useGlobal();
  const today = new Date();

  useEffect(() => {
    // setIsLoading(true);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.farmTitle}>
        {farmName} ({today.getDate()}/{today.getMonth() + 1}/
        {today.getFullYear()})
      </Text>
      <View style={styles.stockCardContainer}>
        <View style={styles.stockCardRow}>
          <StockCard stockName="Fertilizer" />
          <StockCard stockName="Fungicide" />
        </View>
        <View style={styles.stockCardRow}>
          <StockCard stockName="Pesticide" />
          <StockCard stockName="Foliar" />
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
  stockCardContainer: {
    marginTop: 10,
  },
  stockCardRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default HomeScreen;
