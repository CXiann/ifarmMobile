import React, {useState, useEffect} from 'react';
import {Text, Divider, Card} from 'react-native-paper';

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
    <View style={styles.container}>
      {chartData &&
        chartData.map((month, index) => {
          return (
            <View style={{flex: 1}} key={'month_' + index}>
              <Divider theme={{colors: {outlineVariant: 'black'}}} />
              <View>
                <Text variant="titleMedium" style={{fontWeight: 'bold'}}>
                  {month.label}
                </Text>
              </View>
              <View>
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
                      <Text>
                        {type == 'bar'
                          ? stackItem.value.toFixed(0)
                          : stackItem.value.toFixed(3)}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
          );
        })}
    </View>
  );
};

export default ActivityScreenChartDetails;
