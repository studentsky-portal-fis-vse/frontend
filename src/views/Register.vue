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
      <vs-input class="register-input" label="Heslo" v-model="password" placeholder="*****" type="password">
      </vs-input>
      <br>
      <vs-checkbox class="register-checkbox" v-model="termsAccept">Souhlasím s <span class="show-dialog-link" @click="showDialog=!showDialog">podmínkama</span></vs-checkbox>
      <br>
      <vs-button v-on:click="register" style="margin:auto">
        Registrovat se
      </vs-button>  
      <span class="error" v-if="termsAcceptError">Musíte souhlasit s podmínkama</span>
      <span class="error" v-if="xnameError">Zadejte platné jméno</span>
      <span class="error" v-if="passwordError">Zadejte heslo, co má alespoň 5 znaků</span>
      <br>
      <vs-alert title="Po registraci je potřeba účet aktivovat!" color="primary">
        Po registraci bude na email username@vse.cz odeslán odkaz pro aktivaci účtu.
        Teprve až po kliknutí na něj se zpřístupní přihlášení do portálu.
      </vs-alert>
      <br>
      <div class="redirect-message">
        Mate účet? <router-link to="/login">Přihlašte se</router-link>
      </div>

      <vs-dialog width="550px" not-center v-model="showDialog">
        <template #header>
          <h4 class="not-margin">
            Podmínky VŠE fis portálu
          </h4>
        </template>
        <div class="con-content">
          <p>
            hate to break to to everyone, but Evangelion--both the series and this movie--is neither deep nor complex. It is a shallow alien-invasion robot mecha anime, written by a man battling depression, animated by a talented studio, which was mis-managed and ran out of money during production, leading to a finale that consisted mostly of clips from earlier in the series combined with minutes-long shots of a single frame of animation and nothing happening. They randomly threw in lots of Biblical and mythological names to make it seem "interesting and exotic" to Japanese people, never intending for it to be seen by Western audiences.
          </p>
        </div>
      </vs-dialog>
    </div>
  </div>
</template>

<script>
module.exports = {
  name: 'Register',
  data: function () {
    return {
      xname: "",
      xnameError: false,
      username: "",
      password: "",
      passwordError: false,
      termsAccept: false,
      termsAcceptError: false,
      showDialog: false
    }
  },
  props: {
    //msg: String
  },
  methods: {
    isFormValid: function () {
      if(this.xname.length < 3)
        this.xnameError = true;
      else
        this.xnameError = false
      if(this.password.length <= 5)
        this.passwordError = true;
      else
        this.passwordError = false
      
      this.termsAcceptError = !this.termsAccept;

      return !this.xnameError && !this.passwordError && !this.termsAcceptError
    },
    register: function() {
      if(!this.isFormValid()) return;
      const loading = this.$vs.loading()

      fetch('https://run.mocky.io/v3/ec258bdf-5e44-4380-9e3f-b369b0466da7', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({name:"",username:"",password:""}),
      }).then(response  => {
        if(response.status === 201){
          this.$router.push('/login') 
        }
        else{
          console.log("Něco se pokazilo")
        }
        
      }).finally(() => {
        loading.close();
      });
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

.error{
    display: block;
    text-align: center;
    font-size: 13px;
    margin: 10px;
    color: red;
}

.show-dialog-link{
  margin-left: 5px;
  color: blue;
}
</style>
