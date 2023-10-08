import React from 'react';
import {StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';

const AutocompleteFarmInput = ({
  dataSet,
  id,
  title,
  setSelectedOption,
  initialValue,
}) => {
  Feather.loadFont();
  const {colors} = useTheme();

  const getDataSetFormatFarm = farms => {
    return farms.map(farm => {
      const newObj = {id: '', title: ''};
      newObj['id'] = farm[id];
      newObj['title'] = farm[title].eng;
      return newObj;
    });
  };

  const dataSetFormatFarm = getDataSetFormatFarm(dataSet);

  return (
    <AutocompleteDropdown
      inputContainerStyle={{
        backgroundColor: colors.primaryContainer,
        borderColor: 'gray',
        borderRadius: 25,
      }}
      textInputProps={{
        autoCorrect: false,
        autoCapitalize: 'none',
        editable: false,
        style: {
          borderRadius: 25,
          backgroundColor: colors.primaryContainer,
          color: colors.primary,
          paddingLeft: 18,
        },
      }}
      suggestionsListContainerStyle={{
        backgroundColor: colors.primaryContainer,
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
      initialValue={initialValue ? dataSetFormatFarm[0] : undefined}
      onSelectItem={item => {
        item && setSelectedOption(item);
      }}
      dataSet={dataSetFormatFarm}
    />
  );
};

export default AutocompleteFarmInput;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 40,
    justifyContent: 'center',
    // flexDirection: 'row',
    // flexDirection: 'column-reverse',
  },
});
