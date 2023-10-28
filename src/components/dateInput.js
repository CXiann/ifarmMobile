import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SafeAreaView} from 'react-native-safe-area-context';

const DateInput = ({
  label,
  dataForm, //dataForm accept object in the form {date:Date()}
  setDataForm,
  minWidth,
  dateFieldName,
  myKey = 'none',
}) => {
  const {colors} = useTheme();
  const styles = StyleSheet.create({
    textInput: {
      marginVertical: 5,
      minWidth: minWidth,
    },
  });

  const [show, setShow] = useState(false);

  const showCalendar = () => {
    setShow(true);
  };

  const handleDateCalendar = (event, selectedDate) => {
    setShow(false);
    setDataForm({...dataForm, [dateFieldName]: selectedDate});
  };

  return (
    <SafeAreaView
      key={myKey == 'none' ? null : myKey} //any unique value(can even be hard coded value)
    >
      <TextInput
        label={label}
        mode="flat"
        value={dataForm[dateFieldName].toLocaleDateString()}
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
          value={dataForm[dateFieldName]}
          mode="date"
          onChange={handleDateCalendar}
        />
      )}
    </SafeAreaView>
  );
};

export default DateInput;
