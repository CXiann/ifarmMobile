import React, {useState} from 'react';
import {StyleSheet, Keyboard} from 'react-native';
import {TextInput, useTheme, Button, IconButton} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

const FieldInput = ({label, dataForm, setDataForm}) => {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    textInput: {
      minWidth: '70%',
      borderRadius: 0,
      flex: 1,
    },
    content: {
      color: colors.primary,
    },
  });

  const handleOnChangeText = value => {
    console.log(value);
    setDataForm({...dataForm, field: value});
  };

  return (
    <SafeAreaView style={{flexDirection: 'row'}}>
      <SafeAreaView
        style={{
          backgroundColor: colors.surfaceVariant,
          maxWidth: '15%',
          flex: 1,
          alignItems: 'center',
          borderTopLeftRadius: 5,
        }}>
        <IconButton
          icon="chevron-down"
          iconColor={colors.primary}
          onPress={() => {
            setDataForm({
              ...dataForm,
              field: (
                parseInt(dataForm.field == '' ? 0 : dataForm.field) - 1
              ).toString(),
            });
          }}
        />
      </SafeAreaView>
      <SafeAreaView style={{backgroundColor: colors.surfaceVariant}}>
        <TextInput
          label={label}
          mode="flat"
          value={dataForm.field}
          onChangeText={value => handleOnChangeText(value)}
          style={styles.textInput}
          contentStyle={styles.content}
        />
      </SafeAreaView>
      <SafeAreaView
        style={{
          backgroundColor: colors.surfaceVariant,
          maxWidth: '15%',
          flex: 1,
          alignItems: 'center',
          borderTopRightRadius: 5,
        }}>
        <IconButton
          icon="chevron-up"
          iconColor={colors.primary}
          onPress={() => {
            setDataForm({
              ...dataForm,
              field: (
                parseInt(dataForm.field == '' ? 0 : dataForm.field) + 1
              ).toString(),
            });
          }}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default FieldInput;
