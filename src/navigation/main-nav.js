import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import TabsNavbar from './tabs-navbar';
import LoginScreen from '../screens/authScreen/login-screen';
import ActivityScreenAddForm from '../screens/activityScreen/activity-screen-add-form';
import FarmSelectorScreen from '../screens/farm-selector-screen';
import TaskScreenMain from '../screens/taskScreen/task-screen-main';
import InventoryScreenAddNewForm from '../screens/inventoryScreen/inventory-screen-add-new-form';
import InventoryScreenAddExistingForm from '../screens/inventoryScreen/inventory-screen-add-existing-form';
import TaskScreenAddForm from '../screens/taskScreen/task-screen-add-form';
import ActivityScreenSort from '../screens/activityScreen/activity-screen-sort';
import {useNetInfo} from '@react-native-community/netinfo';
import InventoryScreenDetail from '../screens/inventoryScreen/inventory-screen-detail';
import ActivityScreenChart from '../screens/activityScreen/activity-screen-chart';
import TaskScreenFilter from '../screens/taskScreen/task-screen-filter';
import NotificationNav from './notification-nav';
import NotificationTaskScreen from '../screens/notificationScreen/notification-task-screen';
import ActivityScreenViewSort from '../screens/activityScreen/activity-screen-view-sort';
import ActivityScreenAddOptions from '../screens/activityScreen/activity-screen-add-options';
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
          <Stack.Screen name="Sort" component={ActivityScreenSort} />
          <Stack.Screen
            name="Notification"
            component={NotificationTaskScreen}
          />
          <Stack.Screen name="Activity Chart" component={ActivityScreenChart} />
          <Stack.Screen
            name="Add Activity"
            component={ActivityScreenAddOptions}
          />
          <Stack.Screen name="Add Form" component={ActivityScreenAddForm} />
          <Stack.Screen
            name="Add New Inventory"
            component={InventoryScreenAddNewForm}
          />
          <Stack.Screen
            name="Add Existing Inventory"
            component={InventoryScreenAddExistingForm}
          />
          {/* <Stack.Screen name="Task_Screen" component={TaskScreenMain} /> */}
          <Stack.Screen name="Filter Task" component={TaskScreenFilter} />
          <Stack.Screen name="Add New Task" component={TaskScreenAddForm} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
