<template>
  <div class="navigationBar">
    <nav class="navbar navbar-expand-sm">
      <!-- Brand/logo -->
      <a class="navbar-brand" href="#">
        <span class="navbar-menu-toggler-md" v-bind:class="{'active-menu': menuFlag === true}" data-toggle="collapse" data-target="#idfactory" aria-controls="idfactory" aria-expanded="false" aria-label="Toggle navigation" v-on:click="makeActive('menu')">
            <i class="fa fa-bars" aria-hidden="true"></i>
        </span>
        <img
          src="../../assets/img/meatthesea_logo.png"
          class="logo-brand"
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
            style="font-size: 30px; color: white;"
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
.navbar-brand .logo-brand {
  // width: 100px;
  // height: 100px;
  // margin-left: 5% !important
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

.navbar-menu-toggler-md{
  height: 50px;
  float: left;
  text-align: center;
  font-size: 16px;
  color: #fff;
  line-height: 50px;
  display: none;
}
.navbar-menu-toggler-md:hover{
  cursor: pointer;
  background: $primary;
}

.active-menu{
  background: $primary;
}


 @media (min-width: 1200px){
    .system-header{
      width: 50% !important;
    }
    .header-navbar{
      width: 50% !important;
      margin-left: 18%;
    }
    .header-navbar-nav{
      width: 15% !important;
    }
    .navbar-menu-toggler-md{
      display: none;
    }
    .left-menu-icons{
      width: 40% !important;
    }
    .right-menu-icons{
      width: 60% !important;
    }
    .nav-item{
      width: 5% !important;
    }
    .logo-brand{
      // margin-left:-50% !important;
      width: 100px !important;
      height: 100px !important;
      margin-left: 5% !important
    }
  }

 @media (max-width: 1199px){
    .system-header{
      width: 70% !important;
    }
    .header-navbar{
      width: 30% !important;
      margin-left: 70% !important;
    }
    .header-navbar-nav{
      width: 30%;
    }
    .navbar-menu-toggler-md{
      display: none;
    }
    .left-menu-icons{
      width: 60% !important;
    }
    .right-menu-icons{
      width: 40%;
    }
    .nav-item{
      width: 10%;
    }
    .logo-brand{
      margin-left:-1% !important;
    }
  }

@media (max-width: 991px){
   .system-header{
      width: 30%;
    }
    .header-navbar{
      width: 70%;
      margin-left: 30%;
    }
   .header-navbar-nav{
      width: 30%;
    }
    .navbar-menu-toggler-md{
      width: 10%;
      text-align: center;
      display: block;
    }
    .left-menu-icons{
      width: 60% !important;
    }
    .right-menu-icons{
      width: 40% !important;
    }
    .nav-item{
      width: 10%;
    }
    .logo-brand{
      margin-left:-1% !important;
      width: 50px !important;
      height: 50px !important;
      margin-left: 5% !important
    }
 }

/*-------------- Small Screen for Mobile Phones --------------*/
 @media (max-width: 767px){
    .header-margin{
     width: 10% !important;
    }
    
    .system-header{
      width: 15%;
    }
    
    .navbar-brand{
      width: 90% !important;
      margin: 0px !important;
    }
    
    .header-navbar{
      width: 85%;
      margin-left: 15%;
    }

    .nav-item{
      width: 20%;
    }

    .logo-brand{
      width: 30px;
      height: 30px;
    }

    .left-menu-icons{
      width: 40% !important;
    }

    .right-menu-icons{
      width: 60% !important;
    }

    .hide-on-mobile{
      display: none !important;
    }
  }

  @media (max-width: 300px){
    .logo-brand{
      width: 30px;
      height: 30px;
    }
  }
</style>
