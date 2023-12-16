import React, {useState, useEffect} from 'react';
import Realm from 'realm';
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
import {realmContext} from '../../RealmContext';
import {useGlobal} from '../contexts/GlobalContext';
import TaskScreenNav from './task-screen-nav';
import {SafeAreaView} from 'react-native-safe-area-context';
import {MMKVLoader} from 'react-native-mmkv-storage';
import {Notification} from '../schemas/notification.schema';

const Tab = createBottomTabNavigator();

export default function TabsNavbar({route}) {
  const {useQuery, useRealm} = realmContext;
  const {realm} = useRealm();
  const {userId, farmId, userData} = useGlobal();
  const {colors} = useTheme();
  const userRole = userData?.role;
  const notifications = useQuery(Notification).sorted('createdAt', true);
  const [newNotiLength, setNewNotiLength] = useState(0);
  const [currentUserNoti, setCurrentUserNoti] = useState([]);

  console.log('newNotiLength: ', newNotiLength);
  const MMKV = new MMKVLoader().initialize();
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  useEffect(() => {
    console.log('GetNoti');
    const commonFilter = 'farmId CONTAINS $0 && markedId != $2';
    const displayNoti = notifications.filtered(
      `${commonFilter} && ${
        userRole == 'farmer'
          ? ' assigneeId CONTAINS $1'
          : '!(category == "task" && userId == $1)'
      }`,
      farmId.toString(),
      userId.toString(),
      userId.toString(),
    );
    const unreadNoti = displayNoti.filtered(
      'NONE readUsers == $0',
      userId.toString(),
    );

    // const unreadNoti = displayNoti.filtered(
    //   'NONE readUsers == $0',
    //   userId.toString(),
    // );
    console.log('TotalUnread: ', unreadNoti.length);
    console.log('TotalCurrentNoti: ', displayNoti.length);
    setNewNotiLength(unreadNoti.length);
    setCurrentUserNoti(displayNoti);
  }, []);

  const style = StyleSheet.create({
    rightContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    badge: {
      // flex: 1,
      // alignSelf: 'flex-start',
      position: 'absolute',
      top: 5,
      right: 5,
    },
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
          // maxWidth: '50%',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: () => (
          <SafeAreaView style={style.rightContainer}>
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
                maxWidth: '60%',
                // maxHeight: 10,
              }}>
              <Text
                variant="titleMedium"
                style={{
                  color: colors.tertiary,
                  fontWeight: 'bold',
                  fontSize: 12,
                }}>
                {route.params.farmName}
              </Text>
            </Button>
            <SafeAreaView style={{top: 2}}>
              <IconButton
                icon="bell"
                size={20}
                onPress={() =>
                  navigation.navigate('Notification', {
                    notifications: currentUserNoti,
                  })
                }
              />
              {newNotiLength ? (
                <Badge size={15} style={style.badge}>
                  {newNotiLength}
                </Badge>
              ) : null}
            </SafeAreaView>
            <IconButton
              icon="logout-variant"
              iconColor="#FF2C2C"
              style={{
                marginTop: 10,
                // flex: 1,
                // alignItems: 'center',
                // justifyContent: 'center',
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
      {/* <Tab.Screen
        name="Notification"
        component={NotificationNav}
        options={{
          tabBarLabel: 'Notification',
          tabBarIcon: ({color, size}) => {
            return (
              <SafeAreaView style={{flexDirection: 'row'}}>
                <Icon name="bell" size={size} color={color} />
                <Badge size={15} style={style.badge}>
                  3
                </Badge>
              </SafeAreaView>
            );
          },
        }}
      /> */}
    </Tab.Navigator>
  );
}
