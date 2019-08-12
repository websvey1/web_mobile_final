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

  },
  methods: {

  },
  mounted() {
  }
}
</script>

<style media="screen">

</style>
