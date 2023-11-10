import React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const StockCard = ({stockName}) => {
  switch (stockName) {
    case 'Fertilizer':
      cardColor = '#FF695C';
      iconColor = '#FF7C70';
      cardIcon = 'flower-pollen-outline';
      titleColor = 'white';
      quantityAvailable = 10;
      break;

    case 'Fungicide':
      cardColor = '#F3712B';
      iconColor = '#F69865';
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

  const styles = StyleSheet.create({
    stockCard: {
      width: '47%',
      height: '90%',
      margin: 7,
      backgroundColor: cardColor,
      borderRadius: 20,
    },
    stockTitle: {
      fontSize: 15,
      color: titleColor,
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

  return (
    <Card style={styles.stockCard}>
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
