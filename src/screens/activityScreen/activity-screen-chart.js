import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, useTheme, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import ActivityScreenChartBar from './activity-screen-chart-bar';
import {Summary_Props as sumProps} from '../../constants/summary-props';

const ActivityScreenChart = ({navigation}) => {
  const {colors} = useTheme();
  const [isFocus, setIsFocus] = useState(false);
  const [selectedOption, setSelectedOption] = useState(sumProps[0]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topBar: {
      backgroundColor: selectedOption.color,
      maxHeight: '15%',
      minWidth: '100%',
      flexDirection: 'row',
    },
    topBarText: {
      justifyContent: 'center',
      marginLeft: '3%',
      color: 'black',
    },
    dropdownContainer: {flex: 1, padding: 16},
    dropdownLabel: {fontWeight: 'bold', paddingBottom: 5},
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginBottom: 10,
    },
    inputContainer: {
      flex: 1,
      padding: 16,
      alignItems: 'center',
    },
    selectedTextStyle: {
      fontSize: 16,
      color: 'black',
    },
    button: {
      marginVertical: 10,
      minWidth: '100%',
      backgroundColor: colors.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.topBar}>
        <IconButton
          icon="arrow-left"
          iconColor="black"
          size={25}
          onPress={() => navigation.goBack()}
        />
        <SafeAreaView style={styles.topBarText}>
          <Text variant="titleLarge" style={{fontWeight: 700}}>
            {'Activity Summary'}
          </Text>
        </SafeAreaView>
      </SafeAreaView>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled"
        style={{flex: 1}}>
        <SafeAreaView style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Select Chart Category</Text>
          <Dropdown
            style={[
              styles.dropdown,
              isFocus && {borderColor: colors.primary, borderWidth: 1},
            ]}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={{color: 'black'}}
            itemContainerStyle={{}}
            data={sumProps}
            // search
            maxHeight={180}
            labelField="title"
            valueField="id"
            // placeholder={!isFocus ? 'Select item' : '...'}
            autoScroll={false}
            value={selectedOption}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setSelectedOption(item);
            }}
          />
        </SafeAreaView>
        <ActivityScreenChartBar option={selectedOption} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActivityScreenChart;
