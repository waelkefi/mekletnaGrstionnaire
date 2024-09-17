const { Expo } = require('expo-server-sdk');

const expo = new Expo();
// Function to send push notifications
const sendPushNotification = async (expoPushToken, title, body) => {
  const message = [
    {
      to: expoPushToken,
      sound: 'default',
      title,
      body,
    },
  ];

  // Send the notification
  const chunks = expo.chunkPushNotifications(message);
  const tickets = [];

  for (const chunk of chunks) {
    try {
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  }

  // Process the tickets for any errors or failures
  const receiptIds = [];

  for (const ticket of tickets) {
    if (ticket.status === 'ok') {
      receiptIds.push(ticket.id);
    }
  }

  // You can store and handle the receipt IDs as needed
};


module.exports = {
  sendPushNotification
};