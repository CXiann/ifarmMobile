import Realm, {BSON} from 'realm';
import {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Text, useTheme, ActivityIndicator} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import {realmContext} from '../../RealmContext';

import {Farm} from '../schemas/farm.schema';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGlobal} from '../contexts/GlobalContext';

const AutocompleteItemSortInput = ({
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
  const {useRealm} = realmContext;
  const realm = useRealm();
  const {farmId} = useGlobal();

  const [dataSetFormatFarm, setDataSetFormatFarm] = useState([
    {
      id: '',
      title: '',
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const selectedFarmAllProps = realm
      .objects(Farm)
      .filtered('_id == $0', BSON.ObjectId(farmId));
    // console.log('Current Farm All Props: ', selectedFarmAllProps);
    const allSelectedActionItems = [...selectedFarmAllProps[0][options]] || [];
    // console.log(
    //   'Current Farm Selected Item Props length: ',
    //   allSelectedActionItems.length,
    // );
    const allSelectedFarmVisibleTags =
      [...selectedFarmAllProps[0]['visibleTags']] || [];
    // console.log('Current Farm Visible Tags: ', allSelectedFarmVisibleTags);
    const visibleTagsOptions = allSelectedActionItems
      .filter(item =>
        item['tags'].some(tag => allSelectedFarmVisibleTags.includes(tag)),
      )
      .sort((a, b) => {
        const nameA = a['name']['eng'];
        const nameB = b['name']['eng'];
        // Compare the names
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    console.log('Display: ', visibleTagsOptions.length);
    const getDataSetFormat = items => {
      return items.map(item => {
        const newObj = {id: '', title: ''};
        newObj['id'] = options + '_' + item[id];
        newObj['title'] = item[title].eng;
        return newObj;
      });
    };
    setDataSetFormatFarm(getDataSetFormat(visibleTagsOptions));
    setLoading(false);
  }, [realm]);

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
  console.log('iniValue: ', tempForm['previousValue'][options]);

  //render other component
  if (loading) {
    return (
      <SafeAreaView style={style.container}>
        {/* <ActivityIndicator animating={true} /> */}
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={style.container}>
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
          style: {color: colors.primary},
        }}
        suggestionsListTextStyle={{
          color: colors.primary,
        }}
        suggestionsListContainerStyle={{}}
        renderItem={item => (
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
        showClear={true}
        onClear={() =>
          setTempForm({
            ...tempForm,
            [options]: '',
            previousValue: {...tempForm['previousValue'], [options]: ''},
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
        dataSet={dataSetFormatFarm || []}
      />
    </SafeAreaView>
  );
};

export default AutocompleteItemSortInput;
