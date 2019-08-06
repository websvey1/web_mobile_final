<template>
<v-layout wrap align-center justify-center row fill-height>
  <v-flex xs12 ma-5 text-xs-left>
    <v-layout warp>
      <v-flex xs9>
        <fieldset style="margin-right:4px; height:100%">
          <legend>PICTURE</legend>
          <ImageUpload :random_picture="true" ref="imagePicker"></ImageUpload>
        </fieldset>
      </v-flex>
      <v-flex xs3>
        <fieldset style="margin-left:4px; height:100%">
          <legend>Project</legend>
          <div style="margin:16px;">
            <v-select
            style="margin:0 auto;"
            v-model="project"
            :items="items"
            item-text="project_title"
            :hint="`${project.team_name == undefined ? '' : '팀 이름 : ' + project.team_name} ${project.project_status == undefined ? '프로젝트를 선택해 주세요.' : ' ['+ project.project_status +']'}`"
            label="Project"
            return-object
            persistent-hint
            single-line
            ></v-select>
          </div>
        </fieldset>
      </v-flex>
    </v-layout>

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
      <!-- <v-btn class="v-btn theme--dark" @click="checkP">확인</v-btn> -->
      <v-btn class="v-btn theme--dark" @click="writePost">확인</v-btn>
      <v-btn class="v-btn theme--dark" @click="goHome">취소</v-btn>
    </div>

    <Loading :isLoading="isLoading" />

  </v-flex>
</v-layout>
</template>

<script>
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import ImageUpload from "@/components/common/ImageUpload"
import HashTag from "@/components/common/HashTag"
import Loading from "@/components/common/Loading"
import Time from "@/services/Time"

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
      project:{},
      items:[],
      content: "",
      writer: "",
      share:"0",
      isLoading:false
    }
  },
  created(){                               // 동작이 완벽하지 않음
    if(!this.$session.has("userInfo")){    // POST작성 버튼을 누르면 작성 form이 잠깐 떴다가 다시 뒤로 가짐.
      alert("로그인 해주세요.")               // 수정요망
      this.$router.go(-1)
    }
    else{
      this.readProjectList();
    }
  },
  computed:{
    async form () {
      return {
        user: this.$session.get("userInfo").user_num,
        title: this.title,
        content: this.content,
        share: this.share,
        created_at:Time.getFullDate(),
        category:this.project.project_category,
        tags: this.$refs.hashtag.getTagsForDb(),
        imageUrl: await this.$refs.imagePicker.getImageUrl(),
        project:this.project.project_num
      }
    },
  },
  methods: {
    checkP(){
      console.log(this.project);
    },
    async writePost() {
      this.isLoading = true;

      var form = await this.form

      await this.$http.post("http://192.168.31.65:3000/post/create", form)
      .then((req) => {
        alert("글이 작성되었습니다.");
        this.isLoading = false;
        this.goHome();
      })
      .catch((error) => {
        this.isLoading = false;
      })
    },

    readProjectList(){
      this.$http.post("http://192.168.31.65:3000/post/project/list/" + this.$session.get("userInfo").user_num)
      .then((result) => {
        this.items = result.data;
      })
    },
    goHome(){
      this.$router.go(-1);
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
