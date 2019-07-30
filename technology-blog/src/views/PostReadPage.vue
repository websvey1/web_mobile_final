<template>
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
