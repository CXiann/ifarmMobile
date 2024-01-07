import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TextInput, useTheme, IconButton} from 'react-native-paper';

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
    <View style={{flexDirection: 'row'}}>
      <View
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
      </View>
      <View style={{backgroundColor: colors.surfaceVariant}}>
        <TextInput
          label={label}
          mode="flat"
          value={dataForm.field}
          onChangeText={value => handleOnChangeText(value)}
          style={styles.textInput}
          contentStyle={styles.content}
        />
      </View>
      <View
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
      </View>
    </View>
  );
};

export default FieldInput;
