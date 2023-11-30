import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, Card} from 'react-native-paper';

const DateCard = ({date, day, currentIndex, onPress, isActive}) => {
  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const styles = StyleSheet.create({
    button: {marginVertical: 10},
    numDate: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontSize: 20,
      marginBottom: 5,
    },
    weakFont: {
      alignSelf: 'center',
      fontSize: 16,
      fontWeight: 'medium',
      color: '#808080',
    },
    dateCard: {
      width: 65,
      opacity: isActive ? 1.0 : 0.5,
    },
  });

  return (
    <Card style={styles.dateCard} onPress={() => onPress(currentIndex)}>
      <Card.Content>
        <Text style={styles.numDate}>{date}</Text>
        <Text style={styles.weakFont}>{dayOfWeek[day]}</Text>
      </Card.Content>
    </Card>
  );
};

export default DateCard;
