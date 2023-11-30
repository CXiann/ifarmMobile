import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ProgressBar, Text, Avatar} from 'react-native-paper';

const InventoryPercentage = ({pieData, calculatePercentage, icon}) => {
  return (
    <View style={styles.percentageContainer}>
      {pieData.map((item, index) => (
        <View style={styles.percentageRow} key={index}>
          <View style={styles.iconColumn}>
            <Avatar.Icon
              size={30}
              icon={icon}
              color={item.color}
              style={styles.itemIcon}
            />
            <View style={styles.percentageColumn}>
              <View style={styles.textRow}>
                <Text style={styles.itemNameText}>{item.name}</Text>
                <Text style={styles.itemValueText}>
                  {item.value + ' ' + item.unit}
                </Text>
              </View>
              <ProgressBar
                progress={calculatePercentage(pieData, item.value) / 100}
                color={item.color}
                style={styles.progressBar}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  percentageContainer: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  percentageRow: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  iconColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemIcon: {
    backgroundColor: '#E6EDf5',
    width: 40,
    height: 40,
    borderRadius: 12,
  },
  percentageColumn: {
    flexDirection: 'column',
    width: '75%',
    marginLeft: 20,
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  itemNameText: {
    fontSize: 16,
    fontWeight: 700,
  },
  itemValueText: {
    fontSize: 14,
    color: '#6F7378',
    fontWeight: 600,
  },
  progressBar: {
    height: 5,
    borderRadius: 5,
    backgroundColor: '#E5E5E5',
  },
});

export default InventoryPercentage;
