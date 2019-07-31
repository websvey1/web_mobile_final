<template>
  <v-layout wrap>
    <v-flex xs12>
      <h1>array 1</h1>
      <draggable v-model="myArray1" group="people" @start="drag=true" @end="drag=false">
        <div v-for="element in myArray1" :key="element.id">{{element.content}}</div>
     </draggable>

     <h2>array 2</h2>
     <draggable v-model="myArray2" group="people" @start="drag=true" @end="drag=false">
       <div v-for="element in myArray2" :key="element.id">{{element.content}}</div>
    </draggable>

    <h2>array 3</h2>
     <draggable v-model="myArray3" group="people" @start="drag=true" @end="drag=false">
       <div v-for="element in myArray3" :key="element.id">{{element.content}}</div>
    </draggable>
    </v-flex>
  </v-layout>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    name: 'PostTest',
    components:{
      draggable
    },
    data() {
        return {
          myArray1:[],
          myArray2:[],
          myArray3:[]
        }
    },
    mounted(){
      this.temp();
    },
	  methods: {
      temp(){
        this.$http.get("http://192.168.31.85:3000/todos") // 호출
        .then(result=> {
          console.log(result.data);
          //--
          var todos = result.data;

          for(var i = 0; i < todos.length; i++){
            if(todos[i].state == "1"){
              this.myArray1.push(todos[i])
            }
            else if(todos[i].state == "2"){
              this.myArray2.push(todos[i])
            }
            else{
              this.myArray3.push(todos[i])
            }
          }

          console.log(this.myArray1);
          


          // --

        })

      }
	},

}
</script>

<style scoped>

</style>
