import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from 'react-native-paper';

import ActivityScreenView from './activity-screen-view';
import ActivityScreenAddMain from './activity-screen-add-main';

const Tab = createMaterialTopTabNavigator();

const ActivityScreenMain = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: colors.primaryContainer},
      }}>
      <Tab.Screen name="View Activity" component={ActivityScreenView} />
      <Tab.Screen name="Add Activity" component={ActivityScreenAddMain} />
    </Tab.Navigator>
  );
};

export default ActivityScreenMain;
