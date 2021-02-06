import Vue from "vue";
import App from "./App.vue";
import Vuesax from "vuesax";
//import VueLocalStorage from 'vue-localstorage'

import router from "./router";
import "vuesax/dist/vuesax.css" //Vuesax styles

Vue.use(Vuesax)

//Vue.use(VueLocalStorage)

Vue.config.productionTip = false

new Vue({
  router,  
  render: h => h(App)
}).$mount("#app")
