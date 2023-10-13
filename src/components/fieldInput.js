import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

const FieldInput = ({label, dataForm, setDataForm}) => {
  const {colors} = useTheme();
  const [field, setField] = useState(dataForm['field']);

  const styles = StyleSheet.create({
    textInput: {
      marginHorizontal: 10,
      marginVertical: 5,
    },
    content: {
      color: colors.primary,
    },
  });

  const handleOnChangeText = field => {
    setField(field);
    setDataForm({...dataForm, field: field});
  };

  return (
    <TextInput
      label={label}
      mode="flat"
      value={field.toString()}
      onChangeText={field => handleOnChangeText(field)}
      right={
        <TextInput.Icon
          icon="chevron-up"
          color={colors.primary}
          onPress={() => {
            setField(field + 1);
          }}
        />
      }
      left={
        <TextInput.Icon
          icon="chevron-down"
          color={colors.primary}
          onPress={() => {
            setField(field - 1);
          }}
        />
      }
      style={styles.textInput}
      contentStyle={styles.content}
    />
  );
};

export default FieldInput;
