import React from 'react';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {useTheme} from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import NotificationTaskScreen from '../screens/notificationScreen/notification-task-screen';
import NotificationWeatherScreen from '../screens/notificationScreen/notification-weather-screen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const NotificationNav = ({route}) => {
  const {colors} = useTheme();
  return (
    <Stack.Navigator
      initialRouteName="Main Notification"
      screenOptions={{
        headerStyle: {backgroundColor: colors.primaryContainer},
      }}>
      <Stack.Screen
        name="Main Notification"
        options={{title: 'Notifications'}}
        component={NotiNav}
        initialParams={route.params}
      />
    </Stack.Navigator>
  );
};

const NotiNav = ({route}) => {
  const {colors} = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarIndicatorStyle: {backgroundColor: colors.primary},
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.primaryContainer,
      }}>
      <Tab.Screen
        name="Task"
        component={NotificationTaskScreen}
        initialParams={route.params}
      />
      <Tab.Screen name="Weather" component={NotificationWeatherScreen} />
    </Tab.Navigator>
  );
};

export default NotificationNav;
