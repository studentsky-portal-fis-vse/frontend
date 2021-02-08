import Vue from "vue";
import App from "./App.vue";
import Vuesax from "vuesax";
//import VueLocalStorage from 'vue-localstorage'

import router from "./router";
import "vuesax/dist/vuesax.css" //Vuesax styles

Vue.use(Vuesax)

const moment = require('moment')
require('moment/locale/cs')

Vue.use(require('vue-moment'), {
  moment
})

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
    Vue.prototype.getToken = () => {
      try{
        return JSON.parse(atob(localStorage.token.split('.')[1]));
      } catch (e) {
        return null;
      }
    }
    Vue.prototype.refreshToken = async () => {
      if(localStorage.refreshingToken) return;
      localStorage.refreshingToken = true;

      let response = await Vue.prototype.post(`authentication/refresh-token`,{})
    
      if(response.error)
        Vue.prototype.ShowErrorTooltip("Nepodařilo se obnovit token")

      if(response.code === 200){
        localStorage.token = response.data.token
      }
      else {
        Vue.prototype.ShowErrorTooltip(response.data.message)
      }

      localStorage.removeItem("refreshingToken");
    }
    Vue.prototype.refreshUser = async () => {
      if(!localStorage.token) return false;

      let response = await Vue.prototype.get(`authentication/current-user`,{})

      let user;
      if(response.code === 200){
        user = response.data;   
      }else{       
        localStorage.removeItem("token")
        return false;
      }

      Vue.prototype.saveUser({
        name: user.name || "Student",
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
    },
    Vue.prototype.ShowMainTooltip = (title, message) => {
      Vue.prototype.$vs.notification({
        progress: 'auto',
        color: 'success',
        position: 'top-center',
        title: title || 'Něco se pokazilo',
        text: message || ""
      })
    },
    Vue.prototype.ShowErrorTooltip = (title, message) => {
      Vue.prototype.$vs.notification({
        progress: 'auto',
        color: 'danger',
        position: 'top-center',
        title: title || 'Něco se pokazilo',
        text: message || ""
      })
    },
    Vue.prototype.post = async (url, data) => {
      let response;

      try{
        response = await fetch(`${process.env.VUE_APP_API_URL}/${url}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.token}`
          },
          body: JSON.stringify(data),
        })
      }catch(e){
        return {
          error: e
        }
      }
      let responseJson = await response.json()

      return {
        code: response.status,
        data: responseJson
      };
    },
    Vue.prototype.get = async (url) => {
      let response;

      try{
        response = await fetch(`${process.env.VUE_APP_API_URL}/${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.token}`
          },
        })
      }catch(e){
        return {
          error: e
        }
      }
      let responseJson = await response.json()

      return {
        code: response.status,
        data: responseJson
      };
    }
  },
}
Vue.use(MyPlugin)

new Vue({
  router,  
  render: h => h(App)
}).$mount("#app")
