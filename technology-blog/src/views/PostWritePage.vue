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
            <v-radio-group v-model="share">
              <v-radio label="Public" color="primary" value="0"></v-radio>
              <v-radio label="Private" color="error" value="1"></v-radio>
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
    async form () {
      return {
        user: this.$store.state.userInfo.user_num,
        title: this.title,
        content: this.content,
        share: this.share,
        category:0,
        tags: this.$refs.hashtag.getTagsForDb(),
        imageUrl: await this.$refs.imagePicker.getImageUrl()
      }
    },
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

      var form = await this.form
      this.$http.post("http://192.168.31.65:3000/post/create", form)
      .then((req) => {
        if(req.data == "Success"){
          alert("글이 작성되었습니다.");
          this.isLoading = false;
          this.goHome();
        }
        else{
          alert("글 작성을 실패하였습니다.")
          this.isLoading = false;
        }
      })
      .catch((error) => {
        console.log(error);
        alert("ERROR")
        this.isLoading = false;
      })
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
