import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {
  Provider as PaperProvider,
  MD3LightTheme as MD3DefaultTheme,
} from 'react-native-paper';
import BottomNavbar from './navigation/navbar/bottom-navbar';
import Realm from 'realm';
import {AppProvider} from '@realm/react';
import {realmContext} from './RealmContext';
import {APP_ID} from '@env';

const {RealmProvider} = realmContext;

export default function App() {
  return (
    <AppProvider id={APP_ID}>
      <RealmProvider>
        <PaperProvider theme={THEME}>
          <BottomNavbar />
        </PaperProvider>
      </RealmProvider>
    </AppProvider>
  );
}

// const THEME = {
//   ...MD3DefaultTheme,
//   colors: {
//     ...MD3DefaultTheme.colors,
//     primary: "#b0d776",
//     secondaryContainer: "#e3dc9e",
//   },
// };

const LightTheme = require('./assets/LightTheme.json');
const THEME = {
  ...MD3DefaultTheme,
  colors: LightTheme.colors,
};
