import React from 'react';
import InventoryDetails from '../../components/inventoryDetails';

import {Text} from 'react-native-paper';

const InventoryScreenType = ({navigation, type, data, field}) => {
  return (
    <InventoryDetails
      navigation={navigation}
      type={type}
      data={data}
      field={field}
    />
  );
};

export default InventoryScreenType;
