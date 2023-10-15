import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

const FieldInput = ({label, dataForm, setDataForm}) => {
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
    const numericPattern = /^[0-9]+$/;
    console.log(value);
    // if (numericPattern.test(value)) {
    //   setDataForm({...dataForm, field: value});
    // }
    setDataForm({...dataForm, field: value});
  };
  console.log('field: ', dataForm.field);

  return (
    <TextInput
      label={label}
      mode="flat"
      value={dataForm.field}
      onChangeText={value => handleOnChangeText(value)}
      right={
        <TextInput.Icon
          icon="chevron-up"
          color={colors.primary}
          onPress={() => {
            setDataForm({
              ...dataForm,
              field: (
                parseInt(dataForm.field == '' ? 0 : dataForm.field) + 1
              ).toString(),
            });
          }}
        />
      }
      left={
        <TextInput.Icon
          icon="chevron-down"
          color={colors.primary}
          onPress={() => {
            setDataForm({
              ...dataForm,
              field: (
                parseInt(dataForm.field == '' ? 0 : dataForm.field) - 1
              ).toString(),
            });
          }}
        />
      }
      style={styles.textInput}
      contentStyle={styles.content}
    />
  );
};

export default FieldInput;
