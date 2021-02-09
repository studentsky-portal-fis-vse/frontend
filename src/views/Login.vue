<template>
  <div id="content-wrapper">
    <div class="logo-wrapper">
      <img alt="VŠE logo" src="/images/logo.png" class="logo">
    </div>
    <div class="login-wrapper">
      <vs-input class="login-input" label="Školní xname" v-model="username" placeholder="pepa01">
      </vs-input>
      <span class="error" v-if="usernameError">Zadejte platné jméno</span>
      <br>
      <vs-input class="login-input" label="Heslo" v-model="password" placeholder="*****" type="password">
      </vs-input>
      <span class="error" v-if="passwordError">Zadejte heslo</span>
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
      usernameError: false,
      password: "",
      passwordError: false
    }
  },
  methods: {
    isFormValid: function () {
      if(this.username.length < 3)
        this.usernameError = true;
      else
        this.usernameError = false
      if(this.password.length < 3)
        this.passwordError = true;
      else
        this.passwordError = false

      return !this.usernameError && !this.passwordError
    },
    login: async function() {
      if(!this.isFormValid()) return
      const loading = this.$vs.loading()

      await this.post(`authentication/login`,{username:this.username,password:this.password},{
        onSuccess: async (data) => {
          localStorage.token = data.token
          if(await this.refreshUser())       
            location.reload();
        },
        allways: () => {
          loading.close();
        }
      })
    }
  }
}
</script>

<style scoped>
.logo-wrapper{
  width:100%; 
  padding: 50px;
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

.error{
    display: block;
    text-align: center;
    font-size: 13px;
    margin: 10px;
    color: red;
}
</style>
