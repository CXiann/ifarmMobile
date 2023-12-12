import React, {useEffect} from 'react';
import {BSON} from 'realm';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, Avatar, useTheme} from 'react-native-paper';
import {realmContext} from '../../../RealmContext';
import {useGlobal} from '../../contexts/GlobalContext';
import {FlatList} from 'react-native-gesture-handler';

const NotificationTaskScreen = ({navigation}) => {
  const {colors} = useTheme();
  const monthOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'July',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const icons = [
    {
      category: 'task',
      icon: 'clipboard-list-outline',
      color: 'purple',
    },
    {
      category: 'completed',
      icon: 'sticker-check-outline',
      color: colors.primary,
    },
  ];

  const {useQuery, useRealm} = realmContext;
  const realm = useRealm();
  const {userId, farmId, userData} = useGlobal();

  const isFarmer = userData?.role == 'farmer';
  const notifications = useQuery('notifications').sorted('createdAt', true);

  console.log('all noti: ', notifications.length);
  const userNotiList = isFarmer
    ? notifications
        .filtered(
          'farmId CONTAINS $0 && assigneeId CONTAINS $1 && category IN $2',
          farmId.toString(),
          userId.toString(),
          ['completed', 'task'],
        )
        .slice(0, 10)
    : notifications
        .filtered(
          'farmId CONTAINS $0 && userId != $1 && category IN $2',
          farmId.toString(),
          userId.toString(),
          ['completed', 'task'],
        )
        .slice(0, 10);
  console.log('current noti: ', userNotiList.length);

  useEffect(() => {
    const handleBackPress = () => {
      console.log('Back button pressed!');
      realm.write(() => {
        userNotiList.map(noti => {
          const existed = noti.readUsers.includes(userId.toString());
          if (!existed) {
            noti.readUsers.push(userId.toString());
          }
        });
      });
      return false;
    };

    // Add event listener for the hardware back button
    navigation.addListener('beforeRemove', handleBackPress);
  }, [navigation]);

  const convertDate = dateString => {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1; // Month is zero-based, so add 1
    const date = dateObject.getDate();
    return date + '/' + month + '/' + year;
  };

  const convertDateCreated = dateString => {
    const dateObject = new Date(dateString);

    const year = dateObject.getFullYear();
    const month = monthOfYear[dateObject.getMonth()]; // Month is zero-based, so add 1
    const date = dateObject.getDate();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();

    // Add leading zeros to minutes if needed
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${date} ${month} ${year} at ${hours}:${formattedMinutes}`;
  };

  const getAvatarProp = category => {
    return icons.find(item => item.category === category);
  };

  const renderItem = ({item}) => {
    const avatarStyle = {
      size: 50,
      icon: getAvatarProp(item.category).icon,
      color: 'white',
      style: [
        styles.avatar,
        {backgroundColor: getAvatarProp(item.category).color},
      ],
    };
    const processDate = convertDate(item.date);
    const processDateCreated = convertDateCreated(item.createdAt);
    const isAssignee = item.assigneeId == userId;
    return (
      <SafeAreaView
        style={
          item.readUsers.includes(userId.toString())
            ? styles.containerSeen
            : styles.containerXSeen
        }>
        <Avatar.Icon {...avatarStyle} />
        <SafeAreaView style={styles.contentContainer}>
          <Text
            style={styles.contentTop}
            numberOfLines={3}
            ellipsizeMode="tail">
            <Text style={styles.boldText}>{item.userName.eng}</Text>
            {item.category == 'task' ? (
              isFarmer || isAssignee ? (
                <>
                  <Text>{' has assigned you a task to be completed by '}</Text>
                  <Text style={styles.boldText}>{processDate}</Text>
                </>
              ) : (
                <>
                  <Text>{' has assigned '}</Text>
                  <Text style={styles.boldText}>{item.assigneeName.eng}</Text>
                  <Text>{' a task to be completed by '}</Text>
                  <Text style={styles.boldText}>{processDate}</Text>
                </>
              )
            ) : isFarmer || isAssignee ? (
              <>
                <Text>{' has marked '}</Text>
                <Text style={styles.boldText}>{'COMPLETE'}</Text>
                <Text>{' on a task assigned by you on '}</Text>
                <Text style={styles.boldText}>{processDate}</Text>
              </>
            ) : (
              <>
                <Text>{' has marked '}</Text>
                <Text style={styles.boldText}>{'COMPLETE'}</Text>
                <Text>{' on a task assigned by '}</Text>
                <Text style={styles.boldText}>{item.assigneeName.eng}</Text>
                <Text>{' on '}</Text>
                <Text style={styles.boldText}>{processDate}</Text>
              </>
            )}
          </Text>
          <Text style={styles.contentBottom}>{'"' + item.content + '"'}</Text>
          <Text style={styles.date}>{processDateCreated}</Text>
        </SafeAreaView>
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    containerXSeen: {
      padding: 16,
      flexDirection: 'row',
      backgroundColor: '#d4fcd6',
    },
    containerSeen: {
      padding: 16,
      flexDirection: 'row',
    },
    avatar: {
      marginRight: 15,
      elevation: 2,
    },
    contentContainer: {
      flexDirection: 'column',
      width: '85%',
    },
    boldText: {
      fontWeight: 'bold',
    },
    contentTop: {
      color: 'black',
      maxWidth: '85%',
      // fontWeight: 'bold',
    },
    contentBottom: {
      color: colors.primary,
      maxWidth: '85%',
    },
    date: {
      color: 'darkgray',
    },
  });

  return (
    <SafeAreaView>
      <SafeAreaView>
        {
          <FlatList
            removeClippedSubviews={true}
            data={userNotiList}
            initialNumToRender={8}
            keyExtractor={item => item._id.toString()} // Replace 'id' with the unique identifier in your data
            renderItem={renderItem}
          />
        }
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default NotificationTaskScreen;
