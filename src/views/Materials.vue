<template>
  <div class="Materials">
    <h1 class="title">Studijní materiály</h1>
    <div class="materials-wrapper">
      <div class="materials-wrapper__filter">
        <vs-input label="Název" v-model="name">
        </vs-input>
        <vs-select multiple label="Předmět" v-model="subject">
          <vs-option label="2PR101" value="1">
            2PR101
          </vs-option>
          <vs-option label="4MM106" value="2">
            4MM106
          </vs-option>
          <vs-option label="3MG106" value="3">
            3MG106
          </vs-option>
        </vs-select>
        <vs-select multiple label="Typ souboru" v-model="type">
          <vs-option label="PDF" value="1">
            PDF
          </vs-option>
          <vs-option label="TXT" value="2">
            TXT
          </vs-option>
        </vs-select>
      </div>
      <div v-for="i in 5" :key="i" class="material">
        <div class="material__type">
          <i class="far fa-file-pdf"></i>
        </div>
        <div class="material__name">Nazev_{{i}}.pdf</div>
        <div class="material__actions"><i class="fas fa-info-circle"></i><i class="fas fa-download"></i></div>
        <div class="material__info">Staženo {{i * 12}}x Hodnocení: {{Math.ceil(100 / i)}}%</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.materials-wrapper{
  display: flex;
  -webkit-flex-flow: row wrap;
  flex-flow: row wrap;
  font-weight: bold;
  text-align: center;
  margin:0px auto;
  justify-content: center;
}

.material{
  flex: 0;
  min-width: 300px;
  height: 60px;
  background-color: rgb(211, 211, 211);
  display: inline-block;
  margin: 10px;
}

.materials-wrapper__filter{
  width: 100%;
  display: flex;
  margin: 30px auto;
  justify-content: center;
}

.materials-wrapper__filter > div{
  margin:5px;
}

.material__type{
  width: 60px;
  font-size: 30px;
  line-height: 60px;
  text-align: center;
  float: left;
}

.material__name{
  width: calc(100% - 140px);
  line-height: 20px;
  float: left;
  text-align: left;
  padding-top: 15px;
  padding-right: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  box-sizing: border-box;
}

.material__actions{
  width: 80px;
  line-height: 25px;
  float: left;
  text-align: revert;
  text-align: right;
  padding-top: 5px;
  padding-right: 10px;
  white-space: nowrap;
  box-sizing: border-box;
}

.material__actions i{
  padding-left: 10px;
  cursor: pointer;
}

.material__info{
      width: calc(100% - 60px);
    line-height: 20px;
    float: left;
    text-align: left;
    font-size: 10px;
    padding-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    box-sizing: border-box;
}
</style>
<script>
export default {
  name: "Materials",
  components: {
  },
  data: function () {
    return {
      name: "",
      subject: "",
      type: ""
    }
  }
};
</script>
