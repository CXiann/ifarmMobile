import React from 'react';
import InventoryDetails from '../../components/inventoryDetails';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native-paper';

const InventoryScreenType = ({route, navigation, type}) => {
  const pieData = [
    {
      value: 47,
      name: 'Item1',
      color: '#009FFF',
      gradientCenterColor: '#006DFF',
      focused: true,
    },
    {
      value: 20,
      name: 'Item2',
      color: '#93FCF8',
      gradientCenterColor: '#3BE9DE',
    },
    {
      value: 16,
      name: 'Item3',
      color: '#BDB2FA',
      gradientCenterColor: '#8F80F3',
    },
    {
      value: 40,
      name: 'Item4',
      color: '#FFA5BA',
      gradientCenterColor: '#FF7F97',
    },
  ];

  return (
    <InventoryDetails
      route={route}
      navigation={navigation}
      pieData={pieData}
      type={type}
    />
  );
};

export default InventoryScreenType;
