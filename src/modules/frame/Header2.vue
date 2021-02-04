<template>
  <div>
    <nav class="navbar navbar-expand-sm">
      <!-- Brand/logo -->
      <a class="navbar-brand" href="#">
        <img
          src="../../assets/img/meatthesea_logo.png"
          class="logo-brand"
          style="margin-left: -5%"
        />
      </a>

      <!-- Links -->
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="#">
            <label
              class="navbar-brand hide-on-mobile text-white"
              v-html="config.APP_NAME_VHTML"
            ></label>
          </a>
        </li>
      </ul>

      <ul class="nav navbar-nav navbar-right ml-auto">
        <li @click="logout()">
          <i
            class="fas fa-sign-out-alt"
            style="font-size: 30px; color: white"
            title="Logout"
          ></i>
        </li>
      </ul>
    </nav>
    <div class="notificationBar" v-if="$route.path === '/orders'">
      <b> {{notificationMessage}} (1)</b>
      <b class="xNotification">&times;</b>
    </div>
    <PushNotification
      ref="pushNotification"
      :currentToken="userToken"
      @update-token="onUpdateToken"
      @new-message="onNewMessage" />
  </div>
</template>
<script>
import CONFIG from '../../config.js'
import AUTH from '../../services/auth'
import PushNotification from '../../components/notification/pushNotification'
import api from '../../services/api'
export default {
  components: {
    PushNotification
  },
  data: () => ({
    config: CONFIG,
    firebaseServerKey: 'AAAA90v0ZcI:APA91bFA9GVRjtUD_6CxxCrlQeiQobv-BUL_PSZ6fpsOD6Or-TSjXZvvKdi2a66HPp23ScdVcJHsQz8HreVxeKRDH5Lvv-_yeFk9kflygasbVjVwHnfs7Vjsu4i68bmTN6H9YfC9u9lY',
    userProfile: {},
    askForPermission: false,
    userToken: null,
    notificationMessage: ''
  }),
  created () {
    var userLoggedId = 1
    // check if user has a token
    api.user_profile(userLoggedId).then((response) => {
      console.log('Notification test: ', response.data)
      this.userProfile = response.data
      this.userToken = this.userProfile.push_notification.ask_for_permission.token
      if (this.userProfile.push_notification.ask_for_permission) {
        setTimeout(() => {
          // Simulate it wont ask for permission in the first user access
          this.askForPermission = true
        }, 4000)
        this.enableNotifications()
      }
    })
  },
  methods: {
    logout(){
      AUTH.removeAuthentication()
    },
    enableNotifications () {
      this.$refs.pushNotification.askForPermission()
    },
    onUpdateToken (newToken) {
      this.userToken = newToken
      // send token to the server
      api.update_token(this.userProfile, this.userToken)
    },
    onNewMessage (message) {
      // var snackbarContainer = document.querySelector('#snackbar-message')
      // var data = {
      //   message: message.notification.title + ': ' + message.notification.body,
      //   timeout: 10000,
      //   actionText: 'OK'
      // }
      // snackbarContainer.MaterialSnackbar.showSnackbar(data)
      console.log('New message: ', message.notification.body)
      this.notificationMessage = message.notification.body
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/style/colors.scss";
.navbar {
  background-color: $primary;
}
.logo-brand {
  width: 100px;
  height: 100px;
}
.nav-link .navbar-brand {
  font-size: 30px;
}
.notificationBar {
  background-color: #FF0045;
  width: 100%;
  z-index: 100;
  padding-left: 48%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #FFFFFF;
  height: 60px;
}
.xNotification {
  cursor: default;
  background-color: #FFFFFF;
  color: #FF0045;
  font-size: 24px;
  margin-top: 0px !important;
  padding-top: 0px !important;
  padding-bottom: 5px;
  padding-left: 4px;
  padding-right: 4px;
  line-height: 19px;
  border-radius: 50%;
  margin-right: 20px;
}
</style>
