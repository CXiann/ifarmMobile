import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import TabsNavbar from './tabs-navbar';
import LoginScreen from '../screens/authScreen/login-screen';
import ActivityScreenAddForm from '../screens/activityScreen/activity-screen-add-form';
import FarmSelectorScreen from '../screens/farm-selector-screen';
import TaskScreenMain from '../screens/taskScreen/task-screen-main';
import TaskScreenAddForm from '../screens/taskScreen/task-screen-add-form';

const Stack = createStackNavigator();

export default function MainNav() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Farm Selector" component={FarmSelectorScreen} />
          <Stack.Screen name="Tabs" component={TabsNavbar} />
          <Stack.Screen
            name="Add Form"
            component={ActivityScreenAddForm}
            options={({route}) => ({
              headerShown: true,
              title: route.params.action,
            })}
          />
          {/* <Stack.Screen name="Task_Screen" component={TaskScreenMain} /> */}
          <Stack.Screen
            name="Add New Task"
            component={TaskScreenAddForm}
            options={({route}) => ({
              headerShown: true,
              // title: route.params.action,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
