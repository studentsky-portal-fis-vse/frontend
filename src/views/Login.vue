<template>
  <div>
    <div class="logo-wrapper">
      <img alt="VŠE logo" src="../assets/logo.png" class="logo">
    </div>
    <div class="login-wrapper">
      <vs-input class="login-input" label="Školní xname" v-model="username" placeholder="pepa01">
      </vs-input>
      <br>
      <vs-input class="login-input" label="Heslo" v-model="password" placeholder="pepa01@vse.cz" type="password">
      </vs-input>
      <br>
      <vs-button v-on:click="login" style="margin:auto">
        Přihlásit se
      </vs-button>
      <br>
      <div class="redirect-message">
        Nemáte účet? <router-link to="/register">Zaregistujte se</router-link>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'Login',
  data: function () {
    return {
      username: "",
      password: ""
    }
  },
  props: {
    //msg: String
  },
  methods: {
    login: async function() {
      fetch('https://run.mocky.io/v3/8b9a7773-3912-45e7-a586-e6558cad5551', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({username:"",password:""}),
      }).then(response  => {
        if(response.status === 200){
          response.json().then(data => {
              localStorage.token = data.token;
              location.reload();
          });
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logo-wrapper{
  width:100%; 
  padding: 50px;
  box-sizing: border-box;
}

.logo{
  width: 100px;
  display: block;
  margin: auto;
}

.login-wrapper{
  width: 400px;
  margin: auto;
}

.login-input{
  width: 200px;
  margin: auto;
}

.login-checkbox{
    width: 205px;
    margin: auto;
}

.redirect-message{
  text-align: center;
}
</style>
