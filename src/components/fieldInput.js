import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

const FieldInput = ({label, dataForm, setDataForm}) => {
  const {colors} = useTheme();
  const [field, setField] = useState(dataForm['field'].toString());

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
    const parsedValue = parseInt(value);
    if (!isNaN(parsedValue)) {
      setField(parsedValue.toString());
      setDataForm({...dataForm, field: parsedValue});
    }
  };

  return (
    <TextInput
      label={label}
      mode="flat"
      value={field}
      onChangeText={value => handleOnChangeText(value)}
      right={
        <TextInput.Icon
          icon="chevron-up"
          color={colors.primary}
          onPress={() => {
            setField((parseInt(field) + 1).toString());
          }}
        />
      }
      left={
        <TextInput.Icon
          icon="chevron-down"
          color={colors.primary}
          onPress={() => {
            setField((parseInt(field) - 1).toString());
          }}
        />
      }
      style={styles.textInput}
      contentStyle={styles.content}
    />
  );
};

export default FieldInput;
