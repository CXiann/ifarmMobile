import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';

const NumberInput = ({label, dataFormOption, dataForm, setDataForm}) => {
  const {colors} = useTheme();
  const [value, setValue] = useState(dataForm[dataFormOption]);

  const styles = StyleSheet.create({
    textInput: {
      marginHorizontal: 10,
      marginVertical: 5,
    },
    content: {
      color: colors.primary,
    },
  });

  const handleOnChangeText = value => {
    setValue(value);
    setDataForm({...dataForm, [dataFormOption]: value});
  };

  return (
    <TextInput
      label={label}
      mode="flat"
      value={value.toString()}
      onChangeText={value => handleOnChangeText(value)}
      style={styles.textInput}
      contentStyle={styles.content}
    />
  );
};

export default NumberInput;
