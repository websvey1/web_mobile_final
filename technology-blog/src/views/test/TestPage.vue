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
      console.log("?")
      this.temp();
      console.log("?")

    },
    computed:{
      async form () {
        return {
          myArray1:this.myArray1,
          myArray2:this.myArray2,
          myArray3:this.myArray3
        }
      }
    },
	  methods: {
      async temp(){
      console.log("?")

        this.$http.get("http://192.168.31.65:3000/todos") // 호출
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

      },
      async updateTodo() {
        var form = await this.form
        this.$http.put("http://192.168.31.65:3000/todos/update", form) // 호출
        .then((req) => {
          alert(req.data)
        })
      }
	},

}
</script>

<style scoped>

</style>
