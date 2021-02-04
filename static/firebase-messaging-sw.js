/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCiYflBpvnQKgJur5yzHrvHieO4MSDyrBU',
  authDomain: 'meatthesea-b7855.firebaseapp.com',
  databaseURL: 'https://meatthesea-b7855.firebaseio.com',
  projectId: 'meatthesea-b7855',
  storageBucket: 'meatthesea-b7855.appspot.com',
  messagingSenderId: '1062131230146',
  appId: '1:1062131230146:web:c9bd2373ac60aef503a25b',
  measurementId: 'G-9QVGTT3QWV'
};

self.addEventListener('notificationclick', function (event) {
  const url = event.currentTarget.location.origin
  event.waitUntil(
    clients.matchAll({includeUncontrolled: true, type: 'window'}).then( windowClients => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        console.log('::: ', client)
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
);
})

firebase.initializeApp(firebaseConfig)

const messaging = firebase.messaging()
