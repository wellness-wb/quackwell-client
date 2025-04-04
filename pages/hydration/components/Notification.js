import * as Notifications from 'expo-notifications';
import React from 'react';
import { Platform } from 'react-native';

// Configure how notifications are displayed
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default Notification;
