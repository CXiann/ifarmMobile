import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Platform,
  Text,
  KeyboardAvoidingView,
} from 'react-native';
// import {Text} from 'react-native-paper';
import {useGlobal} from '../contexts/GlobalContext';
import {Dropdown} from 'react-native-element-dropdown';

const HomeScreen = () => {
  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
    {label: 'Item 4', value: '4'},
    {label: 'Item 5', value: '5'},
    {label: 'Item 6', value: '6'},
    {label: 'Item 7', value: '635255210b653ca9d27bf348'},
    {label: 'Item 8', value: '8'},
  ];
  const [value, setValue] = useState(data[5]);
  const [isFocus, setIsFocus] = useState(false);
  const {setIsLoading} = useGlobal();
  const styles = StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
    },
    container: {
      padding: 20,
    },
    title: {
      textAlign: 'center',
      fontSize: 25,
      marginBottom: 50,
    },
    section: {
      marginBottom: 40,
    },
    sectionTitle: {
      fontWeight: 'bold',
      marginBottom: 3,
    },
    containerNew: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
      color: 'black',
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return (
      <Text style={[styles.label, isFocus && {color: 'blue'}]}>
        Dropdown label
      </Text>
    );
  };

  useEffect(() => {
    // setIsLoading(true);
  });
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar translucent={false} />
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled>
        <ScrollView
          nestedScrollEnabled
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          contentInsetAdjustmentBehavior="automatic"
          // contentContainerStyle={{ paddingBottom: 200 }}
          style={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.title}>Autocomplete dropdown</Text>
            <View style={styles.containerNew}>
              {renderLabel()}
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                itemTextStyle={{color: 'black'}}
                iconStyle={styles.iconStyle}
                data={data}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select item' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          {/* another */}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default HomeScreen;
