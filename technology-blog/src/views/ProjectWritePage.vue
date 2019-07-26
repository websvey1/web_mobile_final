<template>
<div class="container">
<v-layout wrap align-center justify-center row fill-height>
  <v-flex xs12 ma-5 text-xs-left>
    <div style="margin: 0px 16px 1px">
      <v-text-field xs12 label="Title" placeholder="프로젝트명을 입력해 주세요." v-model='title'></v-text-field>
    </div>
    <v-layout wrap>
      <v-flex xs10>
        <div style="margin: 8px 16px 1px">
          <v-text-field xs12 label="Goal" placeholder="프로젝트 목표를 입력해 주세요." v-model='goal'></v-text-field>
        </div>
      </v-flex>
      <v-flex xs2 style="margin-top: 3.5px;">
        <v-select v-model="status"
          :items="status_items"
          label="프로젝트 상태"
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout wrap>
      <v-flex xs5>
        <fieldset style="margin-right:4px; height:80%">
          <legend>&nbsp;Date&nbsp;</legend>
          <v-layout wrap>
          <v-flex style="width: 17%; margin-left: 17px;">
            <v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              :return-value.sync="start_date"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              style="display: inline-block;"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="start_date"
                  label="프로젝트 시작일"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="start_date" no-title scrollable locale="ko-kr">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(start_date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>

          <span id="date_div">~</span>

          <v-flex style="width: 20%; margin-right: 18px;">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="end_date"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="end_date"
                  label="프로젝트 마감일"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="end_date" no-title scrollable locale="ko-kr">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2= false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu2.save(end_date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          </v-layout>
        </fieldset>
      </v-flex>

      <v-flex xs7>
        <fieldset style="margin-right:4px; height:80%">
        <legend>&nbsp;git URL&nbsp;</legend>
        <div style="margin-left: 10px; margin-right: 10px;">
           <v-text-field v-model="git_url"
            label="git url을 입력해 주세요."
          ></v-text-field>
        </div>
        </fieldset>
      </v-flex>
    </v-layout>
  
    <fieldset style="margin-bottom: 5px;">
      <legend>PICTURE</legend>
      <ImageUpload :random_picture="true" ref="imagePicker"></ImageUpload>
    </fieldset>

    <fieldset>
      <legend>CONTENT</legend>
      <div style="margin:16px;">
        <markdown-editor v-model="content" ref="markdownEditor"></markdown-editor>
      </div>
    </fieldset>

    <v-layout wrap>
      <v-flex xs9>
        <fieldset style="margin-right:4px; height:85%">
          <legend>&nbsp;Technology&nbsp;</legend>
          <div style="margin:16px;" id="hashtag">
              <v-text-field v-model="tech"
                label="프로젝트 주요 기술"
              ></v-text-field>
          </div>
        </fieldset>
      </v-flex>
      <v-flex xs3>
        <fieldset style="margin-left:4px; height:85%">
          <legend>&nbsp;Share&nbsp;</legend>
          <div style="margin:16px;">
            <v-radio-group v-model="share">
              <v-radio label="Public" color="primary" value="1"></v-radio>
              <v-radio label="Private" color="error" value="0"></v-radio>
            </v-radio-group>
          </div>
        </fieldset>
      </v-flex>
    </v-layout>

    <div style="text-align:center;" id="write-btn">
      <v-btn class="v-btn theme--dark" @click="createProject">확인</v-btn>
      <v-btn class="v-btn theme--dark" @click="goHome">취소</v-btn>
    </div>

    <Loading :isLoading="isLoading" />

  </v-flex>
</v-layout>
</div>
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
      writer: 1,
      title: "",
      goal: "",
      status: '',
      status_items: [
        {
          text: '계획', 
          value: 'plan'
        },
        {
          text: '진행중', 
          value: 'progress'
        },
        {
          text: '완료',
          value: 'done'
        }
      ],
      menu1: false,
      start_date: "2019-07-01",
      menu2: false,
      end_date: "2019-07-01",
      git_url: "",
      content: "",
      tech: "",
      share:"1",
      isLoading:false,
    }
  },

  beforeRouteLeave(to, from, next){
    LogService.DestroyedTime(this);
    next();
  },

  methods: {
    goHome(){
      this.$router.push("/")
    },

    async createProject(){
      var imgState = this.$refs.imagePicker.isRandom()
      var url = "https://source.unsplash.com/random/300x300"

      if (imgState.picture && !imgState.random) {
        url = await this.$refs.imagePicker.getImageUrl()
      }

      const post = {
        user: this.writer,
        title: this.title,
        goal: this.goal,
        status: this.status,
        start_date: this.start_date,
        end_date: this.end_date,
        git_url: this.git_url,
        content: this.content,
        tech: this.tech,
        share: this.share,
        imgurl: url
      }

      console.log(post);
      console.log("제발제발");

      
      this.$http.post("/myproject/create", post)
      .then((result) => {
        console.log(result.data);
      }).catch((error) => {
        console.log(error);
      });


    },

    async writePost() {
      this.isLoading = true;
      var imageState = this.$refs.imagePicker.isRandom()
      var url = "https://source.unsplash.com/random/300x300"
      var user = await FirebaseService.getUser();

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

#date_div {
  display: inline-block;
  margin: 15px 20px;
  font-size: 25px;
  font-weight: 300;
}
</style>
