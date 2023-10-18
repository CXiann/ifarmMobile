import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, Card} from 'react-native-paper';

const DateCard = props => {
  const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Card style={styles.dateCard}>
      <Card.Content>
        <Text style={styles.numDate}>{props.date}</Text>
        <Text style={styles.weakFont}>{dayOfWeek[props.day]}</Text>
      </Card.Content>
    </Card>
  );
};

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
  },
});

export default DateCard;
