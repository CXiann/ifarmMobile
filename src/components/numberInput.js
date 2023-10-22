import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

const NumberInput = ({
  label,
  dataFormOption,
  dataForm,
  setDataForm,
  myKey = 'none',
}) => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    textInput: {
      marginHorizontal: 10,
      marginVertical: 5,
      minWidth: '100%',
    },
    content: {
      color: colors.primary,
    },
  });

  const handleOnChangeText = value => {
    setDataForm({...dataForm, [dataFormOption]: value});
  };

  return (
    <TextInput
      key={myKey != 'none' ? null : myKey} //any unique value(can even be hard coded value)
      label={label}
      mode="flat"
      value={dataForm[dataFormOption]}
      onChangeText={value => handleOnChangeText(value)}
      style={styles.textInput}
      contentStyle={styles.content}
    />
  );
};

export default NumberInput;
