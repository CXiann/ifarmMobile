import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, Text} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInput = ({label, date, setDate}) => {
  const [show, setShow] = useState(false);

  const showCalendar = () => {
    setShow(true);
  };

  const handleDateCalendar = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
  };

  return (
    <>
      <TextInput
        label={label}
        mode="outlined"
        value={date.toLocaleDateString()}
        onTouchStart={() => showCalendar()}
        style={styles.textInput}
      />
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          onChange={handleDateCalendar}
        />
      )}
    </>
  );
};

export default DateInput;

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#ffffff',
  },
});
