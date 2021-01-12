// let LIVE_BACKEND_URL = 'https://api.payhiram.increment.ltd/public/increment/v1'
let LIVE_BACKEND_URL = 'https://mtsbackenddev.azurewebsites.net/api'
let DEV_BACKEND_URL = 'https://mtsbackenddev.azurewebsites.net/api'
let isDev = false
let broadcastFlag = 'pusher' // self, pusher
let BACKEND_URL = isDev ? DEV_BACKEND_URL : LIVE_BACKEND_URL
let pusherKey = isDev ? 'ASDASDD' : 'ASDASDD'
let wsHost = isDev ? '127.0.0.1' : '127.0.0.1'
let wsPort = isDev ? 6001 : 8001
export default{
  IS_DEV: isDev,
  API_URL: BACKEND_URL + '/',
  IMAGE_URL: BACKEND_URL + '/image/',
  BACKEND_URL: BACKEND_URL,
  PUSHER: {
    flag: broadcastFlag,
    key: broadcastFlag === 'pusher' ? pusherKey : pusherKey,
    wsHost: wsHost,
    wsPort: wsPort
  },
  APP_NAME: 'PAYHIRAM',
  APP_NAME_VHTML: 'PAY<b>HIRAM</b>',
  APP_EMAIL: 'support@payhiram.ph',
  USER_TYPE: [{
    title: 'USER'
  }, {
    title: 'INVESTOR'
  }]
}
