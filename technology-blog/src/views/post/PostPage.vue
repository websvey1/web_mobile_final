<template>
<div style="background-color: white;">
      <v-layout wrap row pa-5>
        <v-flex fill-height d-flex xs12>
          <!-- <PostList></PostList> -->
          <PostDownList></PostDownList>
        </v-flex>
      </v-layout>
</div>
</template>

<script>
import PostList from '@/components/post/PostList'
import PostDownList from '@/components/post/PostDownList'

export default {
	name: 'PostTest',
  components:{
    PostList,
    PostDownList
  },
  data() {
    return {

    }
  },
	methods: {
    async postText() {

    }
	},
  mounted(){

  },
  created(){

  },
  beforeRouteLeave(to, from, next){

    next();
  },
  destroyed(){

  }
}

</script>
<style scoped>
  #page {
    background-color: white;
    width: 90%;
    height: 100%;
    margin: 0 auto;
  }
</style>
