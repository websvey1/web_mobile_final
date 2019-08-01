<template>
<v-hover>
  <v-card slot-scope="{ hover }" :class="`elevation-${hover ? 12 : 2}`" class="rounded-card" @click="goReadPage(post.post_num)">
    <v-img height="230px" :src="post.image_url" aspect-ratio="2.75"></v-img>

    <v-card-title primary-title>
      <div>
        <h3 class="headline mb-0 oneline">{{post.post_title}}</h3>
        <div class="fourline"> {{post.post_content}} </div>
      </div>

    <v-list-tile avatar @click="" style="overflow:hidden; width:300px;">
      <v-list-tile-avatar class="hidden-xs-only">
        <v-icon >fa-user</v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>
        <v-list-tile-title>{{post.post_created_at}}</v-list-tile-title>
        <v-list-tile-sub-title class="oneline">{{post.user_name}}</v-list-tile-sub-title>
      </v-list-tile-content>
      <i v-if="post.visibility=='false'" class="fas fa-lock">&nbsp;&nbsp;</i>
    </v-list-tile>
    </v-card-title>
  </v-card>
</v-hover>
</template>

<script>
import router from '@/router'

export default {
  name: 'PostCard',
  data() {
    return {
      isActive: false,
    }
  },
  props: {
    post:{}
  },
  methods: {
    toggle: function() {
      this.isActive = !this.isActive
    },

<<<<<<< HEAD:technology-blog/src/components/PostCard.vue
    goReadPage(postNum, email){
      // console.log(postNum);
=======
    goReadPage(postNum){
      console.log(postNum);
>>>>>>> 3892d4da54248d25f66c1c222a1afb7007e88f3d:technology-blog/src/components/post/PostCard.vue
      router.push({name:"PostReadPage", params:{id:postNum}})
    }
  }
}
</script>

<style media="screen" scoped>
.rounded-card {
  border-radius: 30px !important;
}

.visibility-1{
  background: white !important;
}
.visibility-2{
  background: #BBB !important;
}

.oneline{
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.2;
  height:1.2em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical ;
}

.fourline {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  line-height: 1.5;
  height: 6em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>
