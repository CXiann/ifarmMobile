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
import ActivityScreenSort from '../screens/activityScreen/activity-screen-sort';
import {useNetInfo} from '@react-native-community/netinfo';
import InventoryScreenDetail from '../screens/inventoryScreen/inventory-screen-detail';

const Stack = createStackNavigator();

export default function MainNav() {
  const netInfo = useNetInfo();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: netInfo.isConnected ? false : true,
            headerLeft: null,
            headerTitle: 'Offline Mode',
            headerStyle: {backgroundColor: 'grey', height: 25},
            headerTitleAlign: 'center',
            headerTitleStyle: {fontSize: 15},
          }}
          initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Farm Selector" component={FarmSelectorScreen} />
          <Stack.Screen name="Tabs" component={TabsNavbar} />
          <Stack.Screen
            name="Inventory Detail"
            component={InventoryScreenDetail}
          />
          <Stack.Screen name="Add Form" component={ActivityScreenAddForm} />
          {/* <Stack.Screen name="Task_Screen" component={TaskScreenMain} /> */}
          <Stack.Screen
            name="Add New Task"
            component={TaskScreenAddForm}
            options={({route}) => ({
              headerShown: true,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
