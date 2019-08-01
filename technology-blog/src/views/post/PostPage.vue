<template>
<div style="background-color: white;">
      <v-layout wrap row pa-5>
        <v-flex fill-height d-flex xs12>
          <!-- <PostList></PostList> -->
          <PostDownList></PostDownList>
        </v-flex>
      </v-layout>

      <div>
        <select class="custom-select custom-select-sm" style="z-index:10;">
        <option selected>검색</option>
        <option value="1">제목</option>
        <option value="2">내용</option>
        <option value="3">제목+내용</option>
        <option value="4">ID</option>
        <option value="5">기술</option>
        </select>

        <div class="input-group md-form form-sm form-2 pl-0">
          <input class="form-control my-0 py-1 blue-border" type="text" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <span class="input-group-text blue lighten-1" id="basic-text1">
            </span>
          </div>
          <button type="submit">검색</button>
        </div>
      </div>
  </div>

</div>
</template>

<script>
import PostList from '@/components/post/PostList'
import PostDownList from '@/components/post/PostDownList'

export default {
	name: 'PostTest',
  components:{
    PostList,
    PostDownList,
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
