import React from 'react';
import {View, StyleSheet} from 'react-native';
import {ProgressBar, Text, Avatar, useTheme} from 'react-native-paper';

const InventoryPercentage = ({
  pieData,
  calculatePercentage,
  icon,
  selectedData,
}) => {
  const {colors} = useTheme();
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
    itemIconSelected: {
      backgroundColor: 'white',
      elevation: 6,
      width: 50,
      height: 50,
      borderRadius: 12,
      borderColor: 'red',
      borderWidth: 0.7,
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
    itemNameTextSelected: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'red',
      maxWidth: '85%',
    },
    itemValueTextSelected: {
      fontSize: 16,
      color: 'red',
      fontWeight: 'bold',
    },
    progressBarSelected: {
      height: 10,
      borderRadius: 5,
      backgroundColor: '#E5E5E5',
    },
    itemIcon: {
      backgroundColor: '#E6EDf5',
      width: 40,
      height: 40,
      borderRadius: 12,
      elevation: 3,
    },
    itemNameText: {
      fontSize: 16,
      maxWidth: '85%',
    },
    itemValueText: {
      fontSize: 14,
      color: '#6F7378',
    },
    progressBar: {
      height: 5,
      borderRadius: 5,
      backgroundColor: '#E5E5E5',
    },
  });

  const checkSelected = data => {
    return selectedData === data;
  };

  console.log('selectedData: ', selectedData);
  return (
    <View style={styles.percentageContainer}>
      {pieData.map((item, index) => {
        const isSelected = checkSelected(item.name);
        return (
          <View style={styles.percentageRow} key={index}>
            <View style={styles.iconColumn}>
              <Avatar.Icon
                size={40}
                icon={icon}
                color={item.color}
                style={isSelected ? styles.itemIconSelected : styles.itemIcon}
              />
              <View style={styles.percentageColumn}>
                <View style={styles.textRow}>
                  <Text
                    style={
                      isSelected
                        ? styles.itemNameTextSelected
                        : styles.itemNameText
                    }>
                    {item.name}
                  </Text>
                  <Text
                    style={
                      isSelected
                        ? styles.itemValueTextSelected
                        : styles.itemValueText
                    }>
                    {item.value + ' ' + item.unit}
                  </Text>
                </View>
                <ProgressBar
                  progress={calculatePercentage(pieData, item.value) / 100}
                  color={item.color}
                  style={
                    isSelected ? styles.progressBarSelected : styles.progressBar
                  }
                />
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default InventoryPercentage;
