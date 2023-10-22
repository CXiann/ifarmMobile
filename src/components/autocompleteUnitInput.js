import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';

const AutocompleteUnitInput = ({
  myKey = 'none',
  label,
  dataSet,
  dataForm,
  setDataForm,
  initialValue,
}) => {
  Feather.loadFont();
  const {colors} = useTheme();

  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.surfaceVariant,
      paddingTop: 8,
      margin: 10,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      borderBottomWidth: 1,
      borderBottomColor: colors.outline,
      minWidth: '100%',
    },
    text: {
      paddingHorizontal: 20,
      fontWeight: 'normal',
      color: colors.onSurfaceVariant,
      minWidth: '100%',
    },
  });
  return (
    <SafeAreaView
      key={myKey != 'none' ? null : myKey} //any unique value(can even be hard coded value)
      style={style.container}>
      <Text variant="labelMedium" style={style.text}>
        {label}
      </Text>
      <AutocompleteDropdown
        inputContainerStyle={{
          backgroundColor: colors.surfaceVariant,
          borderColor: 'gray',
          paddingHorizontal: 8,
        }}
        textInputProps={{
          autoCorrect: false,
          autoCapitalize: 'none',
          editable: false,
          style: {color: colors.primary},
        }}
        suggestionsListTextStyle={{
          color: colors.primary,
        }}
        renderItem={(item, text) => (
          <Text style={{color: colors.primary, padding: 15}}>{item.title}</Text>
        )}
        ChevronIconComponent={
          <Feather name="chevron-down" size={20} color={colors.primary} />
        }
        ClearIconComponent={
          <Feather name="x-circle" size={18} color={colors.primary} />
        }
        showClear={false}
        closeOnBlur={true}
        closeOnSubmit={true}
        useFilter={false}
        initialValue={initialValue ? dataSet[0] : ''}
        onSelectItem={item => {
          item && setDataForm({...dataForm, unit: item.title});
        }}
        dataSet={dataSet}
      />
    </SafeAreaView>
  );
};

export default AutocompleteUnitInput;
