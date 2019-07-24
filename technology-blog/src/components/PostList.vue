<template>
  <!-- <v-layout v-if="outerWidth" v-dragscroll class="overflow"> -->
<v-layout v-if="!$store.state.isTrans" v-dragscroll class="overflow">
  <v-flex v-if="isVisible(post)" xs3 v-for="post in $store.state.posts" px-2 py-4>
    <PostCard :post="post"></PostCard>
  </v-flex>
</v-layout>
<v-layout v-else v-dragscroll class="overflow">
  <v-btn flat color="warning" @click="showCalendar()">Calendar</v-btn>
  <v-flex v-if="isVisible(post)" xs3 v-for="post in $store.state.trans_posts" px-2 py-4>
    <PostCard :post="post"></PostCard>
  </v-flex>
</v-layout>
</template>

<script>
import PostCard from "./PostCard"
import FirebaseService from '@/services/FirebaseService'

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
      if(post.visibility == 'true' || (this.$store.state.userInfo != null &&post.visibility == 'false' && post.email == this.$store.state.userInfo.email)){
          return true;
      }
      else{
        return false;
      }
    }
  },
  mounted(){

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
