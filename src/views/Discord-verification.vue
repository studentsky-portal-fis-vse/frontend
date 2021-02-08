<template>
  <div class="Discord-verification">
    <h1 class="text-center">Ověření účtu na fakultním Discord serveru.</h1>
    <div v-if="getUser().verified" class="text-center">
      <h3 class="account-verified text-center">Váš účet byl verifikován</h3>
      <p class="text-center">Pokud se něco pokazilo a nebyla ti přidělena role <span class="discord-role">Verifikovaný student VŠE</span>, zkus použít kód znovu nebo pingnout někoho z moderátorů serveru.</p>
    </div>
    <div v-else>
      <p class="text-center">
        Účet aktivujete tak, že do diskordu pošlete tuto zprávu 
      </p>
    </div>
    <div class="discord-message" v-if="verificationCode">
      <div class="discord-message__avatar"></div>
      <div class="discord-message__content">
        <div class="discord-message__username">lajtkek</div>
        <div class="discord-message__text">+verify {{verificationCode}}</div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Discord-verification",
  components: {
    //HelloWorld
  },
  data: function(){
    return {
      verificationCode: null
    }
  },
  mounted: async function(){
    const loading = this.$vs.loading({})  

    let response = await this.get(`discord-verifications/verification`,{})
    
    if(response.error)
      this.ShowErrorTooltip()

    if(response.code === 200){
      this.verificationCode = response.data.code
    }
    else {
      this.ShowErrorTooltip(response.data.message)
    }

    loading.close();
  }
};
</script>

<style scoped>
.account-verified{
  margin: 20px;
  color: green;
}

.discord-role{
  background: #36393f;
  color: #dcddde;
  padding: 5px 10px 5px 30px;
  border-radius: 20px;
  position: relative;
  border: 2px solid #dcddde;
}

.discord-role::after {
    content: "";
    position: absolute;
    top: 7px;
    left: 8px;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #dcddde;
}

.discord-message {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    background: #36393f;
    padding: 15px;
    color: #dcddde;
    margin-top: 20px;
    border-radius: 15px;
    max-width: 60%;
    margin: 60px auto auto;
}

.discord-message__avatar {
    width: 50px;
    height: 50px;
    background: #555555;
    border-radius: 50%;
    margin: 10px;
    background-image: url("/images/peepo.png");
    background-size: 100% 100%;
}

.discord-message__username {
    padding: 5px;
    font-weight: bold;
    color: #555555;
}

.discord-message__text {
    color: #ffffff;
    font-size: 2rem;
}
</style>

