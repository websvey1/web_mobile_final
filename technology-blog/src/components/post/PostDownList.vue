<template>
<v-layout v-if="posts.length > 0" wrap>
  <v-flex v-for="post in posts" xs12 px-2 mt-4 style="margin-bottom: 35px;">
    <PostDownCard :post="post"></PostDownCard>
  </v-flex>
</v-layout>

<v-layout v-else wrap>
  <v-flex xs12 px-2 mt-4 style="margin-bottom: 35px;">
    <h1 style="margin-top:50px;text-align:center;">POST가 없습니다.</h1>
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
  props:{
    posts:{}
  },
  created(){
    // console.log(this.$props.category);
    // this.readPosts();
  },
  methods: {
    // setPage(n){
    //   this.page = n;
    //   this.readPosts();
    // },
    // async readPosts() {
    //   console.log(this.$props.category);
    //   await this.$http.post(this.$store.state.testIp + "/post/list/" + this.$session.get('userInfo').user_num + "/" + this.page, {post_category:this.$props.category})
    //     .then((response) => {
    //       this.posts = response.data;
    //       // console.log(this.posts);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // },
    //
    // searchPosts(config){
    //   this.posts = [];
    //   // console.log(config);
    //   config["post_category"] = this.$props.category;
    //   this.$http.post(this.$store.state.testIp + "/post/search", config)
    //     .then((response) => {
    //       // console.log(response.date);
    //       this.posts = response.data;
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // },
    //
    // async readPosts(category) {
    //   await this.$http.post(this.$store.state.testIp + "/post/list/" + this.$session.get('userInfo').user_num + "/" + this.page, {post_category:category})
    //     .then((response) => {
    //       this.posts = response.data;
    //       // console.log(this.posts);
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // }
  },
  mounted() {
    // this.readPosts();
  }
}
</script>

<style media="screen">

</style>
