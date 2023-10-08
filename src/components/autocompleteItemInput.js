import Realm, {BSON} from 'realm';
import {StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';

import {realmContext} from '../../RealmContext';

import {Farm} from '../schemas/farm.schema';
import {SafeAreaView} from 'react-native-safe-area-context';

const AutocompleteItemInput = ({
  label,
  id,
  title, //key of database prop
  options,
  dataForm,
  setDataForm,
  initialValue,
}) => {
  Feather.loadFont();
  const {colors} = useTheme();
  const {useQuery} = realmContext;

  global.currentUserSelectedFarmId;
  const currentUserSelectedFarmAllProps = useQuery(Farm).filtered(
    '_id == $0',
    BSON.ObjectId(global.currentUserSelectedFarmId),
  );
  console.log('Current Farm All Props: ', currentUserSelectedFarmAllProps);

  const currentUserAllSelectedActionItems =
    currentUserSelectedFarmAllProps[0][options] || [];
  console.log(
    'Current Farm Selected Item Props length: ',
    currentUserAllSelectedActionItems.length,
  );

  const getDataSetFormat = items => {
    return items.map(item => {
      const newObj = {id: '', title: ''};
      newObj['id'] = item[id];
      newObj['title'] = item[title].eng;
      return newObj;
    });
  };

  const dataSetFormatFarm = getDataSetFormat(currentUserAllSelectedActionItems);

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
        initialValue={initialValue ? dataSetFormatFarm[0] : undefined}
        onSelectItem={item => {
          item && setDataForm({...dataForm, item: {eng: item.title}});
        }}
        dataSet={dataSetFormatFarm}
      />
    </SafeAreaView>
  );
};

export default AutocompleteItemInput;
