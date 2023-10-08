import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const FieldInput = ({label, dataForm, setDataForm}) => {
  const [field, setField] = useState(dataForm['field']);

  const handleOnChangeText = field => {
    setField(field);
    setDataForm({...dataForm, field: field});
  };

  return (
    <TextInput
      label={label}
      mode="outlined"
      value={field.toString()}
      onChangeText={field => handleOnChangeText(field)}
      right={
        <TextInput.Icon
          icon="chevron-up"
          onPress={() => {
            setField(field + 1);
          }}
        />
      }
      left={
        <TextInput.Icon
          icon="chevron-down"
          onPress={() => {
            setField(field - 1);
          }}
        />
      }
      style={styles.textInput}
    />
  );
};

export default FieldInput;

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 10,
    marginVertical: 5,
    //   backgroundColor: '#ffffff',
  },
});
