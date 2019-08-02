<template>
<v-container>
  <v-layout row>

    <v-flex xs12>
        <h2>미래</h2>
        <draggable v-model="myArray1" group="people" @start="drag=true" @end="drag=false">
          <div v-for="element in myArray1" :key="element.id">{{element.content}}</div>
      </draggable>
    </v-flex>
    <v-flex xs12>
     <h2>현재진행</h2>
      <draggable v-model="myArray2" group="people" @start="drag=true" @end="drag=false">
        <div v-for="element in myArray2" :key="element.id">{{element.content}}</div>
      </draggable>
      </v-flex>
    <v-flex xs12>
      <h2>과거완료</h2>
      <draggable v-model="myArray3" group="people" @start="drag=true" @end="drag=false">
        <div v-for="element in myArray3" :key="element.id">{{element.content}}</div>
      </draggable>
    </v-flex>

    
  </v-layout>
  <v-btn class="v-btn theme--dark" @click="updateTodo">확인</v-btn>
</v-container>

</template>

<script>
import draggable from 'vuedraggable'

export default {
    name: 'TestPage',
    components:{
      draggable
    },
    data() {
        return {
          myArray1: [],
          myArray2: [],
          myArray3: []
        }
    },
    mounted(){
      this.temp();
    },
	  methods: {
      temp(){
        this.$http.get("http://192.168.31.63:3000/todos") // 호출
        .then((response) => {
          console.log("response.data =>")
          console.log(response.data);

          var todos = response.data;

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
            console.log(todos[i].content)
          }
        })
        .catch((error) => {
          console.log(error)
        })
      },
      updateTodo() {
        console.log(this.myArray1)
        console.log(this.myArray2)
        console.log(this.myArray3)

        var form = {
          one : this.myArray1,
          two : this.myArray2,
          three : this.myArray3
        }

        this.$http.post("http://192.168.31.63:3000/todos/update", form)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        }) // 호출
      }
	},

}
</script>

<style scoped>

</style>
