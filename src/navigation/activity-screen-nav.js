import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme, ActivityIndicator, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ActivityScreenView from '../screens/activityScreen/activity-screen-view';
import {createStackNavigator} from '@react-navigation/stack';
import ActivityScreenAddOptions from '../screens/activityScreen/activity-screen-add-options';
import TestSortScreen from '../screens/activityScreen/activity-screen-sort';

const Stack = createStackNavigator();

const ActivityScreenNav = () => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: colors.primaryContainer},
      }}>
      <Stack.Screen
        name="View Activity"
        component={ActivityScreenView}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Add Activity" component={ActivityScreenAddOptions} />
      {/* <Stack.Screen name="Test Sort" component={TestSortScreen} /> */}
    </Stack.Navigator>
  );
};

export default ActivityScreenNav;
