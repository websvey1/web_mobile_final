<template>
<v-container style="padding-bottom:50px;">
  <v-layout row style="min-height:400px; margin-top:40px;">

    <v-flex xs12 class="Todo">

        <h2>해야할 일</h2>
        <draggable v-model="myArray1" group="people" @start="drag=true" @end="drag=false">
          <div v-for="element in myArray1" :key="element.id">
            <v-chip color="#C8E6C9">{{element.todo_content}}</v-chip>
          </div>
      </draggable>
      
    </v-flex>

    <v-flex xs12 class="Todo">
     <h2>하고 있는 일</h2>
      <draggable v-model="myArray2" group="people" @start="drag=true" @end="drag=false">
        <div v-for="element in myArray2" :key="element.id">
          <v-chip color="rgb(191, 234, 255)">{{element.todo_content}}</v-chip>
        </div>
      </draggable>
      </v-flex>

    <v-flex xs12 class="Todo">
      <h2>완성할 일</h2>
      <draggable v-model="myArray3" group="people" @start="drag=true" @end="drag=false">
        <div v-for="element in myArray3" :key="element.id">
          <v-chip color="#FFCDD2">{{element.todo_content}}</v-chip>
        </div>
      </draggable>
    </v-flex>


  </v-layout>
  <div style="display:flex; justify-content:center; margin-top:50px; margin-bottom:20px;">

  <input v-model="inputTodo"> <v-btn class="v-btn theme--white" @click="createTodo"> 추가</v-btn>
  <!-- v-model이 binding 해주는 역할 bind=연결 -->
  <v-btn class="v-btn theme--dark" @click="updateTodo">확인</v-btn>
  </div>
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
          myArray3:[],
          inputTodo:""
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

        this.$http.get("http://192.168.31.85:3000/todolist") // 호출
        .then(result=> {
          console.log(result.data);
          //--
          var todos = result.data;

          for(var i = 0; i < todos.length; i++){
            if(todos[i].todo_state == "1"){
              this.myArray1.push(todos[i])
            }
            else if(todos[i].todo_state == "2"){
              this.myArray2.push(todos[i])
            }
            else{
              this.myArray3.push(todos[i])
            }
          }

          console.log(this.myArray1);
        })

      },
      
      async createTodo() {
        
        var tempvar = this.$session.get("userInfo").user_num;
        var content = this.inputTodo;

              
        
        this.myArray1.push({          
          todo_content: content,    
          todo_category: 1,    
          })  
        this.inputTodo = "";
      
      },

      async updateTodo() {
        var form = await this.form
        this.$http.put("http://192.168.31.85:3000/todolist/update", form) // 호출
        .then((req) => {
          alert(req.data)
        })
      }
	},

}
</script>

<style scoped>
.Todo {
  border: 2px solid rgba(94, 87, 87, 0.6);

  margin-right: 30px;
  padding : 2px;
  text-align: center;
}
.Todo > h2{
  font-size: 25pt;
  padding:30px 0;
}
</style>
