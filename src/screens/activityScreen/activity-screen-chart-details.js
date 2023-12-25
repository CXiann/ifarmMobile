import React, {useState, useEffect} from 'react';
import {Text, Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {getColor} from '../../utils/colorGenerator-utils';

const ActivityScreenChartDetails = ({
  //   lineData,
  stackedData,
  barData,
  type,
  pastMonthsArray,
  queryAction,
}) => {
  const [chartData, setChartData] = useState([]);
  console.log('Bar Data: ', barData);
  console.log('Stacked Data: ', stackedData);

  useEffect(() => {
    var chartData = [];

    switch (type) {
      case 'bar':
        chartData = barData;

        break;

      //   case 'line':
      //     chartData = lineData;

      // break;

      case 'stack':
        chartData = stackedData;

        break;

      default:
        break;
    }
    setChartData(chartData);
  }, [type, barData, stackedData]);

  console.log('main chart data: ', chartData);
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
            <SafeAreaView style={{flex: 1}} key={'tool_' + index}>
              <Divider theme={{colors: {outlineVariant: 'black'}}} />
              <SafeAreaView>
                <Text variant="titleMedium" style={{fontWeight: 'bold'}}>
                  {pastMonthsArray[index].month}
                </Text>
              </SafeAreaView>
              <SafeAreaView>
                {/* {type == 'line' && month?.lineData !== undefined && (
                  <SafeAreaView
                    style={styles.legendColumn}
                    key={'tool_' + index}>
                    {month.lineData[index].value == 0 ? (
                      <Text>No data</Text>
                    ) : (
                      <SafeAreaView style={{flexDirection: 'row'}}>
                        <SafeAreaView
                          style={{
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            // backgroundColor: stackItem.color,
                            marginRight: 10,
                            alignSelf: 'center',
                          }}
                        />
                        <Text>{month.item}</Text>
                      </SafeAreaView>
                    )}
                    <Text>{month.lineData[index].value.toFixed(3)}</Text>
                  </SafeAreaView>
                )} */}
                {type == 'stack' &&
                  month?.stacks !== undefined &&
                  month.stacks.map((stackItem, index) => {
                    return (
                      <SafeAreaView
                        style={styles.legendColumn}
                        key={'tool_' + index}>
                        {stackItem.value == 0 ? (
                          <Text>No data</Text>
                        ) : (
                          <SafeAreaView style={{flexDirection: 'row'}}>
                            <SafeAreaView
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
                          </SafeAreaView>
                        )}
                        <Text>{stackItem.value.toFixed(3)}</Text>
                      </SafeAreaView>
                    );
                  })}
                {type == 'bar' && month?.value !== undefined && (
                  <SafeAreaView
                    style={styles.legendColumn}
                    key={'tool_' + index}>
                    {month.value == 0 ? (
                      <Text>No data</Text>
                    ) : (
                      <SafeAreaView style={{flexDirection: 'row'}}>
                        <SafeAreaView
                          style={{
                            height: 10,
                            width: 10,
                            borderRadius: 5,
                            backgroundColor: month.color,
                            marginRight: 10,
                            alignSelf: 'center',
                          }}
                        />
                        <Text>{'Total Count'}</Text>
                      </SafeAreaView>
                    )}
                    <Text>{month.value.toFixed(0)}</Text>
                  </SafeAreaView>
                )}
              </SafeAreaView>
            </SafeAreaView>
          );
        })}
    </SafeAreaView>
  );
};

export default ActivityScreenChartDetails;
