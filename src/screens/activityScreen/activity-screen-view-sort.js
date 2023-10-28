import Realm, {BSON} from 'realm';
import {Modal, Portal, Text, useTheme} from 'react-native-paper';
import ActivityViewSortingButtons from '../../components/activityViewSortingButtons';
import {SafeAreaView} from 'react-native-safe-area-context';
// import AutocompleteItemInput from '../../components/autocompleteItemInput';
// import {Item_Props as itemProps} from '../../constants/item-props';
// import {useGlobal} from '../../contexts/GlobalContext';
// import {realmContext} from '../../../RealmContext';
// import {Farm} from '../../schemas/farm.schema';
// import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
// import Feather from 'react-native-vector-icons/Feather';
// import {StyleSheet} from 'react-native';

const ActivityScreenViewSort = ({
  visible,
  showModal,
  dataForm,
  setDataForm,
  actProps,
}) => {
  // Feather.loadFont();
  // const {useQuery} = realmContext;
  // const {farmId} = useGlobal();
  // const {colors} = useTheme();
  // console.log(farmId);
  // const currentUserSelectedFarmAllProps = useQuery(Farm).filtered(
  //   '_id == $0',
  //   BSON.ObjectId(farmId),
  // );
  // console.log('Current Farm All Props: ', currentUserSelectedFarmAllProps);

  // const currentUserAllSelectedActionItems =
  //   currentUserSelectedFarmAllProps[0]['plants'] || [];
  // console.log(
  //   'Current Farm Selected Item Props length: ',
  //   currentUserAllSelectedActionItems.length,
  // );

  // const getDataSetFormat = items => {
  //   return items.map(item => {
  //     const newObj = {id: '', title: ''};
  //     newObj['id'] = item['_id'];
  //     newObj['title'] = item['name'].eng;
  //     return newObj;
  //   });
  // };

  // const dataSetFormatFarm = getDataSetFormat(currentUserAllSelectedActionItems);
  // const style = StyleSheet.create({
  //   container: {
  //     backgroundColor: colors.surfaceVariant,
  //     paddingTop: 8,
  //     borderTopLeftRadius: 5,
  //     borderTopRightRadius: 5,
  //     margin: 10,
  //     borderRadius: 5,
  //     borderBottomWidth: 1,
  //     borderBottomColor: colors.outline,
  //     minWidth: '100%',
  //   },
  //   text: {
  //     paddingHorizontal: 20,
  //     fontWeight: 'normal',
  //     color: colors.onSurfaceVariant,
  //     minWidth: '100%',
  //   },
  // });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={showModal}
        contentContainerStyle={{
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 20,
          // height: 500,
        }}
        style={{flex: 1}}>
        <SafeAreaView>
          <Text variant="titleLarge" style={{marginBottom: 20}}>
            Filtering Options
          </Text>
          <ActivityViewSortingButtons
            dataForm={dataForm}
            setDataForm={setDataForm}
            props={actProps}
          />
          {/* <SafeAreaView style={style.container}>
            <Text variant="labelMedium" style={style.text}>
              {'Plants'}
            </Text>
            <AutocompleteDropdown
              // key={myKey != 'none' ? null : myKey} //any unique value(can even be hard coded value)
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
              closeOnBlur={true}
              closeOnSubmit={true}
              initialValue={false ? dataSetFormatFarm[0] : ''}
              onSelectItem={item => {
                item && setDataForm({...dataForm, item: {eng: item.title}});
              }}
              dataSet={dataSetFormatFarm}
            />
          </SafeAreaView> */}
          {/* <AutocompleteItemInput
            dataForm={dataForm}
            setDataForm={setDataForm}
            initialValue={false}
            label={'Test'}
            id={'_id'}
            title={'name'}
            options={'plants'}
          /> */}
          {/* {itemProps.map((index, prop) => {
            return (
              <AutocompleteItemInput
                dataForm={dataForm}
                setDataForm={setDataForm}
                initialValue={false}
                label={prop.options}
                id={'_id'}
                title={'name'}
                options={prop.options}
                myKey={index}
              />
            );
          })} */}
        </SafeAreaView>
      </Modal>
    </Portal>
  );
};

export default ActivityScreenViewSort;
