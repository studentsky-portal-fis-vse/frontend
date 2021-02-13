<template>
  <div id="content-wrapper">
    <h1 class="title">Uživatelé</h1>
    <div id="usersWrapper" ref="userWrapper">
      <vs-table>
        <template #thead>
          <vs-tr>
            <vs-th style="width: 30px">Id</vs-th>
            <vs-th>Name</vs-th>
            <vs-th>Username</vs-th>
            <vs-th style="width: 50px">Verified</vs-th>
            <vs-th style="width: 50px">Banned</vs-th>
            <vs-th style="width: 50px">Admin</vs-th>
            <vs-th style="width: 50px">Edit</vs-th>
            <vs-th style="width: 50px">Ban</vs-th>
          </vs-tr>
        </template>
        <template #tbody>
          <vs-tr :key="i" v-for="(user, i) in users" :data="user">
            <vs-td>{{ user.id }}</vs-td>
            <vs-td>{{ user.name }}</vs-td>
            <vs-td>{{ user.username}} </vs-td>
            <vs-td>{{ user.verified }}</vs-td>
            <vs-td>{{ user.banned }}</vs-td>
            <vs-td>{{ user.admin }}</vs-td>
            <vs-td>
              <vs-button @click="showEditDialog(user)">Edit</vs-button>
            </vs-td>
            <vs-td v-if="!user.admin">
              <vs-button @click="showBanDialog(user)" v-if="!user.banned" danger>Ban</vs-button>
              <vs-button @click="showBanDialog(user)" v-else success>Unban</vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <vs-dialog width="550px" not-center v-model="banDialog" v-if="selectedUser">
      <template #header>
        <h4 class="not-margin">
          Potvrzení akce
        </h4>
      </template>
      <div class="con-content">
        <p>
          Potvrďte vybranou akci s uživatelem {{ selectedUser.name }} ({{selectedUser.id}})
        </p>
      </div>
      <template #footer>
        <div class="con-footer">
          <vs-button @click="banUserToggle(selectedUser)" transparent>
            {{ selectedUser.banned ? "Unban" : "Ban"}}
          </vs-button>
          <vs-button @click="banDialog=false" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
    <vs-dialog width="550px" not-center v-model="editDialog" v-if="selectedUser" prevent-close>
      <template #header>
        <h4 class="not-margin">
          Změna údajů
        </h4>
      </template>
      <div class="con-content">
        <vs-input label="username" v-model="newUsername"></vs-input>
        <br>
        <vs-input label="password" v-model="newPassword"></vs-input>
        <label>Pokud chcete heslo ponechat nechte toto políčko prázdné</label>
      </div>
      <template #footer>
        <div class="con-footer">
          <vs-button @click="editUser(selectedUser)" transparent>
            Upravit
          </vs-button>
          <vs-button @click="editDialog=false" dark transparent>
            Cancel
          </vs-button>
        </div>
      </template>
    </vs-dialog>
  </div>
</template>
<style scoped>
#usersWrapper{
  margin: auto;
  width: 80%;
  min-height: 60px;
}
</style>
<script>
export default {
  name: "Users",
  data: function () {
    return {
      users: [],
      banDialog: false,
      editDialog: false,
      selectedUser: null,
      newUsername: "",
      newPassword: "",
    }
  },
  methods: {
    banUserToggle: function(user){
      this.loadingStart();
      this.post(`users/${user.id}/${user.banned ? "unban" : "ban"}`,{},{
        onSuccess: async (data) => {
          this.users = this.users.filter(x => x.id != user.id)
          this.users.push(data)
          this.banDialog = false;
        },
        allways: () => {
          this.loadingEnd();
        }
      })
    },
    showBanDialog: function(user){
      this.selectedUser = user;
      this.banDialog = true;
    },
    showEditDialog: function(user){
      this.newUsername =  user.name
      this.newPassword =  ""
      this.selectedUser = user;
      this.editDialog = true;
    },
    editUser: function(user){
      this.loadingStart();
      this.put(`users/${user.id}`,{
        name: this.newUsername,
        password: this.newPassword != "" ? this.newPassword : undefined,
      },{
        onSuccess: async (data) => {
          //TODO: Pokud current user refresh cache?
          user.name = this.newUsername;
          this.users = this.users.filter(x => x.id != user.id)
          this.users.push(data)
          this.editDialog = false;
        },
        allways: () => {
          this.loadingEnd();
        }
      })
    },
    refreshUsers: async function(){
      this.loadingStart();
      await this.get(`users`,{
        onSuccess: async (data) => {
          this.users = data
        },
        allways: () => {
          this.loadingEnd();
        }
      })
    }
  },
  mounted: async function(){
    await this.refreshUsers();
  },
};
</script>
