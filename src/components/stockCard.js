import React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const StockCard = ({stockName, navigation}) => {
  const getCardProps = stockName => {
    switch (stockName) {
      case 'Fertilizer':
        cardColor = '#F47E3E';
        iconColor = '#F69865';
        cardIcon = 'flower-pollen-outline';
        titleColor = 'white';
        quantityAvailable = 10;
        break;

      case 'Fungicide':
        cardColor = '#BC76BC';
        iconColor = '#D09FD0';
        cardIcon = 'mushroom';
        titleColor = '#fdfffc';
        quantityAvailable = 10;
        break;

      case 'Pesticide':
        cardColor = '#3870A8';
        iconColor = '#6699CC';
        cardIcon = 'bug';
        titleColor = 'white';
        quantityAvailable = 10;
        break;

      case 'Foliar':
        cardColor = '#48A9A6';
        iconColor = '#7EC8C5';
        cardIcon = 'leaf';
        titleColor = 'white';
        quantityAvailable = 10;
        break;

      default:
        break;
    }
    return {cardColor, iconColor, cardIcon, titleColor, quantityAvailable};
  };

  const styles = StyleSheet.create({
    stockCard: {
      width: '47%',
      height: '90%',
      margin: 7,
      backgroundColor: getCardProps(stockName).cardColor,
      borderRadius: 20,
    },
    stockTitle: {
      fontSize: 15,
      color: getCardProps(stockName).titleColor,
      marginBottom: 6,
    },
    stockIcon: {
      backgroundColor: '#fdfffc',
      marginBottom: 15,
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

  const handleStockCardPressed = stockName => {
    navigation.navigate('Inventory Detail', {
      stockName: stockName,
      cardColor: getCardProps(stockName).cardColor,
      iconName: getCardProps(stockName).cardIcon,
    });
  };

  return (
    <Card
      style={styles.stockCard}
      onPress={() => handleStockCardPressed(stockName)}>
      <Card.Content>
        <Avatar.Icon
          size={28}
          icon={cardIcon}
          style={styles.stockIcon}
          color={iconColor}
        />
        <Text style={styles.stockTitle}>{stockName}</Text>
        <Text style={styles.stockAvailable}>{quantityAvailable}</Text>
        <Text style={styles.stockAvailableText}>Stock Available</Text>
      </Card.Content>
    </Card>
  );
};

export default StockCard;
