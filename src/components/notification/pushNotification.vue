<template>
  <div>
  </div>
</template>
<script>
import firebase from '../../services/firebase'
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
      console.log('Asking for permission...', navigator)
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

          console.log('Firebase registration: ', registration)

          firebase.messaging.useServiceWorker(registration)

          firebase.messaging.requestPermission().then(() => {
            firebase.messaging.getToken().then((token) => {
              console.log('token: ', token)
              if (token !== this.currentToken) {
                this.$emit('update-token', token)
              }
            }).catch((err) => console.log('--- token error:', err))
          }).catch(function (err) {
            console.log('Unable to get permission to notify.', err)
          })
        }).catch(err => {
          console.log('error register', err)
        })

      firebase.messaging.onMessage((payload) => {
        console.log(payload, ' :--------- testing')
        this.$emit('new-message', payload)
      })
    }
  }
}
</script>
