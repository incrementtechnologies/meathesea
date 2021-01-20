<template>
  <div>
      <nav class="navbar navbar-expand-sm">
        <!-- Brand/logo -->
        <a class="navbar-brand" href="#">
            <img src="../../assets/img/meatthesea_logo.png" class="logo-brand" style="margin-left:-5%">
        </a>
        
        <!-- Links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <label class="navbar-brand hide-on-mobile text-white" v-html="config.APP_NAME_VHTML"></label>
                </a>
            </li>
        </ul>

            <ul class="nav navbar-nav navbar-right ml-auto">
                <li> <i class="fas fa-sign-out-alt" style="font-size:30px;color:white" title="Logout"></i></li>
            </ul>
        </nav>

  </div>
</template>
<script>
import CONFIG from '../../config.js'
export default {
  data: () => ({
    config: CONFIG
  })
}
</script>

<style scoped lang="scss">
@import "~assets/style/colors.scss";
    .navbar{
        background-color: $primary;
    }
    .logo-brand{
        width: 100px;
        height:100px;
    }
    .nav-link .navbar-brand{
        font-size: 30px;
    }
</style>
