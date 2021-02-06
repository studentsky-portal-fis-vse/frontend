<template>
  <div id="app">
    <div v-if="token" class="center examplex">
      <vs-navbar center-collapsed v-model="active">
        <template #left>
          <img src="src/assets/logo.png" alt="">
        </template>
        <vs-navbar-group>
          Home
          <template #items>
            <vs-navbar-item to="/" :active="currentRouteName == 'Home'">
              Novinky
            </vs-navbar-item>
            <vs-navbar-item :active="currentRouteName == 'benis'">
              Benis room :DDD
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
              Hodnocení učitelů
            </vs-navbar-item>
            <vs-navbar-item to="/subjects" :active="currentRouteName == 'Subjects'">
              Hodnocení předmětů
            </vs-navbar-item>
          </template>
        </vs-navbar-group>
         <template #right>
           <vs-avatar primary size="30">
            <template #text>
              LightCap
            </template>
          </vs-avatar>
          <vs-button flat v-on:click="logOut">Log Out</vs-button>
        </template>
      </vs-navbar>
    </div>
    <router-view />
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
  padding-top: 55px;
  background-color: rgb(218, 218, 218);
  height: 100vh;
} 
</style>
