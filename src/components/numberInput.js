import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const NumberInput = ({label, dataFormOption, dataForm, setDataForm}) => {
  const [value, setValue] = useState(dataForm[dataFormOption]);

  const handleOnChangeText = value => {
    setValue(value);
    setDataForm({...dataForm, [dataFormOption]: value});
  };

  return (
    <TextInput
      label={label}
      mode="outlined"
      value={value.toString()}
      onChangeText={value => handleOnChangeText(value)}
      style={styles.textInput}
    />
  );
};

export default NumberInput;

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 10,
    marginVertical: 5,
    //   backgroundColor: '#ffffff',
  },
});
