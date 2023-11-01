import Realm, {BSON} from 'realm';
import {StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import {realmContext} from '../../RealmContext';

import {Farm} from '../schemas/farm.schema';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGlobal} from '../contexts/GlobalContext';

const AutocompleteItemSortInput = ({
  myKey = 'none',
  label, //labeling for input
  id, //unique key id of database prop
  title, //unique key of database prop(To display as options)
  options,
  tempForm,
  setTempForm,
  initialValue,
}) => {
  Feather.loadFont();
  const {colors} = useTheme();
  const {useQuery} = realmContext;
  const {farmId} = useGlobal();

  const currentUserSelectedFarmAllProps = useQuery(Farm).filtered(
    '_id == $0',
    BSON.ObjectId(farmId),
  );
  // console.log('Current Farm All Props: ', currentUserSelectedFarmAllProps);

  const currentUserAllSelectedActionItems =
    currentUserSelectedFarmAllProps[0][options] || [];
  console.log(
    'Current Farm Selected Item Props length: ',
    currentUserAllSelectedActionItems.length,
  );

  const getDataSetFormat = items => {
    return items.map(item => {
      const newObj = {id: '', title: ''};
      newObj['id'] = options + '_' + item[id];
      newObj['title'] = item[title].eng;
      return newObj;
    });
  };

  const dataSetFormatFarm = getDataSetFormat(currentUserAllSelectedActionItems);

  const style = StyleSheet.create({
    container: {
      backgroundColor: colors.surfaceVariant,
      paddingTop: 8,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginVertical: 5,
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
  console.log('iniValue: ', tempForm['previousValue']);
  return (
    <SafeAreaView style={style.container}>
      <Text variant="labelMedium" style={style.text}>
        {label}
      </Text>
      <AutocompleteDropdown
        key={myKey != 'none' ? null : myKey} //any unique value(can even be hard coded value)
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
        initialValue={initialValue ? tempForm['previousValue'][options] : ''}
        onClear={() =>
          setTempForm({
            ...tempForm,
            [options]: '',
            previousValue: '',
          })
        }
        onSelectItem={item => {
          item &&
            setTempForm({
              ...tempForm,
              [options]: item.title,
              previousValue: {...tempForm['previousValue'], [options]: item.id},
            });
        }}
        dataSet={dataSetFormatFarm}
      />
    </SafeAreaView>
  );
};

export default AutocompleteItemSortInput;
