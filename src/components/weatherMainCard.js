import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Card, Text, Avatar} from 'react-native-paper';

const WeatherMainCard = () => {
  const apiKey = '5590393c7e6c435088a62959230906';
  const days = 5;
  const apiUrl = 'https://api.weatherapi.com/v1/forecast.json';

  const [city, setCity] = useState('Kuala Lumpur');
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `${apiUrl}?key=${apiKey}&q=${city}&days=${days}&aqi=no&alerts=yes`,
      );
      const data = await response.json();
      setWeatherData(data);
      console.log('Weather Data: ', data);
    };

    fetchWeatherData();
  }, []);

  return (
    <View>
      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={() => <Avatar.Icon icon="folder" />}
          right={() => <Text>Location</Text>}
        />
        <Card.Content>
          <Text>Card content</Text>
        </Card.Content>
      </Card>
    </View>
  );
};

export default WeatherMainCard;
