<template>
  <div class="discord">
    <h1 class="title">Discord servery</h1>
    <div ref="servers" class="server-wrapper">
      <div v-for="server in servers" :key="server.id" class="server">
        <a :href="`https://discord.gg/${server.invite}`">
          <div class="server__img-wrapper">
            <img :src="`https://discord.com/api/guilds/${server.embed}/embed.png?style=banner3`">
          </div>
        </a>
      </div>
    </div>
    <div>
      <vs-button v-if="getUser().admin" class="center" v-on:click="creatingServer = true">
        Přidat server
      </vs-button>
    </div>
    <vs-dialog v-model="creatingServer">
        <template #header>
          <h4>
            Přidat server
          </h4>
        </template>
        <div>
          <vs-input v-model="serverData.id" placeholder="ID" block>
          </vs-input>
          <br>
          <vs-input v-model="serverData.embed" placeholder="Embed link" block>
          </vs-input>
          <br>
          <vs-input v-model="serverData.href" placeholder="Invite link" block>
          </vs-input>
        </div>
        <template #footer>
          <div class="footer-dialog">
            <vs-button v-on:click="createServer" block>
              Přidat
            </vs-button>
          </div>
        </template>
      </vs-dialog>
  </div>
</template>

<style scoped>
.server-wrapper{
  width: 80%;
  display: flex;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  font-weight: bold;
  text-align: center;
  margin:0px auto;
  justify-content: center;
  min-height: 200px;
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
      servers: [],
      serverData: {
        id: "",
        href: "",
        embed: ""
      },
      creatingServer: false
    }
  },
  mounted: async function(){
    const loading = this.$vs.loading({
      target: this.$refs.servers
    })  
    await this.refreshServers();
    loading.close();
  },
  methods: {
    createServer: async function(){
      const loading = this.$vs.loading()
      let vue = this;

      await this.post(`admin/discord-servers`,this.serverData, {
        onSuccess: async () => {
          vue.serverData = {}      
          vue.creatingServer = false;
          await vue.refreshServers();
        },
        onFail: (data) => {
          vue.ShowErrorTooltip(data.message || "")
        },
        onError: (data) => {
          vue.ShowErrorTooltip(data.message || "")
        },
        allways: () => {
          loading.close();
        }
      })
    },
    refreshServers: async function(){
      let vue = this;

      await this.get(`discord-servers`,{}, {
        onSuccess: async (data) => {
          vue.servers = data
        }
      })
    }
  }
};
</script>
