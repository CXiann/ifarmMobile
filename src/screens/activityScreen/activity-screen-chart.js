import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, useTheme, IconButton} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import {BarChart} from 'react-native-gifted-charts';

const ActivityScreenChart = ({navigation, route}) => {
  const {colors} = useTheme();

  const barData = [
    {value: 250, label: 'M'},
    {value: 500, label: 'T', frontColor: '#177AD5'},
    {value: 745, label: 'W', frontColor: '#177AD5'},
    {value: 320, label: 'T'},
    {value: 600, label: 'F', frontColor: '#177AD5'},
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topBar: {
      backgroundColor: colors.primaryContainer,
      maxHeight: '15%',
      minWidth: '100%',
      flexDirection: 'row',
    },
    topBarText: {
      justifyContent: 'center',
      marginLeft: '3%',
      color: 'black',
    },
    inputContainer: {
      flex: 1,
      padding: 16,
      alignItems: 'center',
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
      <BarChart
        barWidth={22}
        barBorderRadius={4}
        frontColor="lightgray"
        data={barData}
        yAxisThickness={0}
        xAxisThickness={0}
      />
    </SafeAreaView>
  );
};

export default ActivityScreenChart;
