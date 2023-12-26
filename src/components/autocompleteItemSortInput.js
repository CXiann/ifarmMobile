import Realm, {BSON} from 'realm';
import {useState, useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Text,
  useTheme,
  ActivityIndicator,
  TextInput,
  IconButton,
} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import Feather from 'react-native-vector-icons/Feather';
import {realmContext} from '../../RealmContext';

import {Farm} from '../schemas/farm.schema';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGlobal} from '../contexts/GlobalContext';
import {Dropdown} from 'react-native-element-dropdown';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

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
  const myRef = useRef();

  const [dataSetFormatFarm, setDataSetFormatFarm] = useState([
    {
      id: '',
      title: '',
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [isFocus, setIsFocus] = useState(false);
  const [isSearchFocus, setIsSearchFocus] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [value, setValue] = useState(
    initialValue ? tempForm['previousValue'][options] : '',
  );

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
      backgroundColor: colors.onPrimary,
      paddingTop: 8,
      borderTopLeftRadius: 5,
      borderTopRightRadius: 5,
      marginVertical: 5,
      borderRadius: 5,
      borderBottomWidth: 1,
      borderBottomColor: isFocus ? colors.primaryContainer : colors.outline,
      minWidth: '100%',
    },
    text: {
      paddingHorizontal: 15,
      fontWeight: 'bold',
      color: isFocus ? colors.primaryContainer : colors.onSurfaceVariant,
      minWidth: '100%',
    },
    inputSearchStyle: {
      color: colors.onSurfaceVariant,
    },
    itemTextStyle: {
      color: colors.primary,
      fontSize: 14,
    },
    itemContainerStyle: {},
    dropdown: {
      height: 40,
      borderColor: 'gray',
      // borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    placeholderStyle: {
      color: 'lightgray',
    },
    selectedTextStyle: {
      fontSize: 15,
      color: colors.primary,
    },
  });
  console.log('iniValue: ', tempForm['previousValue'][options]);

  // render other component
  // if (loading) {
  //   return (
  //     <SafeAreaView style={style.container}>
  //       {/* <ActivityIndicator animating={true} /> */}
  //     </SafeAreaView>
  //   );
  // }
  return (
    <View style={style.container}>
      <Text variant="labelMedium" style={style.text}>
        {label}
      </Text>
      <Dropdown
        style={[
          style.dropdown,
          isFocus && {borderColor: colors.primaryContainer},
        ]}
        selectedTextStyle={style.selectedTextStyle}
        itemTextStyle={style.itemTextStyle}
        inputSearchStyle={style.inputSearchStyle}
        itemContainerStyle={style.itemContainerStyle}
        placeholderStyle={style.placeholderStyle}
        iconColor={isFocus ? colors.primaryContainer : colors.onSurface}
        data={dataSetFormatFarm}
        search
        ref={myRef}
        renderRightIcon={item => {
          return (
            <>
              <View style={{flexDirection: 'row'}}>
                {value && (
                  <IconButton
                    icon="close-circle-outline"
                    iconColor={colors.primary}
                    size={20}
                    onPress={() => {
                      setValue('');
                      setTempForm({
                        ...tempForm,
                        [options]: '',
                        previousValue: {
                          ...tempForm['previousValue'],
                          [options]: '',
                        },
                      });
                    }}
                  />
                )}
                <IconButton
                  icon="chevron-down"
                  iconColor={colors.primary}
                  size={20}
                  onPress={() => myRef.current.open()}
                />
              </View>
            </>
          );
        }}
        renderInputSearch={onSearch => {
          return (
            <View style={{padding: 10}}>
              <TextInput
                theme={{colors: {surfaceVariant: 'white'}}}
                mode="flat"
                contentStyle={{backgroundColor: 'white'}}
                placeholder="Search here"
                placeholderTextColor="lightgray"
                value={searchText}
                onFocus={() => setIsSearchFocus(true)}
                onBlur={() => {
                  setSearchText('');
                  setIsSearchFocus(false);
                  myRef.current.close();
                }}
                onChangeText={text => {
                  setSearchText(text);
                  onSearch(text);
                }}
                right={
                  <TextInput.Icon
                    icon="magnify"
                    theme={
                      isSearchFocus && {
                        colors: {onSurfaceDisabled: colors.primary},
                      }
                    }
                    color={colors.primary}
                    size={20}
                    disabled
                  />
                }
              />
            </View>
          );
        }}
        maxHeight={200}
        labelField="title"
        valueField="id"
        placeholder={!isFocus ? 'Select ' + options : 'Selecting...'}
        searchPlaceholder="Search"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        // renderRightIcon={() => (
        //   <Feather name="x-circle" size={18} color={colors.primary} />
        // )}
        onChange={item => {
          setValue(item.id.toString());
          setTempForm({
            ...tempForm,
            [options]: item.title,
            previousValue: {...tempForm['previousValue'], [options]: item.id},
          });
        }}
      />
    </View>
  );
};

export default AutocompleteItemSortInput;
