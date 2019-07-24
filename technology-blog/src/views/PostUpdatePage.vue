<template>
<v-layout wrap align-center justify-center row fill-height>
  <v-flex xs12 ma-5 text-xs-left>
    <fieldset>
      <legend>PICTURE</legend>
      <ImageUpload :random_picture="true" ref="imagePicker"></ImageUpload>
    </fieldset>
    <fieldset>
      <legend>TITLE</legend>
      <div style="margin:0px 16px">
        <v-text-field xs12 label="제목을 입력해 주세요." v-model='post.title'></v-text-field>
      </div>
    </fieldset>
    <fieldset>
      <legend>CONTENT</legend>
      <div style="margin:16px;">
        <markdown-editor v-model="post.content" ref="markdownEditor"></markdown-editor>
      </div>
    </fieldset>

    <v-layout wrap>
      <v-flex xs9>
        <fieldset style="margin-right:4px; height:100%">
          <legend>TAG</legend>
          <div style="margin:16px;" id="hashtag">
            <HashTag ref="hashtag"></HashTag>
          </div>
        </fieldset>
      </v-flex>
      <v-flex xs3>
        <fieldset style="margin-left:4px; height:100%">
          <legend>VISIBILILTY</legend>
          <div style="margin:16px;">
            <v-radio-group v-model="post.visibility">
              <v-radio label="Public" color="primary" value="true"></v-radio>
              <v-radio label="Private" color="error" value="false"></v-radio>
            </v-radio-group>
          </div>
        </fieldset>
      </v-flex>
    </v-layout>

    <div style="text-align:center;" id="write-btn">
      <v-btn class="v-btn theme--dark" @click="updatePost">수정</v-btn>
      <v-btn class="v-btn theme--dark" @click="removePost">삭제</v-btn>
      <v-btn class="v-btn theme--dark" @click="goRead">취소</v-btn>
    </div>

    <loading :active.sync="isLoading"
    :can-cancel="false"
    :is-full-page="true"></loading>
  </v-flex>
</v-layout>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import FirebaseService from '@/services/FirebaseService'
import ImageUpload from "@/components/ImageUpload"
import HashTag from "@/components/HashTag"
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import LogService from '@/services/LogService'

export default {
  name: 'PostUpdatePage',
  components: {
    markdownEditor,
    ImageUpload,
    HashTag,
    Loading
  },
  data() {
    return {
      post:{},
      isLoading:false
    }
  },
  async created(){
    if(this.$store.state.userInfo != null){
      LogService.CreatedTime(this);
    }
    // var user = await FirebaseService.getUser();
    //
    // console.log("asdasd" + (user == null) || (user.email != this.$route.params.email));

    console.log("씨이발" + user.email)
    console.log(this.$router);
    console.log("씨발" +this.$route.params.email);
    if(user.email !== this.$route.params.email){
      alert("잘못된 접근입니다.")
      this.$router.push("/")
      return;
    }
    else if(user.email != this.$route.params.email){
      alert("잘못된 접근입니다.")
      this.$router.push("/")
      return;
    }
    this.fetchData()
  },
  beforeRouteLeave(to, from, next){
    if(this.$store.state.logInfo != null){
      LogService.DestroyedTime(this);
    }
    next();
  },
  methods: {
    async fetchData(){
      this.post = {
        title:"",
        content:""
      };

      await FirebaseService.readPost(this.$route.params.id).then(data => {
          this.post = data
          this.$refs.imagePicker.setImage(data.imageUrl)
          this.$refs.hashtag.setTags(data.tags)
        })
    },
    async updatePost(){
      this.isLoading = true;

      var imageState = this.$refs.imagePicker.isRandom()
      if (imageState.picture && !imageState.random) {
        this.post.imageUrl = await this.$refs.imagePicker.getImageUrl();
      }
      else if(imageState.random){
        this.post.imageUrl = "https://source.unsplash.com/random/1600x900";
      }

      this.post.tags = this.$refs.hashtag.getTags();
      this.post.wdate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      var state = await FirebaseService.updatePost(this.$route.params.id, this.post)

      this.isLoading = false;

      if(state === true){
        alert("수정 되었습니다.")
        this.goRead()
      }
      else{
        alert("error : " + error.code)
      }
    },
    async removePost(){
      var remove = confirm("삭제하시겠습니까?")

      if(!remove){
        return;
      }

      this.isLoading = true;
      this.post = {
        title:"",
        content:"",
        imageUrl:"",
        tags:[],
        visibility:true
      };

      var state = await FirebaseService.removePost(this.$route.params.id);
      this.isLoading = false;

      console.log(state);
      console.log(true);
      console.log(false);
      if(state === true){
        alert("삭제되었습니다.");
        this.goHome();
      }
      else{
        alert("error : " + state)
      }
    },

    goRead(){
      this.$router.push({name:"PostReadPage", params:{id:this.$route.params.id}})
    },

    goHome(){
      this.$router.push("/")
    }
  }
}
</script>

<style scoped>
@import '~simplemde/dist/simplemde.min.css';

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
</style>
