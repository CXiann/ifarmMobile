import React, {useState, useEffect} from 'react';
import {BSON} from 'realm';
import {StyleSheet, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Divider, Avatar, useTheme, ActivityIndicator} from 'react-native-paper';
import {realmContext} from '../../../RealmContext';
import {useGlobal} from '../../contexts/GlobalContext';
import {FlatList} from 'react-native-gesture-handler';

const NotificationTaskScreen = ({navigation, route}) => {
  const {notifications} = route.params;
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

  const isUserFarmer = userData?.role == 'farmer';
  const [renderCount, setRenderCount] = useState(10);
  const [loading, setLoading] = useState(false);

  console.log('current noti: ', notifications.length);

  useEffect(() => {
    const handleBackPress = () => {
      console.log('Back button pressed!');
      realm.write(() => {
        notifications.slice(0, renderCount).map(noti => {
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
    const isUserAssignee = item.assigneeId == userId;
    const isUserAssigner = item.userId == userId;
    const isTask = item.category == 'task';
    const isAssigneeFarmer =
      realm
        .objects('users')
        .filtered('_id == $0', BSON.ObjectId(item.assigneeId))[0]?.role ==
      'farmer';
    const isMarkedFarmer =
      realm
        .objects('users')
        .filtered('_id == $0', BSON.ObjectId(item.markedId))[0]?.role ==
      'farmer';

    return (
      <SafeAreaView
        style={
          item.readUsers.includes(userId.toString())
            ? styles.containerSeen
            : styles.containerXSeen
        }>
        <SafeAreaView style={{justifyContent: 'center'}}>
          <Avatar.Icon {...avatarStyle} />
        </SafeAreaView>
        <SafeAreaView style={styles.contentContainer}>
          <Text
            style={styles.contentTop}
            numberOfLines={4}
            ellipsizeMode="tail">
            <Text style={styles.boldText}>
              {isTask ? item.userName?.eng : item.markedName?.eng}
            </Text>
            {isTask ? (
              isUserFarmer || isUserAssignee ? (
                <>
                  <Text>{' has assigned you a task to be completed by '}</Text>
                  <Text style={styles.boldText}>{processDate}</Text>
                </>
              ) : (
                <>
                  <Text>{' has assigned '}</Text>
                  <Text style={styles.boldText}>{item.assigneeName?.eng}</Text>
                  <Text>{' a task to be completed by '}</Text>
                  <Text style={styles.boldText}>{processDate}</Text>
                </>
              )
            ) : isUserFarmer || isUserAssignee ? (
              <>
                <Text>{' has marked '}</Text>
                <Text style={styles.boldText}>{'COMPLETE'}</Text>
                <Text>{' on a task assigned by '}</Text>
                <Text style={styles.boldText}>{item.userName?.eng}</Text>
                <Text>{' to you on '}</Text>
                <Text style={styles.boldText}>{processDate}</Text>
              </>
            ) : isUserAssigner ? (
              <>
                <Text>{' has marked '}</Text>
                <Text style={styles.boldText}>{'COMPLETE'}</Text>
                <Text>{' on a task assigned by you on '}</Text>
                <Text style={styles.boldText}>{processDate}</Text>
              </>
            ) : isAssigneeFarmer ? (
              <>
                <Text>{' has marked '}</Text>
                <Text style={styles.boldText}>{'COMPLETE'}</Text>
                <Text>{' on a task assigned by '}</Text>
                <Text style={styles.boldText}>{item.userName?.eng}</Text>
                <Text>{' to '}</Text>
                <Text style={styles.boldText}>{item.assigneeName?.eng}</Text>
                <Text>{' on '}</Text>
                <Text style={styles.boldText}>{processDate}</Text>
              </>
            ) : isMarkedFarmer ? (
              <>
                <Text>{' has marked '}</Text>
                <Text style={styles.boldText}>{'COMPLETE'}</Text>
                <Text>{' on a task assigned by '}</Text>
                <Text style={styles.boldText}>{item.assigneeName?.eng}</Text>
                <Text>{' on '}</Text>
                <Text style={styles.boldText}>{processDate}</Text>
              </>
            ) : (
              <>
                <Text>{' has marked '}</Text>
                <Text style={styles.boldText}>{'COMPLETE'}</Text>
                <Text>{' on a task assigned to '}</Text>
                <Text style={styles.boldText}>{item.assigneeName?.eng}</Text>
                <Text>{' on '}</Text>
                <Text style={styles.boldText}>{processDate}</Text>
              </>
            )}
          </Text>
          <Text style={styles.contentBottom}>
            <Text style={styles.contentBottomLeft}>{'Task: '}</Text>
            <Text style={styles.contentBottomRight}>{item?.content}</Text>
          </Text>

          <Text style={styles.date}>{processDateCreated}</Text>
        </SafeAreaView>
      </SafeAreaView>
    );
  };

  const handleLoadMore = () => {
    setLoading(true);

    // Use setTimeout for the delay
    setTimeout(() => {
      setLoading(false);
      console.log('RC: ', renderCount);
      console.log('Notilength: ', notifications.length);
      renderCount < notifications.length && setRenderCount(prev => prev + 10);
    }, 1000);
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
      maxWidth: '90%',
    },
    contentBottom: {
      maxWidth: '90%',
      marginBottom: 5,
    },
    contentBottomLeft: {
      fontWeight: 'bold',
      color: colors.primary,
    },
    contentBottomRight: {
      color: colors.primary,
      fontWeight: 'bold',
    },
    date: {
      color: 'darkgray',
    },
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        removeClippedSubviews={true}
        data={notifications.slice(0, renderCount)}
        initialNumToRender={5}
        keyExtractor={item => item._id.toString()} // Replace 'id' with the unique identifier in your data
        renderItem={renderItem}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
      />
      {loading ? (
        <SafeAreaView style={{marginVertical: 5}}>
          <ActivityIndicator animating={true} size="small" />
        </SafeAreaView>
      ) : null}
    </SafeAreaView>
  );
};

export default NotificationTaskScreen;
