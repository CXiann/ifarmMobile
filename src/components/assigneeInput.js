import React, {useState} from 'react';
import {AutoCompleteDropdown} from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather';
import {StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

const AssigneeInput = () => {
  const [names, setNames] = useState(['John', 'Jane', 'Bob', 'Alice']);
  const [selectedName, setSelectedName] = useState('');

  const handleNameSelect = name => {
    setSelectedName(name);
  };

  Feather.loadFont();
  const {colors} = useTheme();

  return (
    // <AutoCompleteDropdown
    //   label="Assignee"
    //   value={selectedName}
    //   data={names}
    //   onChangeText={handleNameSelect}
    // />
    <Text>Assignee</Text>
  );
};

export default AssigneeInput;
