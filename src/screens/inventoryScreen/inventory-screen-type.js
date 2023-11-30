import React from 'react';
import InventoryDetails from '../../components/inventoryDetails';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native-paper';

const InventoryScreenType = ({route, navigation, type}) => {
  return <InventoryDetails route={route} navigation={navigation} type={type} />;
};

export default InventoryScreenType;
