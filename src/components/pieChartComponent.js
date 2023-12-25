import React from 'react';
import {View, StyleSheet, Image} from 'react-native';

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
      <View
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
      <View style={styles.legendContainer}>
        {pieData.map((item, index) => (
          <View style={styles.legendColumn} key={index}>
            {renderDot(item.color)}
            <Text style={styles.legendText}>
              {item.name}: {calculatePercentage(pieData, item.value)}%
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const centerLabelComponent = () => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 14, color: 'black', fontWeight: 'bold'}}>
          {getTotal(pieData).toFixed(2) + (type == 'Liquid' ? 'ℓ' : 'kg')}
        </Text>
        <Text style={{fontSize: 14, color: 'black'}}>Total</Text>
      </View>
    );
  };
  console.log('Type: ', type);
  return (
    <View style={styles.chartContainer}>
      <PieChart
        data={
          pieData.length === 0 ? [{value: 100, color: 'lightgray'}] : pieData
        }
        donut
        focusOnPress
        showGradient
        sectionAutoFocus
        radius={80}
        innerRadius={30}
        showValuesAsLabels
        textColor="black"
        textSize={10}
        showText={pieData.length === 0 ? false : true}
        onPress={item => {
          setSelectedData(item.name);
        }}
        // innerCircleColor={'#232B5D'}
        centerLabelComponent={centerLabelComponent}
      />
      <View style={styles.rightSideOfChart}>
        <Text style={styles.stockText}>Total In Stock</Text>
        <Text style={styles.stockValueText}>
          {pieData.length === 0
            ? 'No Data'
            : getTotal(pieData).toFixed(2) + (type == 'Liquid' ? 'ℓ' : 'kg')}
        </Text>
        {renderLegendComponent()}
      </View>
    </View>
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
