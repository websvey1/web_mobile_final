<template>
<div class="container">
<v-layout wrap align-center justify-center row fill-height>
  <v-flex xs12 ma-5 text-xs-left>
    <div style="margin: 0px 16px 1px">
      <v-text-field xs12 label="Title" placeholder="프로젝트명을 입력해 주세요."
      v-model='title' counter="20" :maxlength="20" :rules="titleRules" required></v-text-field>
    </div>
    <v-layout wrap>
      <v-flex xs10>
        <div style="margin: 8px 16px 1px">
          <v-text-field xs12 label="Goal" placeholder="프로젝트 목표를 입력해 주세요."
          v-model='goal' counter="20" :maxlength="20" :rules="goalRules" required></v-text-field>
        </div>
      </v-flex>
      <v-flex xs2 style="margin-top: 3.5px;">
        <v-select v-model="status" :items="status_items" label="프로젝트 상태" :rules="statusRules" required></v-select>
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
        <div style="margin-left: 10px; margin-right: 10px; padding-bottom: 30px;">
           <v-text-field v-model="git_url"
            label="git url을 입력해 주세요." counter="20" :maxlength="20"
          ></v-text-field>
        </div>
        </fieldset>
      </v-flex>
    </v-layout>

    <fieldset style="margin-top: -18px; margin-bottom: 5px; height:100%">
      <legend>PICTURE</legend>
        <label style="margin-left: 20px;"><span style="font-size: 18px; font-weight: 500;">Files: &nbsp;&nbsp;</span>
          <input v-if="!isRandom" type="file" id="files" ref="files" @change="onFilePicked" style="border: 2px solid rgb(231, 241, 247); padding: 1px 1px 0px 0.5px; border-radius: 3px;"/>
          <input v-else value="Random image is selected" disabled/>
        </label>

        <v-btn v-if="isRandom" small dark style="border-radius: 15px;" @click="removeRandom()">
          Cancel
        </v-btn>

        <v-btn small style="border-radius: 15px; margin-left:16px;" @click="addFiles()" color="blue lighten-2">
          Add Files
          <v-icon right dark style="margin-left: -0.1px;">add</v-icon>
        </v-btn>

        <v-btn small style="border-radius: 15px; margin-left:16px;" @click="useRandom()" color="green lighten-2">
          Random Image
          <v-icon right dark style="margin-left: -0.1px;">add</v-icon>
        </v-btn>

        <div style="height: 10px"></div>

        <div v-for="(file, key) in files" :key="key" class="file-listing" style="margin-left: 20px; margin-bottom: 5px;">
          <img :src="file" width="30px" height="30px">
          <v-btn class="remove-file" v-on:click="removeFile( key )" dark small style="border-radius: 15px;">Remove</v-btn>
        </div>
    </fieldset>

    <fieldset>
      <legend>CONTENT</legend>
      <div style="margin:16px;">
        <markdown-editor v-model="content" ref="markdownEditor" :rules="contentRules" required></markdown-editor>
      </div>
    </fieldset>

    <v-layout wrap>
      <v-flex xs9>
        <fieldset style="margin-right:4px; height:85%">
          <legend>&nbsp;Technology&nbsp;</legend>
          <div style="margin:16px;" id="hashtag">
              <v-text-field v-model="tech" counter="20" :maxlength="20"
              label="프로젝트 주요 기술" :rules="technologyRules" required></v-text-field>
          </div>
        </fieldset>
      </v-flex>
      <v-flex xs3>
        <fieldset style="margin-left:4px; height:85%">
          <legend>&nbsp;Share&nbsp;</legend>
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
import ImageUpload from "@/components/common/ImageUpload"
import HashTag from "@/components/common/HashTag"
import Loading from "@/components/common/Loading"

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
      titleRules: [v => !!v || "Project title is required"],
      goalRules: [v => !!v || "Project goal is required"],
      statusRules: [v => !!v || "Project status is required"],
      contentRules: [v => !!v || "Project content is required"],
      technologyRules: [v => !!v || "Project technology is required"],
      img: {
          imageName: '',
          imageUrl: '',
          imageFile: '',
      },
      files: [],

      writer: this.$session.get('userInfo').user_num,
      title: "",
      goal: "",
      status: '',
      status_items: [
        {
          text: '계획',
          value: '계획'
        },
        {
          text: '진행중',
          value: '진행중'
        },
        {
          text: '완료',
          value: '완료'
        }
      ],
      menu1: false,
      start_date: new Date().toISOString().substr(0, 10),
      menu2: false,
      end_date: new Date().toISOString().substr(0, 10),
      git_url: "",
      content: "",
      tech: "",
      share:"0",
      isLoading:false,
      isRandom: false,

      newimg: '',
    }
  },

  beforeRouteLeave(to, from, next){
    next();
  },

  methods: {
    goHome(){
      this.$router.push("/myproject")
    },

    async createProject(){
      if(this.allValued()){
        if (this.files.length == 0) {
          this.files.push('https://source.unsplash.com/random/300x300')
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
          imgArray: this.files
        }

        this.$http.post(this.$store.state.testIp + "/myproject/create", post)
        .then((result) => {
          console.log(result.data);
        }).catch((error) => {
          console.log(error);
        })
        .then(() => {
          alert("글 작성 완료");
          this.$router.push("/myproject")
        })
      }
    },
    addFiles(){
      if(this.isRandom){
        alert("You picked a random image.\nIf you want to use some files, press cancel button.")
        return;
      }
      this.$refs.files.click();
    },
    onFilePicked(e) {
      if(this.files.length >= 5){
        alert("사진은 5개까지 등록할 수 있습니다.");
        return;
      }
      const files = e.target.files
      if (files[0] !== undefined) {
        this.img.imageName = files[0].name
        if (this.img.imageName.lastIndexOf('.') <= 0) {
          return
        }
        const fr = new FileReader()
        fr.readAsDataURL(files[0])
        fr.addEventListener('load', () => {
          this.img.imageUrl = fr.result
          this.img.imageFile = files[0]
          // console.log(this.img.imageFile)
          this.imgur()
        })
      } else {
        this.img.imageName = ''
        this.img.imageFile = ''
        this.img.imageUrl = ''
      }
    },
    imgur() {
      var file = this.img.imageFile
      var url = ''
      if(file != ''){
        var xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image/', false);
        xmlHttpRequest.setRequestHeader("Authorization", "Client-ID cec4916437ef1c8");
        xmlHttpRequest.onreadystatechange = (function() {
          if (xmlHttpRequest.readyState == 4) {
            if (xmlHttpRequest.status == 200) {
              var result = JSON.parse(xmlHttpRequest.responseText);
              this.img.imageUrl = result["data"]["link"]
              url = this.img.imageUrl
            } else {
              console.log("upload failed");
            }
          }
        }).bind(this);
        xmlHttpRequest.send(file);
      }
      this.newimg = url
      console.log(this.newimg)
      this.files.push(this.newimg)
      console.log(this.files)
    }
    ,
    removeFile( key ){
       this.files.splice( key, 1 );
    },
    useRandom(){
      this.isRandom = true;

      this.files = [];
    },
    removeRandom(){
      this.isRandom = false;
    },
    allValued(){
      var num ="{}[]()<>?_|~`!@#$%^&*-+\"'\\/";
      console.log(this.title, '중간체크')
      for (var i=0; i<this.title.length; i++){
        for (var j=0; j<num.length; j++){
          if (this.title[i] == num[j]){
            alert("제목에 특수문자 사용 금지입니다");
            return false;
          }
        }
      }
      for (var i=0; i<this.goal.length; i++){
        for (var j=0; j<num.length; j++){
          if (this.goal[i] == num[j]){
            alert("목표에 특수문자 사용 금지입니다");
            return false;
          }
        }
      }
      for (var i=0; i<this.content.length; i++){
        for (var j=0; j<num.length; j++){
          if (this.content[i] == num[j]){
            alert("내용에 특수문자 사용 금지입니다");
            return false;
          }
        }
      }
      if(this.title == ''){
        alert("Project title is required")
        return false
      }else if(this.goal == ''){
        alert("Project goal is required")
        return false
      }else if(this.status == ''){
        alert("Project status is required")
        return false
      }else if(this.start_date > this.end_date){
        alert("Start date should be earlier than End date")
        return false
      }else if(this.content == ''){
        alert("Project content is required")
        return false
      }else if(this.tech == ''){
        alert("Project technology is required")
        return false
      }else{
        return true
      }

    }
  },
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

/* input[type="file"] {
  position: absolute;
} */
</style>
