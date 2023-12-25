import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import {Dropdown} from 'react-native-element-dropdown';
import {SafeAreaView} from 'react-native-safe-area-context';

const AutocompleteFarmInput = ({
  dataSet,
  id,
  title,
  setSelectedOption,
  selectedOption,
}) => {
  Feather.loadFont();
  const {colors} = useTheme();

  useEffect(() => {
    setSelectedOption({
      ...selectedOption,
      id: dataSetFormatFarm[0].id,
      title: dataSetFormatFarm[0].title,
    });
  }, []);

  const getDataSetFormatFarm = farms => {
    return farms?.map(farm => {
      const newObj = {id: '', title: ''};
      newObj['id'] = farm[id].toString();
      newObj['title'] = farm[title].eng.toString();
      return newObj;
    });
  };

  const dataSetFormatFarm = getDataSetFormatFarm(dataSet);
  const [isFocus, setIsFocus] = useState(false);
  const [value, setValue] = useState(dataSetFormatFarm[0]);

  // console.log('Test: ', Object.values(dataSetFormatFarm));

  return (
    // <AutocompleteDropdown
    //   inputContainerStyle={{
    //     backgroundColor: colors.primaryContainer,
    //     borderColor: 'gray',
    //     borderRadius: 25,
    //   }}
    //   textInputProps={{
    //     autoCorrect: false,
    //     autoCapitalize: 'none',
    //     editable: false,
    //     style: {
    //       borderRadius: 25,
    //       backgroundColor: colors.primaryContainer,
    //       color: colors.primary,
    //       paddingLeft: 18,
    //     },
    //   }}
    //   suggestionsListContainerStyle={{
    //     backgroundColor: colors.primaryContainer,
    //   }}
    //   renderItem={(item, text) => (
    //     <Text style={{color: colors.primary, padding: 15}}>{item.title}</Text>
    //   )}
    //   ChevronIconComponent={
    //     <Feather name="chevron-down" size={20} color={colors.primary} />
    //   }
    //   ClearIconComponent={
    //     <Feather name="x-circle" size={18} color={colors.primary} />
    //   }
    //   closeOnBlur={true}
    //   closeOnSubmit={true}
    //   useFilter={false}
    //   showClear={false}
    //   initialValue={initialValue ? dataSetFormatFarm[0] : ''}
    //   onSelectItem={item => {
    //     item && setSelectedOption(item);
    //   }}
    //   dataSet={dataSetFormatFarm}
    // />
    <View style={style.containerNew}>
      <Dropdown
        style={[
          style.dropdown,
          isFocus && {borderColor: colors.primary, borderWidth: 1},
        ]}
        selectedTextStyle={style.selectedTextStyle}
        inputSearchStyle={style.inputSearchStyle}
        itemTextStyle={{color: 'black'}}
        itemContainerStyle={{}}
        data={dataSetFormatFarm}
        // search
        maxHeight={180}
        labelField="title"
        valueField="id"
        // placeholder={!isFocus ? 'Select item' : '...'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.id.toString());
          setSelectedOption({
            ...selectedOption,
            id: item.id,
            title: item.title,
          });
        }}
      />
    </View>
  );
};

export default AutocompleteFarmInput;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 40,
    justifyContent: 'center',
    minWidth: '100%',
  },
  containerNew: {
    paddingVertical: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
});
