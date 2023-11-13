import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Button,
  BottomNavigation,
  Badge,
  IconButton,
  Text,
  useTheme,
} from 'react-native-paper';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/home-screen';
import ActivitiesScreenNav from './activity-screen-nav';
import TestScreen from '../screens/test-screen';
import TaskScreenNav from './task-screen-nav';
import {SafeAreaView} from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

export default function TabsNavbar({route}) {
  const {colors} = useTheme();

  const style = StyleSheet.create({
    rightContainer: {
      flexDirection: 'row',
      // backgroundColor: 'white',
      // paddingBottom: 10,
      // justifyContent: 'center',
    },
    badge: {},
  });
  return (
    <Tab.Navigator
      screenOptions={({navigation}) => ({
        // lazy: false,
        headerLeft: null,
        headerStyle: {
          backgroundColor: colors.primaryContainer,
        },
        headerRightContainerStyle: {
          paddingRight: '3%',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <SafeAreaView style={style.rightContainer}>
            {/* <IconButton
              icon="bell"
              iconColor="black"
              size={20}
              onPress={() => console.log('Pressed')}
            />
            <Badge style={style.badge}>3</Badge> */}

            <Button
              mode="elevated"
              icon="arrow-right"
              onPress={() => navigation.navigate('Farm Selector')}
              contentStyle={{
                flexDirection: 'row-reverse',
                justifyContent: 'center',
                backgroundColor: colors.secondaryContainer,
              }}
              labelStyle={{color: colors.outline}}
              style={{
                margin: 4,
              }}>
              <Text
                style={{alignSelf: 'center', fontWeight: 'bold'}}
                variant="labelLarge">
                {'Farm: '}
                <Text
                  variant="titleMedium"
                  style={{color: colors.tertiary, fontWeight: 'bold'}}>
                  {route.params.farmName}
                </Text>
              </Text>
            </Button>
          </SafeAreaView>
        ),
      })}
      initialRouteName="Home"
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
          style={{backgroundColor: colors.primaryContainer}}
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
        component={ActivitiesScreenNav}
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({color, size}) => {
            return <Icon name="weather-sunny" size={size} color={color} />;
          },
        }}
      />
      {/* <Tab.Screen
        name="Test"
        component={TestScreen}
        options={{
          tabBarLabel: 'Test',
          tabBarIcon: ({color, size}) => {
            return <Icon name="tools" size={size} color={color} />;
          },
        }}
      /> */}
      <Tab.Screen
        name="Task"
        component={TaskScreenNav}
        options={{
          tabBarLabel: 'Task',
          tabBarIcon: ({color, size}) => {
            return (
              <Icon
                name="newspaper-variant-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
