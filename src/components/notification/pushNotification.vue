<template>
  <div>
  </div>
</template>
<script>
/* eslint-disable */
import USER from '../../services/auth'
import CONFIG from 'src/config'
import firebase from 'firebase/app'
import AUTH from 'src/services/auth'
import 'firebase/messaging'
export default {
  props: ['currentToken'],
  data () {
    return {
      hasServiceWorker: false,
      auth: AUTH
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      console.log('initialize')
      if (!('serviceWorker' in navigator)) {
        console.warn('serviceWorker not working')
        return
      }
      if (!('PushManager' in window)) {
        console.warn('PushManager not working')
        return
      }
      this.hasServiceWorker = true
    },
    askForPermission () {
      // console.log('perimission')
      // if (!this.hasServiceWorker) {
      //   return
      // }
      // // console.firebase | project settins | cloud message | web config | Key pair
      // firebase.messaging.usePublicVapidKey(CONFIG.vapidKey)
      // navigator.serviceWorker.register('./static/firebase-messaging-sw.js')
      //   .then((registration) => {
      //     console.log('serviceworker')
      //     firebase.messaging.useServiceWorker(registration)

      //     firebase.messaging.requestPermission().then(() => {

      //       firebase.messaging.getToken().then((token) => {
      //         if (token !== this.currentToken) {
      //           console.log('token ', token)
      //           this.$emit('update-token', token)
                
      //             let topic = 'MeatTheSea'

      //             fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/' + topic, {
      //               method: 'POST',
      //               headers: new Headers({
      //                 'Authorization': `key=${CONFIG.firebaseServerKey}`
      //               })
      //             }).then(response => {
      //               if (response.status < 200 || response.status >= 400) {
      //                 throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
      //               }
      //               console.log('Subscribed to "'+topic+'"');
      //             }).catch(error => {
      //               console.error(error);
      //             })
      //         }
      //       }).catch((err) => console.log('--- token error:', err))

      //     }).catch(function (err) {
      //       console.log('Unable to get permission to notify.', err)
      //     })

      //   }).catch(err => {
      //     console.log('error register', err)
      //   })

      // firebase.messaging.onMessage((payload) => {
      //   console.log('notification ', payload)
      //   if(payload.data.topic !== null && payload.data.topic !== undefined){
      //     switch(payload.data.topic.toLowerCase()) {
      //       case 'acceptorder':
      //         USER.setNotificationOrders(payload)
      //         break
      //       case 'crockery':
      //         USER.setNotificationCrockery(payload)
      //         break
      //     }
      //   }
      //   this.$emit('new-message', payload)
      // })

      if (!this.hasServiceWorker) {
        return
      }

      firebase.initializeApp({
        apiKey: 'AIzaSyCiYflBpvnQKgJur5yzHrvHieO4MSDyrBU',
        authDomain: 'meatthesea-b7855.firebaseapp.com',
        databaseURL: 'https://meatthesea-b7855.firebaseio.com',
        projectId: 'meatthesea-b7855',
        storageBucket: 'meatthesea-b7855.appspot.com',
        messagingSenderId: '1062131230146',
        appId: '1:1062131230146:web:c9bd2373ac60aef503a25b',
        measurementId: 'G-9QVGTT3QWV'
      })

      navigator.serviceWorker.register('static/firebase-messaging-sw.js')
        .then((registration) => {
          const messaging = firebase.messaging()
          messaging.useServiceWorker(registration)

          messaging.requestPermission().then(() => {

            messaging.getToken().then((token) => {
              if (token !== this.currentToken) {

                let topic = 'MeatTheSea-' + USER.user.userID
                
                fetch('https://iid.googleapis.com/iid/v1/' + token + '/rel/topics/' + topic, {
                  method: 'POST',
                  headers: new Headers({
                    'Authorization': `key=${CONFIG.firebaseServerKey}`
                  })
                }).then(response => {
                  if (response.status < 200 || response.status >= 400) {
                    throw 'Error subscribing to topic: ' + response.status + ' - ' + response.text();
                  }
                  console.log('Subscribed to "' + topic + '"');
                }).catch(error => {
                  console.error(error);
                })
              }
            }).catch((err) => console.log('--- token error:', err))

          }).catch(function (err) {
            console.log('Unable to get permission to notify.', err)
          })

          messaging.onMessage((payload) => {
            // this.$emit('new-message', payload)
            if (payload.data.topic !== undefined && payload.data.topic !== null && payload.data.topic !== '' ) {
              switch(payload.data.topic.replace(/-[0-9]/, '').toLowerCase()) {
                case 'placeorder':
                  console.log('new order')
                  AUTH.setNotificationType('order')
                  AUTH.setNotificationOrders(payload)
                  this.$emit('new-message', payload)
                  break
                case 'crockery':
                  console.log('new crockery')
                  AUTH.setNotificationType('crockery')
                  AUTH.setNotificationCrockery(payload)
                  this.$emit('new-message', payload)
                  break
              }
              console.log('<new message> ', payload)
            }
          })

          self.addEventListener('notificationclick', function(event) {
            event.notification.close();
            event.waitUntil(clients.matchAll({
              type: "window"
            }).then(function(clientList) {
              for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url == '/' && 'focus' in client)
                  return client.focus();
              }
              if (clients.openWindow)
                return clients.openWindow('/');
            }));
          });

        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
