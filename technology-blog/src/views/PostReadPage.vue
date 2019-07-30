<template>
<<<<<<< HEAD
<div style="display: flex; justify-content: center;">
  <v-app id="inspire">

    <!-- 프로필, 작성일 -->

    <div style="margin-bottom:70px;">
      <h1 style="text-align:center;">{{post.title}}</h1>
    </div>

    <div>
        <h3 style="text-align:left; margin-bottom:10px;">{{post.writer}} </h3>
        <h3 style="text-align:left; margin-bottom:10px;">{{post.wdate}}</h3>
    </div>
    <!-- 사진 -->
    <div>
      <v-img :src="post.imageUrl" aspect-ratio="1.7" class="grey darken-4" position="center">
      </v-img>
    </div>

    <div class="content-field">
      <h3 style="text-align:center; margin: 50px 0;">{{post.content}}</h3>
    </div>

    <div style="text-align:center;" id="write-btn">
      <v-chip v-for="tag in post.tags" outline :color="tag.color">
        #{{tag.text}}
      </v-chip>

      <v-btn class="v-btn theme--dark" @click="goHome">목록</v-btn>
      <v-btn v-if="modify" class="v-btn theme--dark" @click="goUpdate">수정</v-btn>
    </div>


  </v-app>
</div>
=======
<v-layout wrap align-center justify-center row fill-height>
  <v-flex xs12 text-xs-left>
    <v-img v-if="post != null" :src="post.image_url" aspect-ratio="1.7">
      <v-layout wrap pa-5 fill-height>
        <v-flex pa-5 ma-5 white xs12>
          <h1>{{post.post_title}}</h1>
          <h3 style="text-align:right;color:grey;">작성자 : {{post.user_name}}</h3>
          <v-divider></v-divider>
          <h3 style="text-align:right;color:grey;">마지막 수정 날짜 : {{post.post_updated_at}}</h3>
          <v-divider dark></v-divider>
          <div class="content-field">
            <h3>{{post.post_content}}</h3>
          </div>
          <div style="text-align:center;" id="write-btn">
            <v-chip v-for="tag in tags" outline :color="tag.color" >
               #{{tag.text}}
             </v-chip>

            <v-divider dark></v-divider>
            <v-btn class="v-btn theme--dark" @click="goHome">목록</v-btn>
            <v-btn v-if="$store.state.userInfo != null && post.user_id == $store.state.userInfo.user_id" class="v-btn theme--dark" @click="goUpdate">수정</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-img>
  </v-flex>
</v-layout>
>>>>>>> 67c37e570a865306815febc50d1103db2605c049
</template>


<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import FirebaseService from '@/services/FirebaseService'
import ImageUpload from "@/components/ImageUpload"
import LogService from '@/services/LogService'

export default {
  name: 'PostReadPage',
  components: {
    markdownEditor,
    ImageUpload
  },
  data() {
    return {
      post: null,
      tags: [],
      modify: false
    }
  },
  methods: {
    goHome() {
      this.$router.push("/post")
    },
    goUpdate() {
      this.$router.push({
        name: "PostUpdatePage",
        params: {
          id: this.$route.params.id,
          email: this.post.email
        }
      })
    },
    async fetchData() {
      this.post = null;

<<<<<<< HEAD
      console.log(this.$route.params.id);
      await FirebaseService.readPost(this.$route.params.id).then(async data => {
        console.log("data : " + data);
        if (data == null) {
          alert("게시글이 존재하지 않습니다.");
          this.goHome();
          return;
        }

        this.post = data;
        console.log("왜 안되 씨발");
        var user = this.$store.state.userInfo;

        console.log(user);
        if (user != null) {
          if (user.email == this.post.email) {
            this.modify = true
          }
        }
      })
    }
  },
  async created() {
    if (this.$store.state.userInfo != null) {
      LogService.CreatedTime(this);
    }
    console.log("log : " + await FirebaseService.getUser());
=======
      this.$http.get("http://192.168.31.65:3000/post/read/" + this.$route.params.id)
      .then((response) => {
        this.post = response.data.post

        var colors =  ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'];

        this.tags = [];

        for(var i = 0; i < response.data.tags.length; i++){
          this.tags.push({
            text:response.data.tags[i].tag_name,
            color:colors[i%6]
          })
        }

        console.log(this.post);
      })
      .catch((error) => {
        alert(error)
      })
    }
  },
  async created(){
>>>>>>> 67c37e570a865306815febc50d1103db2605c049
    await this.fetchData();
  },
  beforeRouteLeave(to, from, next) {
    if (this.$store.state.logInfo != null) {
      LogService.DestroyedTime(this);
    }
    next();
  },
  destroyed() {

  }

}
</script>
<style>
  #inspire{
    padding-top: 100px;
    width:50%;
    display: flex;
    justify-content: center;
  }
</style>
