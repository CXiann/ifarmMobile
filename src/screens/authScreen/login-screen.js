import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Keyboard, Image} from 'react-native';
import {Text, TextInput, Button, useTheme, Checkbox} from 'react-native-paper';
import * as bcrypt from 'bcryptjs';
import {realmContext} from '../../../RealmContext';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useGlobal} from '../../contexts/GlobalContext';
import logo from '../../assets/images/logo.png';
import {MMKVLoader} from 'react-native-mmkv-storage';

import {User} from '../../schemas/user.schema';

const LoginScreen = ({navigation}) => {
  const MMKV = new MMKVLoader().initialize();

  const {setUserId, setUserData, setUserName} = useGlobal();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHidden, setIsHidden] = useState(true);
  const [passFocus, setPassFocus] = useState(false);
  const {setIsLoading} = useGlobal();
  const [err, setErr] = useState(false);
  const [checked, setChecked] = useState(false);
  const {colors} = useTheme();

  const {useQuery, useRealm} = realmContext;
  const realm = useRealm();
  const users = useQuery(User);

  useEffect(() => {
    console.log('persistAccount: ', MMKV.getBool('persistAccount'));
    console.log('persistEmail: ', MMKV.getString('persistEmail'));
    setIsLoading(true);
    const checkPersist = async () => {
      if (MMKV.getBool('persistAccount')) {
        var isValid = false;
        const currentUser = users.filtered(
          'email CONTAINS $0',
          MMKV.getString('persistEmail'),
        )[0];
        console.log('Current User: ', currentUser ? true : false);
        if (currentUser) {
          isValid = await bcrypt.compare(
            MMKV.getString('persistPassword'),
            currentUser.password,
          );
        }
        console.log('IsValid: ', isValid);
        if (isValid) {
          console.log('Login: ' + isValid);
          setUserData(currentUser);
          setUserId(currentUser?._id);
          setUserName(currentUser?.name.eng);
          navigation.navigate('Farm Selector');
        } else {
          console.log('Credential Lost');
        }
      }
      setIsLoading(false);
    };
    realm.subscriptions.update(mutableSubs => {
      // Create subscription for filtered results.
      mutableSubs.add(realm.objects(User));
    });
    console.log('Total users: ', users.length);
    checkPersist();
  }, [realm]);

  const handleLogIn = async () => {
    var isValid = false;
    Keyboard.dismiss();
    setIsLoading(true);
    const currentUser = users.filtered('email CONTAINS $0', email)[0];
    if (currentUser && currentUser.role != 'admin') {
      console.log('if');
      isValid = await validateCredentials(currentUser);
    } else {
      console.log('else');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    console.log('Valid: ', isValid);
    if (isValid) {
      setErr(false);
      console.log('Login: ' + isValid);
      if (checked) {
        MMKV.setString('persistEmail', email);
        MMKV.setString('persistPassword', password);
        MMKV.setBool('persistAccount', true);
      }
      setUserData(currentUser);
      setUserId(currentUser?._id);
      setUserName(currentUser?.name.eng);
      navigation.navigate('Farm Selector');
    } else {
      setErr(true);
      console.log('Login: ' + isValid);
      setIsLoading(false);
    }
    setEmail('');
    setPassword('');
  };

  const validateCredentials = async currentUserData => {
    var isMatch = false;
    const currentUserPassword = currentUserData.password;
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
      marginTop: 50,
    },
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={logo}
            alt="logo"
            resizeMode="contain"
            style={{
              maxWidth: '100%', // Set the maximum width
              maxHeight: 200, // Set the maximum height if needed
            }}
          />
        </View>
        <View style={styles.inputContainer}>
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
                icon={isHidden ? 'eye-off' : 'eye'}
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
          <View style={{flexDirection: 'row'}}>
            <Checkbox
              status={checked ? 'checked' : 'unchecked'}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <Text style={{alignSelf: 'center'}}>Keep me logged in</Text>
          </View>
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
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
