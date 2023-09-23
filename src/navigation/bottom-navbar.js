import React from 'react';
import {View, StyleSheet} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text, BottomNavigation} from 'react-native-paper';
import {NavigationContainer, CommonActions} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../../screens/home-screen';
import ActivitiesScreen from '../screens/activity-screen';
import TestScreen from '../../screens/test-screen';

const Tab = createBottomTabNavigator();

export default function BottomNavbar() {
  const theme = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={
          {
            // headerShown: false,
          }
        }
        tabBar={({navigation, state, descriptors, insets}) => (
          <BottomNavigation.Bar
            navigationState={state}
            safeAreaInsets={insets}
            // activeColor="#afff76"
            // inactiveColor="#000000"

            onTabPress={({route, preventDefault}) => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (event.defaultPrevented) {
                preventDefault();
              } else {
                navigation.dispatch({
                  ...CommonActions.navigate(route.name, route.params),
                  target: state.key,
                });
              }
            }}
            renderIcon={({route, focused, color}) => {
              const {options} = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({focused, color, size: 24});
              }

              return null;
            }}
            getLabelText={({route}) => {
              const {options} = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
            style={{backgroundColor: '#b0d776'}}
          />
        )}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => {
              return <Icon name="home" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Activities"
          component={ActivitiesScreen}
          options={{
            tabBarLabel: 'Activities',
            tabBarIcon: ({color, size}) => {
              return <Icon name="weather-sunny" size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Test"
          component={TestScreen}
          options={{
            tabBarLabel: 'Test',
            tabBarIcon: ({color, size}) => {
              return <Icon name="tools" size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
