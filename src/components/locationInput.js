import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const LocationInput = ({label, city, setCity, country}) => {
  const handleLocationChange = newLocation => {
    setCity(newLocation);
  };

  return (
    <TextInput
      mode="flat"
      placeholder="Enter New Location"
      // label={label}
      value={city}
      onChangeText={handleLocationChange}
      style={styles.textInput}
    />
  );
};

export default LocationInput;

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 10,
    marginVertical: 5,
    minWidth: '100%',
    // backgroundColor: '#ffffff',
  },
});
