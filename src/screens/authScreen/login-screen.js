import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';
import * as bcrypt from 'bcryptjs';
import Realm from 'realm';
import {realmContext} from '../../../RealmContext';
import {SafeAreaView} from 'react-native-safe-area-context';

import {User} from '../../schemas/user.schema';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {useQuery, useRealm} = realmContext;
  const realm = useRealm();
  const users = useQuery(User);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(User));
    });
    console.log('Total users: ', users.length);
    global.currentUser = users.filtered(
      'email CONTAINS $0',
      'farmowner@ifarm.com',
    );
    global.currentUserId = global.currentUser[0]?._id;
  }, [realm, User]);

  // const app = useApp();
  // async function handleLogIn() {
  //   // When anonymous authentication is enabled, users can immediately log
  //   // into your app without providing any identifying information.
  //   await app.logIn(Realm.Credentials.anonymous());
  // }

  const handleLogIn = async () => {
    if (await validateCredentials()) {
      navigation.navigate('Tabs');
    }
  };

  const validateCredentials = async () => {
    var isMatch = false;
    const currentUserPassword = global.currentUser[0].password;
    isMatch = await bcrypt.compare(password, currentUserPassword);
    console.log('Login: ' + isMatch);
    return isMatch;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text variant="headlineMedium">Login</Text>
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={email => setEmail(email)}
      />
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={password => setPassword(password)}
      />
      <Button
        mode="contained"
        onPress={() => {
          handleLogIn();
        }}
        style={{width: 100, alignSelf: 'flex-end', margin: 20}}>
        Log In
      </Button>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 20,
  },
});
