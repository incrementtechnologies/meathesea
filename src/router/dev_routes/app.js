
export default{
  routes: [{
    path: '/signup',
    name: 'signup',
    component: resolve => require(['components/increment/basic/Signup.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/signup/:email/:code',
    name: 'signup',
    component: resolve => require(['components/increment/basic/Signup.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/signup_partner',
    name: 'signupPartner',
    component: resolve => require(['components/increment/basic/SignupPartner.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/verification/:email',
    name: 'verification',
    component: resolve => require(['components/increment/basic/Verification.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/login_verification/:username/:code',
    name: 'loginVerification',
    component: resolve => require(['components/increment/basic/LoginByVerification.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/login',
    name: 'loginAccount',
    component: resolve => require(['components/increment/basic/LoginWithoutRegister.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/request_reset_password',
    name: 'requestResetPassword',
    component: resolve => require(['components/increment/basic/RequestResetPassword.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/reset_password/:username/:code',
    name: 'resetPassword',
    component: resolve => require(['components/increment/basic/ResetPassword.vue'], resolve),
    meta: {
      tokenRequired: false
    }
  }, {
    path: '/orders',
    name: 'orders',
    component: resolve => require(['modules/orders/orders.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/crockery',
    name: 'crockeries',
    component: resolve => require(['modules/crockery/crockery.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/deli_products',
    name: 'deliProducts',
    component: resolve => require(['modules/products/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/menu_items',
    name: 'menuItems',
    component: resolve => require(['modules/menu/List.vue'], resolve),
    meta: {
      tokenRequired: true
    }
  }, {
    path: '/*',
    name: 'notfound',
    component: resolve => require(['modules/pagenotfound/PageNotFound.vue'], resolve)
  }
  ]
}
