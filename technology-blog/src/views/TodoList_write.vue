<template>
<div class="container">
  <input v-model="message" placeholder="insert yout todo">
  <!-- <button> </button> -->
  <!-- v-for로 반복문 추가하기 --> 
  <v-chip class="add_content" color="#C8E6C9" @click="">ADD</v-chip>
</div>

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



          // --

        })

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
