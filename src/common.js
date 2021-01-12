import config from 'src/config.js'
let APP_EMAIL = 'support@payhiram.ph'
export default {
  sidebarMenu: [
    {accountType: 'ALL', showOnAdmin: true, accountStatus: 'ALL', description: 'Dashboard', icon: 'fa fa-arrow-right', path: 'dashboard', flag: false, subMenu: null},
  ],
  APP_NAME: 'MTS',
  APP_NAME_HTML: 'MTS',
  APP_EMAIL: APP_EMAIL,
  APP_SITE: 'https://mts.ph',
  COMPANY: 'Meat The Sea',
  COMPANY_URL: 'http://mts.ltd',
  COPYRIGHT: 'MEATTHESEA ' + new Date().getFullYear(),
  USER_TYPE: [{
    title: 'USER'
  }],
  USER_TYPE_SETTING: false,
  plan: false,
  broadcastingFlag: true
}
