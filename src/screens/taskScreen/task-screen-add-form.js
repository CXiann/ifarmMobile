import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, IconButton, MD3Colors, Appbar} from 'react-native-paper';

const TaskScreenAddForm = ({navigation}) => {
  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.navigate('Task_Screen');
          }}
        />
        <Appbar.Content title="Add New Task" />
      </Appbar.Header>
    </View>
  );
};

export default TaskScreenAddForm;
