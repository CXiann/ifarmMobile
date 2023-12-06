import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import {Text, TextInput, Button, useTheme} from 'react-native-paper';
import * as bcrypt from 'bcryptjs';
import Realm from 'realm';
import {realmContext} from '../../../RealmContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGlobal} from '../../contexts/GlobalContext';
import logo from '../../assets/images/logo.png';

import {User} from '../../schemas/user.schema';

const LoginScreen = ({navigation}) => {
  const {userData, setUserId, setUserData, setUserName} = useGlobal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [passFocus, setPassFocus] = useState(false);
  const {setIsLoading} = useGlobal();
  const [err, setErr] = useState(false);
  const [visible, setVisible] = useState(false);
  const {colors} = useTheme();

  const {useQuery, useRealm} = realmContext;
  const realm = useRealm();
  const users = useQuery(User);

  useEffect(() => {
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(User));
    });
    console.log('Total users: ', users.length);
    const currentUser = users.filtered(
      'email CONTAINS $0',
      'farmowner@ifarm.com',
    )[0];
    setUserData(currentUser);
    setUserId(currentUser?._id);
    setUserName(currentUser?.name.eng);
    setIsLoading(false);
  }, [realm]);

  // const app = useApp();
  // async function handleLogIn() {
  //   // When anonymous authentication is enabled, users can immediately log
  //   // into your app without providing any identifying information.
  //   await app.logIn(Realm.Credentials.anonymous());
  // }

  const handleLogIn = async () => {
    Keyboard.dismiss();
    setIsLoading(true);
    const isMatch = await validateCredentials();
    if (isMatch) {
      setErr(false);
      console.log('Login: ' + isMatch);
      navigation.navigate('Farm Selector');
    } else {
      setErr(true);
      console.log('Login: ' + isMatch);
      setIsLoading(false);
    }
  };

  const validateCredentials = async () => {
    var isMatch = false;
    const currentUserPassword = userData.password;
    isMatch = await bcrypt.compare(password, currentUserPassword);
    return isMatch;
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: colors.secondaryContainer,
    },
    imageContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    inputContainer: {
      padding: 20,
      flex: 1,
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      elevation: 10,
    },
    button: {
      alignSelf: 'center',
      minWidth: '90%',
      position: 'absolute',
      bottom: '5%',
    },
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.imageContainer}>
          <Image
            source={logo}
            alt="logo"
            resizeMode="contain"
            style={{
              maxWidth: '100%', // Set the maximum width
              maxHeight: 200, // Set the maximum height if needed
            }}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.inputContainer}>
          <Text
            variant="titleLarge"
            style={{marginBottom: 13, fontWeight: 'bold'}}>
            Login
          </Text>
          <TextInput
            mode="flat"
            label="Email"
            placeholder="Enter Email"
            style={{marginBottom: 5, backgroundColor: 'white'}}
            error={err}
            value={email}
            onChangeText={email => setEmail(email)}
          />
          <TextInput
            mode="flat"
            label="Password"
            error={err}
            onFocus={() => setPassFocus(true)}
            onBlur={() => setPassFocus(false)}
            secureTextEntry={isHidden}
            placeholder="Enter Password"
            style={{backgroundColor: 'white', marginBottom: 10}}
            right={
              <TextInput.Icon
                icon={isHidden ? 'eye' : 'eye-off'}
                color={
                  passFocus
                    ? colors.primary
                    : err
                    ? colors.error
                    : colors.outline
                }
                onPress={() => {
                  setIsHidden(!isHidden);
                }}
              />
            }
            value={password}
            onChangeText={password => setPassword(password)}
          />
          {err && (
            <Text style={{color: colors.error}}>Invalid Login Credential</Text>
          )}
          <Button
            mode="contained"
            onPress={() => {
              handleLogIn();
            }}
            style={styles.button}>
            Log In
          </Button>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default LoginScreen;
