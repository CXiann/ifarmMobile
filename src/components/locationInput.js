import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const LocationInput = ({label, city, setCity, country}) => {
  const [tempCity, setTempCity] = useState(city);
  const handleTextChange = newLocation => {
    setTempCity(newLocation);
  };

  const handleLocationChange = () => {
    setCity(tempCity);
  };

  return (
    <TextInput
      mode="outlined"
      placeholder="Enter New Location"
      value={tempCity}
      onChangeText={handleTextChange}
      style={styles.textInput}
      textColor="white"
      activeOutlineColor="#6BF216"
      outlineColor="#01B67D"
      onBlur={handleLocationChange}
    />
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 10,
    width: '80%',
    backgroundColor: '#01B67D',
  },
});
