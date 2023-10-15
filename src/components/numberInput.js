import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

const NumberInput = ({label, dataFormOption, dataForm, setDataForm}) => {
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
      label={label}
      mode="flat"
      value={dataForm?.dataFormOption?.toString()}
      onChangeText={value => handleOnChangeText(value)}
      style={styles.textInput}
      contentStyle={styles.content}
    />
  );
};

export default NumberInput;
