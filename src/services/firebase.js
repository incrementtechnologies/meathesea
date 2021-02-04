import firebase from 'firebase'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCiYflBpvnQKgJur5yzHrvHieO4MSDyrBU',
  authDomain: 'meatthesea-b7855.firebaseapp.com',
  databaseURL: 'https://meatthesea-b7855.firebaseio.com',
  projectId: 'meatthesea-b7855',
  storageBucket: 'meatthesea-b7855.appspot.com',
  messagingSenderId: '1062131230146',
  appId: '1:1062131230146:web:c9bd2373ac60aef503a25b',
  measurementId: 'G-9QVGTT3QWV'
}

firebase.initializeApp(firebaseConfig)

export default {
  messaging: firebase.messaging()
}
