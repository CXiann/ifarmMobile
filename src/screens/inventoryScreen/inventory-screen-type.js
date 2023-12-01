import React from 'react';
import InventoryDetails from '../../components/inventoryDetails';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from 'react-native-paper';

const InventoryScreenType = ({route, navigation, type, action}) => {
  return (
    <InventoryDetails
      route={route}
      navigation={navigation}
      type={type}
      action={action}
    />
  );
};

export default InventoryScreenType;
