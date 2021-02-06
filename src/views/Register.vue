<template>
  <div>
    <div class="logo-wrapper">
      <img alt="VŠE logo" src="../assets/logo.png" class="logo">
    </div>
    <div class="register-wrapper">
      <vs-input class="register-input" label="Školní xname" v-model="xname" placeholder="pepa01">
      </vs-input>
      <br>
      <vs-input class="register-input" label="Jméno (nepoviné)" v-model="username" placeholder="Papíno Bambíno">
      </vs-input>
       <br>
      <vs-input class="register-input" label="Heslo" v-model="password" placeholder="pepa01@vse.cz" type="password">
      </vs-input>
      <br>
      <vs-checkbox class="register-checkbox">Souhlasím s podmínkama</vs-checkbox>
      <br>
      <vs-button v-on:click="register" style="margin:auto">
        Registrovat se
      </vs-button>
      <br>
      <vs-alert title="Po registraci je potřeba účet aktivovat!" color="primary">
        Po registraci bude na email username@vse.cz odeslán odkaz pro aktivaci účtu.
        Teprve až po kliknutí na něj se zpřístupní přihlášení do portálu.
      </vs-alert>
      <br>
      <div class="redirect-message">
        Mate účet? <router-link to="/login">Přihlašte se</router-link>
      </div>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'Register',
  data: function () {
    return {
      xname: "",
      username: "",
      password: "",
    }
  },
  props: {
    //msg: String
  },
  methods: {
    register: function() {
      // Validace
      fetch('https://run.mocky.io/v3/ec258bdf-5e44-4380-9e3f-b369b0466da7', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:"",username:"",password:""}),
      }).then(response  => {
        if(response.status === 201){
          console.log("registered")
        }
        else{
          console.log("Něco se pokazilo")
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

.register-wrapper{
  width: 400px;
  margin: auto;
}

.register-input{
  width: 200px;
  margin: auto;
}

.register-checkbox{
    width: 205px;
    margin: auto;
}

.redirect-message{
  text-align: center;
}
</style>
