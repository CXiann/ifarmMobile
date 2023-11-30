import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
// import {Text} from 'react-native-paper';
import {useGlobal} from '../contexts/GlobalContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import StockCard from '../components/stockCard';

const HomeScreen = ({navigation}) => {
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
          <StockCard stockName="Fertilizer" navigation={navigation} />
          <StockCard stockName="Fungicide" navigation={navigation} />
        </View>
        <View style={styles.stockCardRow}>
          <StockCard stockName="Pesticide" navigation={navigation} />
          <StockCard stockName="Foliar" navigation={navigation} />
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
