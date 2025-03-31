import * as Notifications from 'expo-notifications';
import { Button } from 'react-native';

const sendTestNotification = async () => {
  console.log('Sending test notification...');
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Test Notification',
      body: 'This is a test notification!',
      sound: 'default',
    },
    trigger: {
      seconds: 5, // This will trigger the notification 5 seconds after pressing the button
    },
  });
};

return (
  <View>
    <Button title="Send Test Notification" onPress={sendTestNotification} />
  </View>
);
