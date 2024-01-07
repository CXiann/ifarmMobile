import React, {useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';

const AutoCompleteAssigneeInput = ({
  label,
  dataSet,
  id,
  title,
  dataForm,
  setDataForm,
  initialValue,
  allOption,
  setRefAssigneeFunction,
}) => {
  Feather.loadFont();
  const {colors} = useTheme();
  const dropdownController = useRef(null);

  const getDataSetFormatUser = users => {
    return users?.map(user => {
      const newObj = {id: '', title: ''};
      newObj['id'] = user[id];
      newObj['title'] = user[title].eng;
      return newObj;
    });
  };

  useEffect(() => {
    setRefAssigneeFunction(dropdownController);
  }, []);

  const dataSetFormatUser = allOption
    ? [{id: '1', title: 'All'}, ...getDataSetFormatUser(dataSet)]
    : getDataSetFormatUser(dataSet);

  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.surfaceVariant,
      paddingTop: 8,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      margin: 10,
      borderRadius: 5,
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
    <View style={style.container}>
      <Text variant="labelMedium" style={style.text}>
        {label}
      </Text>
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
          style: {color: colors.primary},
        }}
        suggestionsListTextStyle={{
          color: colors.primary,
        }}
        suggestionsListContainerStyle={{}}
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
        initialValue={initialValue ? dataSetFormatUser[0] : ''}
        onClear={() =>
          setDataForm({
            ...dataForm,
            assigneeId: '',
            assigneeName: {eng: ''},
          })
        }
        onSelectItem={item => {
          if (item && item.id !== '1') {
            setDataForm({
              ...dataForm,
              assigneeId: item.id.toString(),
              assigneeName: {eng: item.title},
              selectAllUsers: false, // Set selectAllUsers to false for other options
            });
          } else if (item && item.title === 'All') {
            setDataForm({
              ...dataForm,
              assigneeId: '',
              assigneeName: {eng: ''},
              selectAllUsers: true,
            });
          }
        }}
        dataSet={dataSetFormatUser}
      />
    </View>
  );
};

export default AutoCompleteAssigneeInput;
