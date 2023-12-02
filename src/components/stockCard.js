import React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const StockCard = ({field, navigation, data}) => {
  const styles = StyleSheet.create({
    stockCard: {
      minWidth: '46%',
      height: '90%',
      margin: 7,
      backgroundColor: field.cardColor,
      borderRadius: 20,
    },
    stockTitle: {
      fontSize: 15,
      color: field.titleColor,
      marginBottom: 6,
    },
    stockIcon: {
      backgroundColor: '#fdfffc',
      marginBottom: 15,
      // paddingRight: 10,
    },
    stockAvailable: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'white',
    },
    stockAvailableText: {
      fontSize: 10,
      color: '#f2f2f2',
    },
  });

  const handleStockCardPressed = () => {
    navigation.navigate('Inventory Detail', {
      data: data,
      field: field,
    });
  };

  return (
    <Card style={styles.stockCard} onPress={() => handleStockCardPressed()}>
      <Card.Title
        left={() => (
          <Avatar.Icon
            size={40}
            icon={field.icon}
            style={styles.stockIcon}
            color={field.iconColor}
          />
        )}
      />
      <Card.Content>
        <Text style={styles.stockTitle}>{field.label}</Text>
        <Text style={styles.stockAvailable}>
          {data[field.options]?.length ?? 0}
        </Text>
        <Text style={styles.stockAvailableText}>Stock Available</Text>
      </Card.Content>
    </Card>
  );
};

export default StockCard;
