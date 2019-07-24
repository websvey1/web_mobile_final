<template>
<v-layout wrap align-center justify-center row fill-height>
  <v-flex xs12 text-xs-left>
    <v-img v-if="post != null" :src="post.imageUrl" aspect-ratio="1.7">
      <v-layout wrap pa-5 fill-height>
        <v-flex pa-5 ma-5 white xs12>
          <h1>{{post.title}}</h1>
          <h3 style="text-align:right;color:grey;">작성자 : {{post.writer}}</h3>
          <v-divider></v-divider>
          <h3 style="text-align:right;color:grey;">{{post.wdate}}</h3>
          <v-divider dark></v-divider>
          <div class="content-field">
            <h3>{{post.content}}</h3>
          </div>
          <div style="text-align:center;" id="write-btn">
            <v-chip v-for="tag in post.tags" outline :color="tag.color" >
               #{{tag.text}}
             </v-chip>

            <v-divider dark></v-divider>
            <v-btn class="v-btn theme--dark" @click="goHome">목록</v-btn>
            <v-btn v-if="modify" class="v-btn theme--dark" @click="goUpdate">수정</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-img>
  </v-flex>
</v-layout>
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
      post:null,
      tags:[],
      modify:false
    }
  },
  methods: {
    goHome(){
      this.$router.push("/post")
    },
    goUpdate(){
      this.$router.push({name:"PostUpdatePage", params:{id:this.$route.params.id, email:this.post.email}})
    },
    async fetchData(){
      this.post = null;

      console.log(this.$route.params.id);
      await FirebaseService.readPost(this.$route.params.id).then(async data => {
          console.log("data : " + data);
          if(data == null){
            alert("게시글이 존재하지 않습니다.");
            this.goHome();
            return;
          }

          this.post = data;
          console.log("왜 안되 씨발");
          var user = this.$store.state.userInfo;

          console.log(user);
          if(user != null){
            if(user.email == this.post.email){
              this.modify = true
            }
          }
        })
    }
  },
  async created(){
    if(this.$store.state.userInfo != null){
      LogService.CreatedTime(this);
    }
    console.log("log : " + await FirebaseService.getUser());
    await this.fetchData();
  },
  beforeRouteLeave(to, from, next){
    if(this.$store.state.logInfo != null){
      LogService.DestroyedTime(this);
    }
    next();
  },
  destroyed(){

  }

}
</script>

<style scoped>
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 200px;
}

#btn {
  float: center;
}

.content-field{
  min-height: 500px;
}
</style>
