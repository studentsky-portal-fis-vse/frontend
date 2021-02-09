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
      //TODO: Remove for production
      localStorage.admin = true || userData.admin;
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

      let vue = Vue.prototype;
      let result = await Vue.prototype.get(`authentication/current-user`,{
        onSuccess: (data) => {
          let user = data
          vue.saveUser({
            name: user.name || "Student",
            username: user.username,
            admin: user.admin,
            verified: user.verified,
            banned: user.banned
          });
        },
        onError: () => {
          localStorage.removeItem("token")
        }
      })
      return result.success
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
    Vue.prototype.post = async (url, data = {}, options = {}) => {
      let response;
      let success = false;
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
        if(options.onFail)
          await options.onFail()
        else  
          Vue.prototype.ShowErrorTooltip("Něco se pokazilo")    

        if(options.allways)
          await options.allways()

        return {
          success: success,
          error: e
        }
      }

      let responseJson = {};
      await response.json()
      .then(data => responseJson = data)
      .catch(() => { })
  
      if(response.status === 200 || response.status === 201){
        if(options.onSuccess){
          await options.onSuccess(responseJson, response.status)
          success = true;
        }
      }else
        if(options.onError)
          await options.onError(responseJson, response.status)
        else
          Vue.prototype.ShowErrorTooltip(responseJson.message || "Něco se pokazilo")
      
      if(options.allways)
        await options.allways()

      return {
        success: success,
        code: response.status,
        data: responseJson
      };
    },
    Vue.prototype.delete = async (url, id, options = {}) => {
      let response;
      let success = false;
      try{
        response = await fetch(`${process.env.VUE_APP_API_URL}/${url}/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.token}`
          }
        })
      }catch(e){
        if(options.onFail)
          await options.onFail()
        else  
          Vue.prototype.ShowErrorTooltip("Něco se pokazilo")    

        if(options.allways)
          await options.allways()

        return {
          success: success,
          error: e
        }
      }

      let responseJson = {};
      await response.json()
      .then(data => responseJson = data)
      .catch(() => { })

      if(response.status === 200){
        if(options.onSuccess){
          await options.onSuccess(responseJson, response.status)
          success = true;
        }
      }else
        if(options.onError)
          await options.onError(responseJson, response.status)
        else
          Vue.prototype.ShowErrorTooltip(responseJson.message || "Něco se pokazilo")
      
      if(options.allways)
        await options.allways()

      return {
        success: success,
        code: response.status,
        data: responseJson
      };
    },
    Vue.prototype.get = async (url, options = {}) => {
      let response;
      let success = false;
      try{
        response = await fetch(`${process.env.VUE_APP_API_URL}/${url}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `Bearer ${localStorage.token}`
          }
        })
      }catch(e){
        if(options.onFail)
          await options.onFail()
        else  
          Vue.prototype.ShowErrorTooltip("Něco se pokazilo")    

        if(options.allways)
          await options.allways()

        return {
          success: success,
          error: e
        }
      }

      let responseJson = {};
      await response.json()
      .then(data => responseJson = data)
      .catch(() => { })

      if(response.status === 200 || response.status === 201){
        if(options.onSuccess){
          await options.onSuccess(responseJson, response.status)
          success = true;
        }
      }else
        if(options.onError)
          await options.onError(responseJson, response.status)
        else
          Vue.prototype.ShowErrorTooltip("Něco se pokazilo")
      
      if(options.allways)
        await options.allways()
      
      return {
        success: success,
        code: response.status,
        data: responseJson
      };
    }
  }
}
Vue.use(MyPlugin)

new Vue({
  router,  
  render: h => h(App)
}).$mount("#app")
