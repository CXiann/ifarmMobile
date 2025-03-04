import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';

const AutocompleteUnitInput = ({
  label,
  dataSet,
  dataForm,
  dataFormOption,
  setDataForm,
  setRefUnitFunction,
}) => {
  Feather.loadFont();
  const {colors} = useTheme();
  const dropdownController = useRef(null);
  const [isFocus, setIsFocus] = useState(false);

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
      borderBottomWidth: isFocus ? 2 : 0.8,
      borderBottomColor: isFocus ? colors.primary : colors.outline,
      minWidth: '100%',
    },
    text: {
      paddingHorizontal: 20,
      fontWeight: 'normal',
      color: colors.onSurfaceVariant,
      minWidth: '100%',
    },
  });
  console.log('focus: ', isFocus);
  return (
    <View style={style.container}>
      <Text variant="labelMedium" style={style.text}>
        {label}
      </Text>
      <TouchableWithoutFeedback
        onPress={() => {
          dropdownController.current.open();
          setIsFocus(true);
        }}
        onBlur={() => {
          dropdownController.current.close();
          setIsFocus(false);
        }}>
        <View>
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
              item && setDataForm({...dataForm, [dataFormOption]: item.title});
            }}
            dataSet={dataSet}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default AutocompleteUnitInput;
