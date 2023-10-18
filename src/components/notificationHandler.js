import PushNotification, {Importance} from 'react-native-push-notification';
import {useEffect} from 'react';

const NotificationHandler = () => {
    useEffect(() => {
        getChannels();
        // createChannel();
        testPushNotification();
        testScheduleNotification();
    }, [])
}

const createChannel = () => {
    PushNotification.createChannel(
        {
          channelId: "channel-1",
          channelName: "Test Channel"
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
}

const getChannels = () => {
    PushNotification.getChannels(function (channel_ids) {
        console.log(channel_ids); // ['channel_id_1']
    });
}

const testPushNotification = () => {
    console.log("Entered testPushNotification");
    PushNotification.localNotification({
        channelId: "channel-1",
        title: "Test Noti", // (optional)
        message: "This is a Test Notification Message", // (required)
    });
}

const testScheduleNotification = () => {
    console.log("Entered testScheduleNotification");
    PushNotification.localNotificationSchedule({
        channelId: "channel-1",
        title: "Test Noti", // (optional)
        message: "This is a Test Notification Message", // (required)
        date: new Date(Date.now() + 60 * 1000), // in 10 secs

        repeatType: 'minute',
        repeatTime: 1,
    });
}

export default NotificationHandler;