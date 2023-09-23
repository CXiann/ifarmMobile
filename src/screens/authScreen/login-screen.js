import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper';

import Realm from 'realm';
import {useApp} from '@realm/react';
import {SafeAreaView} from 'react-native-safe-area-context';

const LoginScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const app = useApp();
  // async function handleLogIn() {
  //   // When anonymous authentication is enabled, users can immediately log
  //   // into your app without providing any identifying information.
  //   await app.logIn(Realm.Credentials.anonymous());
  // }

  const handleLogIn = () => {
    props.navigation.navigate('Tabs');
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
