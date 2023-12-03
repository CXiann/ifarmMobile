import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Text, IconButton, Button} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import InventoryDetails from '../../components/inventoryDetails';
import {useTheme} from 'react-native-paper';
import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
import {Dropdown} from 'react-native-element-dropdown';

const InventoryScreenDetail = ({route, navigation}) => {
  const {data, field} = route.params;
  const selectedCardColor = field.cardColor;

  const dataSetType = [
    {id: '1', title: 'Solid'},
    {id: '2', title: 'Liquid'},
  ];
  const [isFocus, setIsFocus] = useState(false);
  const [selectedOption, setSelectedOption] = useState({
    id: '1',
    title: 'solid',
  });

  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      paddingBottom: 16,
    },
    topBar: {
      backgroundColor: selectedCardColor,
      height: '8%',
      minWidth: '100%',
      flexDirection: 'row',
    },
    topBarBackIcon: {
      alignSelf: 'center',
    },
    topBarText: {
      justifyContent: 'center',
      marginLeft: '3%',
      color: 'white',
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 10,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: 'black',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.topBar}>
        <IconButton
          icon="arrow-left"
          iconColor="black"
          size={25}
          style={styles.topBarBackIcon}
          onPress={() => navigation.goBack()}
        />
        <SafeAreaView style={styles.topBarText}>
          <Text variant="titleLarge" style={{fontWeight: 700}}>
            {field.label} Details
          </Text>
        </SafeAreaView>
      </SafeAreaView>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        style={{flex: 1, padding: 16}}>
        <Dropdown
          style={[
            styles.dropdown,
            isFocus && {borderColor: colors.primary, borderWidth: 1},
          ]}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          itemTextStyle={{color: 'black'}}
          itemContainerStyle={{}}
          data={dataSetType}
          // search
          maxHeight={180}
          labelField="title"
          valueField="id"
          // placeholder={!isFocus ? 'Select item' : '...'}
          value={selectedOption}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setSelectedOption(item);
          }}
        />
        {/* <AutocompleteDropdown
          inputContainerStyle={{
            marginVertical: 10,
            borderRadius: 10,
          }}
          textInputProps={{
            autoCorrect: false,
            autoCapitalize: 'none',
            editable: false,
            style: {
              borderRadius: 25,
              color: 'grey',
              paddingLeft: 20,
            },
          }}
          dataSet={dataSetType}
          renderItem={item => <Text style={{padding: 15}}>{item.title}</Text>}
          initialValue={dataSetType[0]}
          closeOnBlur={true}
          closeOnSubmit={true}
          useFilter={false}
          showClear={false}
          onSelectItem={item => {
            item && setSelectedOption(item);
          }}
        /> */}
        <InventoryDetails
          data={data}
          field={field}
          navigation={navigation}
          type={selectedOption.title}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default InventoryScreenDetail;
