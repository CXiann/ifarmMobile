import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

const StringInput = ({label, dataFormOption, dataForm, setDataForm}) => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    textInput: {
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
      value={dataForm[dataFormOption]}
      onChangeText={value => handleOnChangeText(value)}
      style={styles.textInput}
      contentStyle={styles.content}
      placeholderTextColor={'lightgray'}
    />
  );
};

export default StringInput;
