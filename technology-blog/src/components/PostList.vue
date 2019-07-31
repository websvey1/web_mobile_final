<template>
  <!-- <v-layout v-if="outerWidth" v-dragscroll class="overflow"> -->
<v-layout v-dragscroll class="overflow">
  <v-flex xs3 v-for="post in $store.state.posts" px-2 py-4>
    <PostCard :post="post"></PostCard>
  </v-flex>
</v-layout>
<!-- <v-layout v-else v-dragscroll class="overflow">
  <v-btn flat color="warning" @click="showCalendar()">Calendar</v-btn>
  <v-flex v-if="isVisible(post)" xs3 v-for="post in $store.state.trans_posts" px-2 py-4>
    <PostCard :post="post"></PostCard>
  </v-flex>
</v-layout> -->
</template>

<script>
import PostCard from "./PostCard"

import {
  dragscroll
} from 'vue-dragscroll'

export default {
  name: "PostList",
  components: {
    PostCard
  },
  directives: {
    'dragscroll': dragscroll
  },
  data() {
    return {

    }
  },
  filter:{

  },
  methods: {
    isVisible(post){
      if(post.post_share == '0' || (this.$store.state.userInfo != null &&post.post_share == '1' && post.email == this.$store.state.userInfo.email)){
          return true;
      }
      else{
        return false;
      }
    },

    async readPosts(){
      // await FirebaseService.readPosts();
      var posts = await this.$http.get("http://192.168.31.65:3000/post")
      .then((response) => {
        console.log(response.data);
        this.$store.state.posts = response.data;
      })
      .catch((error) =>{
        console.log(error);
      })
    }
  },
  mounted(){
    this.readPosts();
  }
}
</script>

<style media="screen" scoped>
.overflow {
  overflow-x: auto;
  overflow-y: hidden;
}

.overflow::-webkit-scrollbar {
  display: none;
}
</style>
