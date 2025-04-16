import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const NotificationSetup = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    // Yêu cầu quyền thông báo
    messaging()
      .requestPermission()
      .then(() => {
        console.log('Quyền đã được cấp');
      })
      .catch((error) => {
        console.log('Quyền bị từ chối', error);
      });

    // Lấy FCM token và lưu trữ
    messaging()
      .getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          setToken(fcmToken);
          console.log('FCM Token: ', fcmToken);
          // Gửi token này lên server của bạn nếu cần
        }
      });

    // Xử lý thông báo khi ứng dụng đang chạy
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('Thông báo được xử lý trong khi ứng dụng đang chạy: ', remoteMessage);
      // Hiển thị thông báo khi ứng dụng đang mở
      if (remoteMessage.notification) {
        Alert.alert('Thông báo', remoteMessage.notification.body);
      }
    });

    // Xử lý khi thông báo mở ứng dụng từ nền
    const unsubscribeOnNotificationOpenedApp = messaging().onNotificationOpenedApp(remoteMessage => {
      console.log('Thông báo mở ứng dụng từ chế độ nền: ', remoteMessage);
      if (remoteMessage.notification) {
        Alert.alert('Thông báo', remoteMessage.notification.body);
      }
    });

    // Xử lý khi ứng dụng được mở từ thông báo
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log('Ứng dụng đã được mở từ thông báo: ', remoteMessage);
          if (remoteMessage.notification) {
            Alert.alert('Thông báo', remoteMessage.notification.body);
          }
        }
      });

    // Dọn dẹp khi component bị unmount
    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };

  }, []);

  return (
    <View>
      <Text>{`FCM Token: ${token}`}</Text>
    </View>
  );
};

export default NotificationSetup;
