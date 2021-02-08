<template>
  <div id="app">
    <div class="wrapper">
      <div v-if="token" class="center examplex">
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
      <router-view />
      <div class="push"></div>
    </div>
    <footer class="footer">
      <p style="text-align:center; line-height:50px">(c) Frontend by Matěj Lajtkep</p>
    </footer> 
  </div>
</template>
<script>
module.exports = {
  name: 'App',
  data: function () {
    return {
      token: localStorage.token,
      active: this.$route.name
    }
  },
  computed: {
    currentRouteName: function (){
        return this.$route.name;
    }
  },
  methods:{
    logOut: function () {
      localStorage.removeItem('token');
      this.removeUser();
      location.reload();
    }
  }
}
</script>
<style>
*{
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  padding-top: 80px;
  height: 92vh;
} 

.title{
  text-align: center;
}

.text-center{
  text-align: center;
}

html, body {
  height: 100%;
  margin: 0;
  background-color: rgb(218, 218, 218);
}
.wrapper {
  min-height: 100%;
  margin-bottom: -50px;
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
