import Realm, {BSON} from 'realm';
import {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Text, useTheme} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import {realmContext} from '../../RealmContext';

import {Farm} from '../schemas/farm.schema';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGlobal} from '../contexts/GlobalContext';

const AutocompleteItemInput = ({
  myKey = 'none',
  label, //labeling for input
  id, //unique key id of database prop
  title, //unique key of database prop(To display as options)
  options,
  dataForm,
  setDataForm,
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

  useEffect(() => {
    const selectedFarmAllProps = realm
      .objects(Farm)
      .filtered('_id == $0', BSON.ObjectId(farmId));
    // console.log('Current Farm All Props: ', selectedFarmAllProps);

    const allSelectedActionItems = [...selectedFarmAllProps[0][options]] || [];
    console.log(
      'Current Farm Selected Item Props length: ',
      allSelectedActionItems.length,
    );
    const allSelectedFarmVisibleTags =
      [...selectedFarmAllProps[0]['visibleTags']] || [];
    console.log('Current Farm Visible Tags: ', allSelectedFarmVisibleTags);

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
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(options));
    });
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
        initialValue={initialValue ? dataSetFormatFarm[0] : ''}
        showClear={true}
        onClear={() =>
          setDataForm({
            ...dataForm,
            item: {eng: '', chs: '', cht: ''},
          })
        }
        onSelectItem={item => {
          item &&
            setDataForm({
              ...dataForm,
              item: {...dataForm.item, eng: item.title},
            });
        }}
        dataSet={dataSetFormatFarm || []}
      />
    </SafeAreaView>
  );
};

export default AutocompleteItemInput;
