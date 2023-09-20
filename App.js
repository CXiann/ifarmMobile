import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {
  Provider as PaperProvider,
  MD3LightTheme as MD3DefaultTheme,
  Button,
} from 'react-native-paper';

import BottomNavbar from './navigation/navbar/bottom-navbar';

import Realm from 'realm';
import {useApp, AppProvider, UserProvider} from '@realm/react';
import {realmContext} from './RealmContext';
import {APP_ID} from '@env';

const {RealmProvider} = realmContext;

export default function App() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <RealmProvider
          sync={{
            flexible: true,
            initialSubscriptions: {
              update(subs, realm) {
                subs.add(realm.objects('foliars'));
              },
            },
            onError: console.error,
          }}>
          <PaperProvider theme={THEME}>
            <BottomNavbar />
          </PaperProvider>
        </RealmProvider>
      </UserProvider>
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

function LogIn() {
  const app = useApp();
  async function logInUser() {
    // When anonymous authentication is enabled, users can immediately log
    // into your app without providing any identifying information.
    await app.logIn(Realm.Credentials.anonymous());
  }
  return (
    <Button
      mode="contained"
      onPress={logInUser}
      style={{
        top: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      Log In
    </Button>
  );
}

const LightTheme = require('./assets/LightTheme.json');
const THEME = {
  ...MD3DefaultTheme,
  colors: LightTheme.colors,
};
