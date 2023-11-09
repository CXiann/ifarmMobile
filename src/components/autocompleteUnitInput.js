import React, {useRef, useEffect} from 'react';
import {StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import {SafeAreaView} from 'react-native-safe-area-context';

const AutocompleteUnitInput = ({
  label,
  dataSet,
  dataForm,
  setDataForm,
  setRefUnitFunction,
}) => {
  Feather.loadFont();
  const {colors} = useTheme();
  const dropdownController = useRef(null);

  useEffect(() => {
    setRefUnitFunction(dropdownController);
  }, []);

  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.surfaceVariant,
      paddingTop: 8,
      marginVertical: 5,
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
    <SafeAreaView style={style.container}>
      <Text variant="labelMedium" style={style.text}>
        {label}
      </Text>
      <TouchableWithoutFeedback
        onPress={() => dropdownController.current.open()}>
        <SafeAreaView>
          <AutocompleteDropdown
            controller={controller => {
              dropdownController.current = controller;
            }}
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
              <Text style={{color: colors.primary, padding: 15}}>
                {item.title}
              </Text>
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
            onSelectItem={item => {
              item && setDataForm({...dataForm, originalUnit: item.title});
            }}
            dataSet={dataSet}
          />
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default AutocompleteUnitInput;
