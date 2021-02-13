<template>
  <div id="app">
    <div v-if="getToken()" class="center examplex">
      <vs-navbar center-collapsed v-model="active">
        <template #left>
          <img alt="VŠE logo" src="/images/logo.png" class="logo-sm">
        </template>
        <vs-navbar-group>
          Home
          <template #items>
            <vs-navbar-item to="/" :active="currentRouteName == 'Home'">
              Novinky
            </vs-navbar-item>
          </template>
        </vs-navbar-group>
        <vs-navbar-group>
          Studovna
          <template #items>
            <vs-navbar-item to="/materials" :active="currentRouteName == 'Materials'">
              Materiály
            </vs-navbar-item>
            <vs-navbar-item to="/teachers" :active="currentRouteName == 'Teachers'">
              Přehled učitelů
            </vs-navbar-item>
            <vs-navbar-item to="/subjects" :active="currentRouteName == 'Subjects'">
              Přehled předmětů
            </vs-navbar-item>
            <vs-navbar-item to="/training" :active="currentRouteName == 'Training'">
              Trénování předmětů
            </vs-navbar-item>
          </template>
        </vs-navbar-group>
        <vs-navbar-group>
          Discord
          <template #items>
            <vs-navbar-item to="/discord" :active="currentRouteName == 'Discord'">
              Přehled
            </vs-navbar-item>
            <vs-navbar-item to="/discord/verification" :active="currentRouteName == 'DiscordVerification'">
              Verifikace
            </vs-navbar-item>
          </template>
        </vs-navbar-group>
        <vs-navbar-group v-if="getUser().admin">
          Administrace
          <template #items>
            <vs-navbar-item to="/admin/users" :active="currentRouteName == 'Users'">
              Uživatelé
            </vs-navbar-item>
          </template>
        </vs-navbar-group>
        <template #right>
          <vs-avatar primary size="30">
            <template #text>
              {{getUser().name}}
            </template>
          </vs-avatar>
          <vs-button flat v-on:click="logOut">Odhlásit se</vs-button>
        </template>
      </vs-navbar>
    </div>
    <div v-else class="filler">

    </div>
    <div class="content">
      <router-view />
      <div class="push"></div>
    </div>
    <footer class="footer">
      <p style="text-align:center; line-height:50px">Frontend by Matěj Lajtkep</p>
    </footer> 
  </div>
</template>
<script>
module.exports = {
  name: 'App',
  data: function () {
    return {
      moment: this.$moment,
      active: this.$route.name,
      checkTokenInterval: null
    }
  },
  created: function(){
    this.checkTokenInterval = setInterval(() => this.checkToken(), 6000);
  },
  mounted: function(){
    this.checkToken();
  },
  computed: {
    currentRouteName: function (){
        return this.$route.name;
    }
  },
  methods:{
    checkToken: function(){
      if(!localStorage.token) return
      let diff = this.moment.unix(this.getToken().exp).diff(this.moment())
      if(diff < 18000){
        this.refreshToken();
      }
      if(diff <= 0){
        this.logOut();
      }
    },
    logOut: function () {
      localStorage.removeItem('token');
      localStorage.removeItem("refreshingToken");
      this.removeUser();
      location.reload();
    }
  }
}
</script>
<style>
*{
  margin: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
  background-color: rgb(218, 218, 218);
}

#app {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  position: relative;
} 

.filler{
  height: 42px;
}

.vs-navbar-content{
  position: sticky !important;
  border-radius: 0px 0px 0px 0px !important;
}

.vs-loading--target{
  z-index: 500 !important;
}

.vs-dialog-content{
  z-index: 499 !important;
}
.center{
  margin: auto !important;
}

.text-center{
  text-align: center;
}

.title{
  text-align: center;
}

.content {
  min-height: 92vh;
  padding-top: 35px;
  position: relative;
}

.footer,
.push {
  height: 50px;
}

.footer{
  background-color: grey;
}

.logo-sm{
    width: 30px;
    height: 30px;
}
</style>
