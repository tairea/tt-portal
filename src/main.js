// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'
import { firestorePlugin } from "vuefire";
import vuetify from '@/plugins/vuetify' // path to vuetify export

Vue.config.productionTip = false

Vue.use(firestorePlugin);

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      vuetify,
      render: h => h(App)
    })
  }
})
