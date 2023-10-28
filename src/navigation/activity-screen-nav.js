import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from 'react-native-paper';

import ActivityScreenView from '../screens/activityScreen/activity-screen-view';
import ActivityScreenAddOptions from '../screens/activityScreen/activity-screen-add-options';

const Tab = createMaterialTopTabNavigator();

const ActivityScreenNav = () => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: colors.primaryContainer},
      }}>
      <Tab.Screen name="View Activity" component={ActivityScreenView} />
      <Tab.Screen name="Add Activity" component={ActivityScreenAddOptions} />
    </Tab.Navigator>
  );
};

export default ActivityScreenNav;
