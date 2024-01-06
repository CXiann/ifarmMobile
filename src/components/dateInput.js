import React, {useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {TextInput, useTheme} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateInput = ({
  label,
  dataForm, //dataForm accept object in the form {date:Date()}
  setDataForm,
  minWidth,
  dateFieldName,
  minimumDate = null,
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
    <View>
      <TouchableWithoutFeedback onPress={showCalendar}>
        <View>
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
        </View>
      </TouchableWithoutFeedback>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dataForm[dateFieldName]}
          mode="date"
          onChange={handleDateCalendar}
          minimumDate={minimumDate}
        />
      )}
    </View>
  );
};

export default DateInput;
