import React from 'react';
import {Avatar, Card, Text} from 'react-native-paper';
import {StyleSheet} from 'react-native';

const StockCard = ({stockName, navigation, data, fullData}) => {
  const getCardProps = stockName => {
    switch (stockName) {
      case 'Fertilizer':
        cardColor = '#F47E3E';
        iconColor = '#F69865';
        cardIcon = 'flower-pollen-outline';
        titleColor = 'white';
        break;

      case 'Fungicide':
        cardColor = '#BC76BC';
        iconColor = '#D09FD0';
        cardIcon = 'mushroom';
        titleColor = '#fdfffc';
        break;

      case 'Pesticide':
        cardColor = '#3870A8';
        iconColor = '#6699CC';
        cardIcon = 'bug';
        titleColor = 'white';
        break;

      case 'Foliar':
        cardColor = '#48A9A6';
        iconColor = '#7EC8C5';
        cardIcon = 'leaf';
        titleColor = 'white';
        break;

      default:
        break;
    }
    return {cardColor, iconColor, cardIcon, titleColor};
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

  const handleStockCardPressed = stockName => {
    const cardColor = getCardProps(stockName).cardColor;
    const cardIcon = getCardProps(stockName).cardIcon;

    navigation.navigate('Inventory Detail', {
      data: data,
      fullData: fullData,
      stockName: stockName,
      cardColor: cardColor,
      iconName: cardIcon,
    });
  };

  return (
    <Card
      style={styles.stockCard}
      onPress={() => handleStockCardPressed(stockName)}>
      <Card.Title
        left={() => (
          <Avatar.Icon
            size={40}
            icon={cardIcon}
            style={styles.stockIcon}
            color={iconColor}
          />
        )}
      />
      <Card.Content>
        <Text style={styles.stockTitle}>{stockName}</Text>
        <Text style={styles.stockAvailable}>{data.length}</Text>
        <Text style={styles.stockAvailableText}>Stock Available</Text>
      </Card.Content>
    </Card>
  );
};

export default StockCard;
