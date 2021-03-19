<template>
  <div class="navigationBar">
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
        <li @click="''">
          <i
            class="fas fa-sign-out-alt"
            style="font-size: 30px; color: white"
            title="Logout"
          ></i>
        </li>
      </ul>
    </nav>
    
    <div class="notificationBar" v-if="notificationMessage.length > 0">
      <b> {{notificationTitle}} ({{notificationMessage.length}})</b>
      <b class="xNotification" @click="notificationMessage = []; notificationTitle = ''">&times;</b>
    </div>
    <pushnofication
      ref="pushNotification"
      :currentToken="userToken"
      @update-token="onUpdateToken"
      @new-message="onNewMessage" />
  </div>
</template>

<script>
import CONFIG from 'src/config.js'
import AUTH from 'src/services/auth'
import api from 'src/services/api'
export default {
  data: () => ({
    config: CONFIG,
    firebaseServerKey: CONFIG.firebaseServerKey,
    userProfile: {},
    askForPermission: false,
    userToken: null,
    notificationMessage: [],
    notificationTitle: ''
  }),
  components: {
    'pushnofication': () => import('src/components/notification/pushNotification')
    // PushNotification
  },
  mounted() {
    var userLoggedId = 1
    // check if user has a token
    console.log('response')
    api.user_profile(userLoggedId).then((response) => {
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
      if (message.data.topic !== undefined || message.data.topic !== null) {
        switch(message.data.topic.toLowerCase()) {
          case 'acceptorder':
            this.notificationTitle = 'NEW ORDER REQUEST'
            break
          case 'crockery':
            this.notificationTitle = 'NEW CROCKERY REQUEST'
            break
        }
        if(message.data.topic.toLowerCase() === 'acceptorder' || message.data.topic.toLowerCase() === 'crockery'){
          this.notificationMessage.push(message.notification.body)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "~assets/style/colors.scss";
.navigationBar {
  width: 100%;
	position: fixed;
	top: 0;
  z-index: 100;
}
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
  cursor: pointer;
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
