<template>
<div style="background-color: white;">
      <v-layout wrap row pa-5>
        <v-flex fill-height d-flex xs12>
          <!-- <PostList></PostList> -->
          <PostDownList></PostDownList>
        </v-flex>
      </v-layout>

      <div class="searchbar-total">
        <div class="searchbar-first">
          <select class="custom-select custom-select-sm">
          <option selected>검색</option>
          <option value="1">제목</option>
          <option value="2">내용</option>
          <option value="3">제목+내용</option>
          <option value="4">ID</option>
          <option value="5">기술</option>
          </select>
        </div>
        <div class="searchbar-second">
        <div class="input-group md-form form-sm form-2 pl-0">
          <input class="form-control my-0 py-1 blue-border" type="text" placeholder="Search" aria-label="Search">
          <div class="input-group-append">
            <span class="input-group-text blue lighten-1" id="basic-text1">
            </span>
          </div>
        </div>
      </div>
      <div class="searchbar-third">
        <v-btn flat class="searchBtn" type="submit">검색</v-btn>
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
  .searchbar-total{
    display: flex;
    justify-content: center;


  }
  .searchbar-first{
    float: left; display: inline-block;

  }
  .searchbar-first > select{
    background-color: rgb(204, 204, 204)
  }
  .searchbar-second{
    float: left;  display: inline-block;
  }
  .searchbar-third{
    float: left;  display: inline-block;

  }
  .searchBtn{
    border-radius: 5%;
    /* font-weight:bold; */
    color: rgb(0, 0, 0);
    background-color: rgb(156, 156, 156);
    text-align: center;
  }
</style>
