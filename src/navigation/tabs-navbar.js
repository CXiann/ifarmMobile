import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Button,
  BottomNavigation,
  Badge,
  IconButton,
  Text,
  useTheme,
  Portal,
  Dialog,
} from 'react-native-paper';
import {CommonActions} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screens/home-screen';
import ActivitiesScreenNav from './activity-screen-nav';
import TestScreen from '../screens/test-screen';
import TaskScreenNav from './task-screen-nav';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MMKVLoader} from 'react-native-mmkv-storage';

const Tab = createBottomTabNavigator();

export default function TabsNavbar({route}) {
  const {colors} = useTheme();
  const MMKV = new MMKVLoader().initialize();
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const style = StyleSheet.create({
    rightContainer: {
      flexDirection: 'row',
      // backgroundColor: 'white',
      // paddingBottom: 10,
      // justifyContent: 'center',
    },
    badge: {},
  });
  return (
    <Tab.Navigator
      screenOptions={({navigation}) => ({
        // lazy: false,
        headerLeft: null,
        headerStyle: {
          backgroundColor: colors.primaryContainer,
        },
        headerRightContainerStyle: {
          paddingRight: '3%',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <SafeAreaView style={style.rightContainer}>
            {/* <Button
              mode="elevated"
              icon="arrow-right"
              onPress={() => navigation.navigate('Farm Selector')}
              contentStyle={{flexDirection: 'row-reverse'}}>
              Change Farm
            </Button> */}
            {/* <IconButton
              icon="bell"
              iconColor="black"
              size={20}
              onPress={() => console.log('Pressed')}
            />
            <Badge style={style.badge}>3</Badge> */}

            <Button
              mode="elevated"
              icon="arrow-right"
              onPress={() => navigation.navigate('Farm Selector')}
              contentStyle={{
                flexDirection: 'row-reverse',
                justifyContent: 'center',
                backgroundColor: colors.secondaryContainer,
              }}
              labelStyle={{color: colors.outline}}
              style={{
                margin: 4,
                maxWidth: '80%',
              }}>
              <Text
                variant="titleMedium"
                style={{
                  color: colors.tertiary,
                  fontWeight: 'bold',
                  fontSize: 15,
                }}>
                {route.params.farmName}
              </Text>
            </Button>
            <IconButton
              icon="logout-variant"
              iconColor="gray"
              style={{
                marginTop: 10,
                // backgroundColor: colors.secondaryContainer,
              }}
              size={20}
              onPress={() => showDialog()}
            />
            <Portal>
              <Dialog
                visible={visible}
                onDismiss={hideDialog}
                style={{backgroundColor: 'white'}}>
                <Dialog.Icon icon="alert-circle" size={30} />
                <Dialog.Title>Confirm Logout</Dialog.Title>
                <Dialog.Content>
                  <Text variant="bodyMedium">
                    Are you sure you want to logout?
                  </Text>
                </Dialog.Content>
                <Dialog.Actions>
                  <SafeAreaView
                    style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Button
                      textColor="#C23E3B"
                      // style={{marginRight: 20}}
                      onPress={hideDialog}>
                      No
                    </Button>
                    <Button
                      textColor="#62A87C"
                      // style={{width: 80}}
                      onPress={() => {
                        hideDialog();
                        MMKV.setBool('persistAccount', false);
                        MMKV.removeItem('persistEmail');
                        MMKV.removeItem('persistPassword');
                        navigation.navigate('Login');
                      }}>
                      Yes
                    </Button>
                  </SafeAreaView>
                </Dialog.Actions>
              </Dialog>
            </Portal>
          </SafeAreaView>
        ),
      })}
      initialRouteName="Home"
      tabBar={({navigation, state, descriptors, insets}) => (
        <BottomNavigation.Bar
          navigationState={state}
          safeAreaInsets={insets}
          // activeColor="#afff76"
          // inactiveColor="#000000"

          onTabPress={({route, preventDefault}) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
              navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({route, focused, color}) => {
            const {options} = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({focused, color, size: 24});
            }

            return null;
          }}
          getLabelText={({route}) => {
            const {options} = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
          style={{backgroundColor: colors.primaryContainer}}
        />
      )}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => {
            return <Icon name="home" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Activities"
        component={ActivitiesScreenNav}
        options={{
          tabBarLabel: 'Activities',
          tabBarIcon: ({color, size}) => {
            return <Icon name="weather-sunny" size={size} color={color} />;
          },
        }}
      />
      {/* <Tab.Screen
        name="Test"
        component={TestScreen}
        options={{
          tabBarLabel: 'Test',
          tabBarIcon: ({color, size}) => {
            return <Icon name="tools" size={size} color={color} />;
          },
        }}
      /> */}
      <Tab.Screen
        name="Task"
        component={TaskScreenNav}
        options={{
          tabBarLabel: 'Task',
          tabBarIcon: ({color, size}) => {
            return (
              <Icon
                name="newspaper-variant-outline"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
