<template>
  <div>
  </div>
</template>
<script>
/* eslint-disable */
import firebase from '../../services/firebase'
import USER from '../../services/auth'
import CONFIG from 'src/config'
// import firebase from 'firebase'
export default {
  props: ['currentToken'],
  data () {
    return {
      hasServiceWorker: false
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
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
      if (!this.hasServiceWorker) {
        return
      }
      // console.firebase | project settins | cloud message | web config | Key pair
      firebase.messaging.usePublicVapidKey(CONFIG.vapidKey)
      navigator.serviceWorker.register('./static/firebase-messaging-sw.js')
        .then((registration) => {

          firebase.messaging.useServiceWorker(registration)

          firebase.messaging.requestPermission().then(() => {

            firebase.messaging.getToken().then((token) => {
              if (token !== this.currentToken) {
                console.log('token ', token)
                this.$emit('update-token', token)
                  let topic = 'MeatTheSea-' + USER.user.userID

                  fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/' + topic, {
                    method: 'POST',
                    headers: new Headers({
                      'Authorization': `key=${CONFIG.firebaseServerKey}`
                    })
                  }).then(response => {
                    if (response.status < 200 || response.status >= 400) {
                      throw 'Error subscribing to topic: '+response.status + ' - ' + response.text();
                    }
                    console.log('Subscribed to "'+topic+'"');
                  }).catch(error => {
                    console.error(error);
                  })
              }
            }).catch((err) => console.log('--- token error:', err))

          }).catch(function (err) {
            console.log('Unable to get permission to notify.', err)
          })

        }).catch(err => {
          console.log('error register', err)
        })

      firebase.messaging.onMessage((payload) => {
        console.log('notification ', payload)
        switch(payload.data.topic.toLowerCase()) {
          case 'acceptorder':
            USER.setNotificationOrders(payload)
            break
          case 'crockery':
            USER.setNotificationCrockery(payload)
            break
        }
        this.$emit('new-message', payload)
      })
    }
  }
}
</script>
