import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SafeAreaView} from 'react-native-safe-area-context';

const ActivityScreenAddForm = () => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const handleDateCalendar = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
  };

  const showCalendar = () => {
    setShow(true);
  };

  return (
    <SafeAreaView>
      <TextInput
        label="Date"
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
    </SafeAreaView>
  );
};

export default ActivityScreenAddForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginHorizontal: 10,
    marginVertical: 5,
  },
  textInput: {
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#ffffff',
  },
});
