import React, {useState, useEffect} from 'react';
import {Text, Divider, Card} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View} from 'react-native';
import {getColor} from '../../utils/colorGenerator-utils';

const ActivityScreenChartDetails = ({
  data,
  type,
  pastMonthsArray,
  queryAction,
}) => {
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    setChartData(data);
  }, [data]);

  console.log('main chart data: ', data);
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 20,
    },
    legendColumn: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
      justifyContent: 'space-between',
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {chartData &&
        chartData.map((month, index) => {
          return (
            <SafeAreaView style={{flex: 1}} key={'month_' + index}>
              <Divider theme={{colors: {outlineVariant: 'black'}}} />
              <SafeAreaView>
                <Text variant="titleMedium" style={{fontWeight: 'bold'}}>
                  {month.label}
                </Text>
              </SafeAreaView>
              <SafeAreaView>
                {month.stacks.map((stackItem, index) => {
                  return (
                    <View
                      style={styles.legendColumn}
                      key={stackItem.name + '_' + index}>
                      {stackItem.value == 0 ? (
                        <Text>No data</Text>
                      ) : (
                        <View style={{flexDirection: 'row'}}>
                          <View
                            style={{
                              height: 10,
                              width: 10,
                              borderRadius: 5,
                              backgroundColor: stackItem.color,
                              marginRight: 10,
                              alignSelf: 'center',
                            }}
                          />
                          <Text>{stackItem.name}</Text>
                        </View>
                      )}
                      <Text>{stackItem.value.toFixed(3)}</Text>
                    </View>
                  );
                })}
              </SafeAreaView>
            </SafeAreaView>
          );
        })}
    </SafeAreaView>
  );
};

export default ActivityScreenChartDetails;
