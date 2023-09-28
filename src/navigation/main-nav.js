import React from 'react';

import {NavigationContainer, CommonActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import TabsNavbar from './tabs-navbar';
import LoginScreen from '../screens/authScreen/login-screen';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

const Stack = createStackNavigator();

export default function MainNav() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Tabs" component={TabsNavbar} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
