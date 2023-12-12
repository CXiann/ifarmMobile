import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, Avatar} from 'react-native-paper';

const NotificationWeatherScreen = () => {
  const styles = StyleSheet.create({
    container: {
      padding: 16,
      flexDirection: 'row',
    },
    avatar: {
      marginRight: 15,
    },
    contentContainer: {
      flexDirection: 'column',
      width: '85%',
    },
    content: {
      color: 'black',
    },
    date: {
      color: 'darkgray',
    },
  });
  return (
    <SafeAreaView>
      <SafeAreaView style={styles.container}>
        <Avatar.Icon size={50} icon="folder" style={styles.avatar} />
        <SafeAreaView style={{flexDirection: 'column'}}>
          <Text>WeatherNotificationScreen</Text>
          <Text>Mango</Text>
        </SafeAreaView>
      </SafeAreaView>
      {/* <Divider bold={true} /> */}
      <SafeAreaView style={styles.container}>
        <Avatar.Icon size={50} icon="folder" style={styles.avatar} />
        <SafeAreaView style={styles.contentContainer}>
          <Text style={styles.content} numberOfLines={3} ellipsizeMode="tail">
            farmowner+" has assigned you a task."
          </Text>
          <Text style={styles.date}>30 Nov at 14:07</Text>
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default NotificationWeatherScreen;
