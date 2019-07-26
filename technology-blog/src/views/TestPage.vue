<template>
  <v-layout wrap>
    <v-flex xs12>
      <h1>array 1</h1>
      <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
        <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
     </draggable>

     <h2>array 2</h2>
     <draggable v-model="myArray1" group="people" @start="drag=true" @end="drag=false">
       <div v-for="element in myArray1" :key="element.id">{{element.name}}</div>
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
          myArray:[
            {id:1, name:"씨발1"},
            {id:2, name:"씨발2"},
            {id:3, name:"씨발3"},
            {id:4, name:"씨발4"},
            {id:5, name:"씨발5"},
          ],
          myArray1:[
            {id:1, name:"씨발1"},
            {id:2, name:"씨발2"},
            {id:3, name:"씨발3"},
            {id:4, name:"씨발4"},
            {id:5, name:"씨발5"},
          ],
        }
    },
	methods: {

	},

}
</script>

<style scoped>

</style>
