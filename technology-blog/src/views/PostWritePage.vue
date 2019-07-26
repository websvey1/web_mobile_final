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
        <v-text-field xs12 label="제목을 입력해 주세요." v-model='title'></v-text-field>
      </div>
    </fieldset>
    <fieldset>
      <legend>CONTENT</legend>
      <div style="margin:16px;">
        <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
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
            <v-radio-group v-model="visibility">
              <v-radio label="Public" color="primary" value="true"></v-radio>
              <v-radio label="Private" color="error" value="false"></v-radio>
            </v-radio-group>
          </div>
        </fieldset>
      </v-flex>
    </v-layout>

    <div style="text-align:center;" id="write-btn">
      <v-btn class="v-btn theme--dark" @click="writePost">확인</v-btn>
      <v-btn class="v-btn theme--dark" @click="goHome">취소</v-btn>
    </div>

    <Loading :isLoading="isLoading" />

  </v-flex>
</v-layout>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import FirebaseService from '@/services/FirebaseService'
import ImageUpload from "@/components/ImageUpload"
import HashTag from "@/components/HashTag"
import LogService from '@/services/LogService'
import Loading from "@/components/Loading"

export default {
  name: 'PostWritePage',
  components: {
    markdownEditor,
    ImageUpload,
    HashTag,
    Loading
  },
  data() {
    return {
      title: "",
      content: "",
      writer: "temp_writer",
      visibility:"true",

      isLoading:false,
    }
  },

  computed:{

  },
  created(){

  },
  beforeRouteLeave(to, from, next){

  },
  methods: {
    goHome(){
      this.$router.push("/")
    },
    async writePost() {
      this.isLoading = true;
      var imageState = this.$refs.imagePicker.isRandom()
      var url = "https://source.unsplash.com/random/300x300"

      if (imageState.picture && !imageState.random) {
        url = await this.$refs.imagePicker.getImageUrl()
      }

      const post = {
        imageUrl:url,
        title:this.title,
        content:this.content,
        email: user.email,
        writer: user.displayName,
        wdate:new Date().toJSON().slice(0,10).replace(/-/g,'/'),
        tags:this.$refs.hashtag.getTags(),
        visibility:this.visibility
      }

      console.log("여기까지는 된다.");
      var state = await FirebaseService.writePost(post);
      console.log("여기까지는 안된다.");

      this.isLoading = false;

      if(state === true){
        alert("글 작성 완료");
        this.$router.push("/")
      }
      else{
        alert(state)
      }
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
