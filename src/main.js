import Vue from "vue";
import App from "./App.vue";
import Vuesax from "vuesax";
//import VueLocalStorage from 'vue-localstorage'

import router from "./router";
import "vuesax/dist/vuesax.css" //Vuesax styles

Vue.use(Vuesax)

//Vue.use(VueLocalStorage)

Vue.config.productionTip = false

const MyPlugin = {
  install(Vue) {
    Vue.prototype.saveUser = (userData) => {
      localStorage.name = userData.name;
      localStorage.username = userData.username;
      localStorage.verified = userData.verified;
      localStorage.admin = userData.admin;
      localStorage.banned = userData.banned;
    }
    Vue.prototype.getUser = () => {
      return {
        name: localStorage.name,
        username: localStorage.username,
        verified: localStorage.verified,
        admin: localStorage.admin,
        banned: localStorage.banned
      }
    }
    Vue.prototype.refreshUser = async () => {
      if(!localStorage.token) return false;
      //https://run.mocky.io/v3/6dcba69c-8925-4526-8182-9b400716f3c8
      let response = await fetch('https://run.mocky.io/v3/6dcba69c-8925-4526-8182-9b400716f3c8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${localStorage.token}`
        },
        body: "",
      })

      let user;
      if(response.status === 200){
        user = await response.json()     
      }else{
        return false;
      }

      Vue.prototype.saveUser({
        name: user.name,
        username: user.username,
        admin: user.admin,
        verified: user.verified,
        banned: user.banned
      });
      
      return true;
    }
    Vue.prototype.removeUser = () => {
      localStorage.removeItem("name")
      localStorage.removeItem("username")
      localStorage.removeItem("verified")
      localStorage.removeItem("admin")
      localStorage.removeItem("banned")
    }
  },
}
Vue.use(MyPlugin)

new Vue({
  router,  
  render: h => h(App)
}).$mount("#app")
