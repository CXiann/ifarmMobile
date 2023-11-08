import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Card, Text, Avatar, IconButton} from 'react-native-paper';
import {useGlobal} from '../contexts/GlobalContext';
import LocationInput from './locationInput';

const WeatherMainCard = () => {
  const apiKey = '49fc111d10474a59b9e115511232710';
  const days = 5;
  const apiUrl = 'https://api.weatherapi.com/v1/forecast.json';

  const [city, setCity] = useState('Kuala Lumpur');
  const {currentWeatherData, setCurrentWeatherData} = useGlobal();

  useEffect(() => {
    const fetchWeatherData = async () => {
      console.log('Fetching Weather Data...');
      const response = await fetch(
        `${apiUrl}?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=yes`,
      );
      await setCurrentWeatherData(await response.json());
      console.log('Weather Data: ', currentWeatherData);
    };
    fetchWeatherData();
  }, [city]);

  return (
    <View style={styles.weatherCardWrapper}>
      <Card style={styles.weatherCard}>
        <Card.Content>
          <View style={styles.container}>
            <View style={styles.topRow}>
              <Avatar.Icon
                size={33}
                icon="pin"
                color="white"
                style={styles.locationIcon}
              />
              <LocationInput
                style={styles.locationText}
                city={city}
                setCity={setCity}
                country={currentWeatherData.location?.country}></LocationInput>
              <View></View>
            </View>
            <View style={styles.middleRow}>
              <View style={styles.temperatureColumn}>
                <Text style={styles.numTemperature}>
                  {currentWeatherData.current?.temp_c}°C
                </Text>
                <Text style={styles.unitTemperature}>Celsius</Text>
              </View>
              <View style={styles.weatherIconColumn}>
                <Image
                  style={styles.weatherIcon}
                  source={{
                    uri: 'https:' + currentWeatherData.current?.condition.icon,
                  }}
                />
              </View>
            </View>
            <View style={styles.descriptionRow}>
              <Text style={styles.weatherDescription}>
                {currentWeatherData.current?.condition.text} with{' '}
                {currentWeatherData.current?.humidity}% humidity
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherCardWrapper: {
    flex: 1,
    justifyContent: 'start',
    margin: 10,
    width: '90%',
  },
  weatherCard: {
    width: '100%',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: '#01B67D',
  },
  container: {
    // flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10,
  },
  locationIcon: {
    backgroundColor: '#6BF216',
  },
  locationTitle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationText: {
    fontSize: 15,
    color: 'white',
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIcon: {
    backgroundColor: 'white',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  numTemperature: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  weatherIcon: {
    marginLeft: 30,
    width: 80,
    height: 80,
  },
  unitTemperature: {
    fontSize: 20,
    color: 'white',
  },
  descriptionRow: {
    alignItems: 'start',
    marginTop: 16,
  },
  weatherDescription: {
    color: 'white',
    fontSize: 13,
  },
});

export default WeatherMainCard;
