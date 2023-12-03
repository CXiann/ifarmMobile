import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native-paper';
import {PieChart} from 'react-native-gifted-charts';

const PieChartComponent = ({
  pieData,
  getTotal,
  calculatePercentage,
  type,
  setSelectedData,
}) => {
  const renderDot = color => {
    return (
      <SafeAreaView
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };
  console.log('pie data: ', pieData);
  const renderLegendComponent = () => {
    return (
      <SafeAreaView style={styles.legendContainer}>
        {pieData.map((item, index) => (
          <SafeAreaView style={styles.legendColumn} key={index}>
            {renderDot(item.color)}
            <Text style={styles.legendText}>
              {item.name}: {calculatePercentage(pieData, item.value)}%
            </Text>
          </SafeAreaView>
        ))}
      </SafeAreaView>
    );
  };

  const centerLabelComponent = () => {
    return (
      <SafeAreaView style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
          47%
        </Text>
        <Text style={{fontSize: 14, color: 'white'}}>Excellent</Text>
      </SafeAreaView>
    );
  };

  return (
    <>
      {pieData.length == 0 ? (
        <SafeAreaView
          style={{
            marginTop: 30,
          }}>
          <Text
            variant="bodyLarge"
            style={{color: 'gray', textAlign: 'center'}}>
            No Data to show
          </Text>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={styles.chartContainer}>
          <PieChart
            data={pieData}
            donut
            focusOnPress
            showGradient
            sectionAutoFocus
            radius={80}
            innerRadius={30}
            showValuesAsLabels
            textColor="black"
            textSize={10}
            showText
            onPress={item => {
              setSelectedData(item.name);
            }}
            // innerCircleColor={'#232B5D'}
            // centerLabelComponent={centerLabelComponent}
          />
          <SafeAreaView style={styles.rightSideOfChart}>
            <Text style={styles.stockText}>Total In Stock</Text>
            <Text style={styles.stockValueText}>
              {getTotal(pieData).toFixed(2) + (type === 'Solid' ? 'kg' : 'ℓ')}
            </Text>
            {renderLegendComponent()}
          </SafeAreaView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  rightSideOfChart: {
    flexDirection: 'column',
    maxWidth: '40%',
  },
  stockText: {fontSize: 11, color: '#5F6369'},
  stockValueText: {
    fontSize: 23,
    color: 'black',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  legendContainer: {
    maxWidth: '90%',
  },
  legendColumn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  legendText: {
    color: '#4D5157',
    fontSize: 11,
  },
});

export default PieChartComponent;
