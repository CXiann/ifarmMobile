import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const TaskInput = ({label, dataForm, setDataForm}) => {
  const [text, setText] = useState('');

  const handleTextChange = newText => {
    setText(newText);
    setDataForm({...dataForm, title: newText});
  };

  return (
    <TextInput
      mode="flat"
      placeholder="Enter Task Descriptions"
      label={label}
      value={text}
      onChangeText={handleTextChange}
      style={styles.textInput}
    />
  );
};

export default TaskInput;

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 10,
    marginVertical: 5,
    minWidth: '100%',
    // backgroundColor: '#ffffff',
  },
});
