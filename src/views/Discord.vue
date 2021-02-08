<template>
  <div class="discord">
    <h1 class="title">Discord servery</h1>
    <div class="server-wrapper">
      <div v-for="server in servers" :key="server" class="server">
        <a :href="server.href">
          <div class="server__img-wrapper">
            <img :src="`https://discord.com/api/guilds/${server.id}/embed.png?style=banner3`">
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.server-wrapper{
  width: 80%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  font-weight: bold;
  text-align: center;
  margin:0px auto;
  justify-content: center;
}

.server{
    margin: .875em .5em;
    float: none;
    cursor: pointer;
}

.server__img-wrapper{
  position: relative;
  display: block;
  -webkit-box-flex: 0;
  -ms-flex: 0 0 auto;
  flex: 0 0 auto;
  padding: 0;
  background: rgba(0,0,0,.05);
}

.server__content{
  -webkit-box-flex: 1;
  -ms-flex-positive: 1;
  flex-grow: 1;
  border: none;
  border-top: 1px solid rgba(34,36,38,.1);
  background: 0 0;
  margin: 0;
  padding: 1em 1em;
  -webkit-box-shadow: none;
  box-shadow: none;
  font-size: 1em;
  border-radius: 0;
}
</style>
<script>
export default {
  name: "Discord",
  components: {
  },
  data: function(){
    return {
      servers: [
        {id:"760863954607669269", href:"https://discord.gg/yZMhTVQdkX"},
        {id:"511621720600215660", href:"https://discord.gg/fWPje3z"}
        ]
    }
  }
};
</script>
