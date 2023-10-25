import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Text} from 'react-native-paper';
import {useGlobal} from '../contexts/GlobalContext';
import WeatherMainCard from '../components/weatherMainCard';

const HomeScreen = () => {
  const {setIsLoading} = useGlobal();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  useEffect(() => {
    setIsLoading(false);
  });
  return (
    <View style={styles.container}>
      {/* <Text variant="headlineMedium">Home!</Text> */}
      <WeatherMainCard />
    </View>
  );
};

export default HomeScreen;
