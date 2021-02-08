<template>
  <div>
  </div>
</template>
<script>
/* eslint-disable */
import firebase from '../../services/firebase'
import USER from '../../services/auth'
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
      firebase.messaging.usePublicVapidKey('BORWl5rgguH_-RdktF2efsF9_TgSTrIQ34lR2Bxn1-YoJScH6ir5AfxLQqlFxrDxlR13cdgJdJf7__7f8Ub3Pm0')
      navigator.serviceWorker.register('./static/firebase-messaging-sw.js')
        .then((registration) => {

          firebase.messaging.useServiceWorker(registration)

          firebase.messaging.requestPermission().then(() => {

            firebase.messaging.getToken().then((token) => {
              if (token !== this.currentToken) {
                console.log('token ', token)
                this.$emit('update-token', token)
                  let topic = 'MeatTheSea-1'

                  fetch('https://iid.googleapis.com/iid/v1/'+token+'/rel/topics/' + topic, {
                    method: 'POST',
                    headers: new Headers({
                      'Authorization': 'key=AAAA90v0ZcI:APA91bFA9GVRjtUD_6CxxCrlQeiQobv-BUL_PSZ6fpsOD6Or-TSjXZvvKdi2a66HPp23ScdVcJHsQz8HreVxeKRDH5Lvv-_yeFk9kflygasbVjVwHnfs7Vjsu4i68bmTN6H9YfC9u9lY'
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
