<template>
<v-layout wrap>
  <v-flex v-for="post in $store.state.posts" xs12 px-2 style="margin-bottom: 35px;">
    <PostDownCard :post="post"></PostDownCard>
  </v-flex>
</v-layout>
</template>

<script>
import PostDownCard from '@/components/post/PostDownCard'

export default {
  name: "PostDownList",
  components: {
    PostDownCard
  },
  data() {
    return {

    }
  },
  created(){
    this.readPosts();
  },
  methods: {
    isVisible(post) {
      if (post.post_share == '0' || (this.$store.state.userInfo != null && post.post_share == '1' && post.email == this.$store.state.userInfo.email)) {
        return true;
      } else {
        return false;
      }
    },

    async readPosts() {
      var posts = await this.$http.get("http://192.168.31.65:3000/post/list/" + this.$session.get('userInfo').user_num)
        .then((response) => {
          console.log(response.data);
          this.$store.state.posts = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
    }
  },
  mounted() {
    // this.readPosts();
  }
}
</script>

<style media="screen">
</style>
