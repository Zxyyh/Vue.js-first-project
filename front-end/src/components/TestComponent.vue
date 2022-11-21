<template>
  <div id="todo-list-example">
    <b-alert
      :show="dismissCountDown"
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      Isi Data Terlebih Dahulu
    </b-alert>
    <ul>
    <li v-for="(item,index) in list" :key="index">
      {{item.name}} - {{item.class}}
      <button @click="deleteEvent(index)">Hapus</button>
    </li>
  </ul>
  <input v-model="newData" placeholder="isi data"/>
  <button @click="addList">Tambah</button>
    <button @click="downloadFile">Export Data</button>
  </div>
</template>

<script>
import exportFromJSON from "export-from-json";
export default {
name: 'test',
data() {
  return {
    dismissSecs: 3,
    dismissCountDown: 0,
    newData: '',
    newClass: '',
    itemData:'',
    list: [
      {
        name: 'One',
        class: '1'
      },
      
      {
        name: 'two',
        class: '2'
      },
    ]
  };
},methods : {
  addList : function(){
    if(this.newData != ''){ this.list.push({ name: this.newData, class: (this.list.length + 1)}),
  this.newData = ''
this.newClass=''}else{
  this.showAlert()
}
 },
 /* addList : function(){
  this.list.push({ name: this.newData, subItems:[] }),
  this.newData = ''
 },
 addSubList : function(index){
  this.itemData = this.list[index];
  this.itemData.subItems.push(this.newSubData);
  this.newSubData=''
 }, */
 deleteEvent: function(index) {
  this.list.splice(index, 1);
},
/* deleteEvent2: function(itemIndex,subIndex) {
  this.itemData = this.list[itemIndex];
  this.itemData.subItems.splice(subIndex,1)
}, */
downloadFile() {
      const data = this.list;
      const fileName = "contoh-data";
      const exportType = exportFromJSON.types.csv;

      if (data) exportFromJSON({ data, fileName, exportType });
    }, 
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
}
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');
* {
  font-family: 'Roboto';
  color: black;
  margin: 5px;
}


</style>
