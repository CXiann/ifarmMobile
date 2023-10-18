import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SafeAreaView} from 'react-native-safe-area-context';

const DateInput = ({label, data, setData}) => {
  const {colors} = useTheme();

  const [show, setShow] = useState(false);
  const [date, setDate] = useState(data?.date || data);

  const showCalendar = () => {
    setShow(true);
  };

  const handleDateCalendar = (event, selectedDate) => {
    setShow(false);
    setDate(selectedDate);
    data?.date ? setData({...data, date: selectedDate}) : setData(selectedDate);
  };

  return (
    <SafeAreaView>
      <TextInput
        label={label}
        mode="flat"
        value={date.toLocaleDateString()}
        editable={false}
        right={
          <TextInput.Icon
            icon="calendar"
            color={colors.primary}
            onPress={() => {
              showCalendar();
            }}
          />
        }
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

export default DateInput;

const styles = StyleSheet.create({
  textInput: {
    marginHorizontal: 10,
    marginVertical: 5,
    minWidth: '100%',
    // backgroundColor: '#ffffff',
  },
});
