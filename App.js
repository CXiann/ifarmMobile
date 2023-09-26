import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import {
  Provider as PaperProvider,
  MD3LightTheme as MD3DefaultTheme,
  Button,
} from 'react-native-paper';

import MainNav from './src/navigation/main-nav';

import Realm from 'realm';
import {useApp, AppProvider, UserProvider} from '@realm/react';
import {realmContext} from './RealmContext';
import {APP_ID} from '@env';

const {RealmProvider} = realmContext;

// const realmAccessBehavior = {
//   type: 'openImmediately',
// };

export default function AppWrapper() {
  return (
    <AppProvider id={APP_ID}>
      <UserProvider fallback={LogIn}>
        <App />
      </UserProvider>
    </AppProvider>
  );
}
const App = () => {
  return (
    <RealmProvider
      sync={{
        flexible: true,
        // clientReset: {
        //   mode: 'discardUnsyncedChanges',
        //   onBefore: realm => {
        //     console.log('Beginning client reset for ', realm.path);
        //   },
        //   onAfter: (beforeRealm, afterRealm) => {
        //     console.log('Finished client reset for', beforeRealm.path);
        //     console.log('New realm path', afterRealm.path);
        //   },
        // },
        onError: console.error,
      }}>
      <PaperProvider theme={THEME}>
        <MainNav />
      </PaperProvider>
    </RealmProvider>
  );
};
// const THEME = {
//   ...MD3DefaultTheme,
//   colors: {
//     ...MD3DefaultTheme.colors,
//     primary: "#b0d776",
//     secondaryContainer: "#e3dc9e",
//   },
// };

async function handleSyncError(session, syncError) {
  if (syncError.name == 'ClientReset') {
    console.log(syncError);
    try {
      console.log('error type is ClientReset....');
      const path = realm.path; // realm.path will not be accessible after realm.close()
      realm.close();
      Realm.App.Sync.initiateClientReset(app, path);
      // Download Realm from the server.
      // Ensure that the backend state is fully downloaded before proceeding,
      // which is the default behavior.
      realm = await Realm.open(config);
      realm.close();
    } catch (err) {
      console.error(err);
    }
  }
}

function LogIn() {
  const app = useApp();
  async function logInUser() {
    try {
      // When anonymous authentication is enabled, users can immediately log
      // into your app without providing any identifying information.
      await app.logIn(Realm.Credentials.anonymous());
    } catch (error) {
      if (error.name === 'InvalidSessionError') {
        // Handle the "invalid session" error here
        // You can log the user out, prompt them to log in again, etc.
        await app.currentUser?.logOut();
      }
    }
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

const LightTheme = require('./src/assets/LightTheme.json');
const THEME = {
  ...MD3DefaultTheme,
  colors: LightTheme.colors,
};
