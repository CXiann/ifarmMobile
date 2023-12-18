import React, {useEffect} from 'react';

import {StyleSheet, Text, View} from 'react-native';
import {
  Provider as PaperProvider,
  MD3LightTheme as MD3DefaultTheme,
  Button,
} from 'react-native-paper';
import {AutocompleteDropdownContextProvider} from 'react-native-autocomplete-dropdown';
import MainNav from './src/navigation/main-nav';
import Realm from 'realm';
import {useApp, AppProvider, UserProvider} from '@realm/react';
import {realmContext} from './RealmContext';
import {APP_ID} from '@env';
import {GlobalProvider, useGlobal} from './src/contexts/GlobalContext';
import LoadingOverlay from './src/components/loadingOverlay';
const {RealmProvider, useRealm} = realmContext;

export default function AppWrapper() {
  return (
    <GlobalProvider>
      <AppProvider
        id={APP_ID}
        logLevel={'trace'}
        logger={(level, message) => console.log(`[${level}]: ${message}`)}>
        <UserProvider fallback={LogIn}>
          <App />
        </UserProvider>
      </AppProvider>
    </GlobalProvider>
  );
}
const App = () => {
  return (
    <RealmProvider
      // fallback={<LoadingOverlay />}
      sync={{
        flexible: true,
        initialSubscriptions: {
          update(subs, realm) {
            subs.add(realm.objects('users'));
            subs.add(realm.objects('farms'));
            subs.add(realm.objects('activities'));
            subs.add(realm.objects('foliars'));
            subs.add(realm.objects('pesticides'));
            subs.add(realm.objects('plants'));
            subs.add(realm.objects('fertilizers'));
            subs.add(realm.objects('fungicides'));
            subs.add(realm.objects('notifications'));
          },
        },
        clientReset: {
          mode: 'discardUnsyncedChanges',
          onBefore: realm => {
            console.log('Beginning client reset for ', realm.path);
          },
          onAfter: (beforeRealm, afterRealm) => {
            console.log('Finished client reset for', beforeRealm.path);
            console.log('New realm path', afterRealm.path);
          },
        },
        onError: console.error,
      }}>
      <AutocompleteDropdownContextProvider>
        <PaperProvider theme={THEME}>
          <LoadingOverlay />
          <MainNav />
        </PaperProvider>
      </AutocompleteDropdownContextProvider>
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
      const realm = useRealm();
      console.log('error type is ClientReset....');
      const path = realm.path; // realm.path will not be accessible after realm.close()
      realm.close();
      Realm.App.Sync.initiateClientReset(app, path);
      // Download Realm from the server.
      // Ensure that the backend state is fully downloaded before proceeding,
      // which is the default behavior.
      realm = await Realm.open();
      realm.close();
    } catch (err) {
      console.error(err);
    }
  }
}

const LogIn = () => {
  const {isLoading, setIsLoading} = useGlobal();
  async function logInUser() {
    const app = useApp(APP_ID);
    try {
      console.log('here');
      await app.logIn(Realm.Credentials.anonymous());
    } catch (error) {
      if (error.name === 'InvalidSessionError') {
        console.log('error');
        // Handle the "invalid session" error here
        // You can log the user out, prompt them to log in again, etc.
        await app.currentUser?.logOut();
        // await app.logIn(Realm.Credentials.anonymous());
      }
    }
  }
  logInUser();

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <Text>Test</Text>
    </View>
  );
};

const LightTheme = require('./src/assets/LightTheme.json');
const THEME = {
  ...MD3DefaultTheme,
  colors: LightTheme.colors,
};
