import React from 'react';
import {Text, Divider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';

const ActivityScreenChartDetails = ({barData}) => {
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
      {barData.map((month, index) => {
        return (
          <SafeAreaView style={{flex: 1}} key={'tool_' + index}>
            <Divider theme={{colors: {outlineVariant: 'black'}}} />
            <SafeAreaView>
              <Text variant="titleMedium" style={{fontWeight: 'bold'}}>
                {month.label}
              </Text>
            </SafeAreaView>
            <SafeAreaView>
              {month?.stacks &&
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
            </SafeAreaView>
          </SafeAreaView>
        );
      })}
    </SafeAreaView>
  );
};

export default ActivityScreenChartDetails;
