import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase'
import config from './firebaseConfig'

Vue.config.productionTip = false

firebase.initializeApp(config);

new Vue({
  el: '#app',
  render: h => h(App)
})
