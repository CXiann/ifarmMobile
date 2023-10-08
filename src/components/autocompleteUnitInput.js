import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';

const AutocompleteUnitInput = ({
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
      backgroundColor: 'white',
      paddingTop: 8,
      // paddingHorizontal: 20,
      margin: 8,
      borderRadius: 5,
      borderBottomWidth: 1,
      borderBottomColor: colors.outline,
    },
    text: {
      paddingHorizontal: 20,
      color: colors.onSurface,
    },
  });
  return (
    <SafeAreaView style={style.container}>
      <Text variant="labelMedium" style={style.text}>
        {label}
      </Text>
      <AutocompleteDropdown
        inputContainerStyle={{
          backgroundColor: 'white',
          borderColor: 'gray',
          paddingHorizontal: 8,
        }}
        textInputProps={{
          autoCorrect: false,
          autoCapitalize: 'none',
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
        closeOnBlur={true}
        closeOnSubmit={true}
        useFilter={false}
        initialValue={initialValue ? dataSet[0] : undefined}
        onSelectItem={item => {
          item && setDataForm({...dataForm, unit: item.title});
        }}
        dataSet={dataSet}
      />
    </SafeAreaView>
  );
};

export default AutocompleteUnitInput;
