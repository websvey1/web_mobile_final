<template>
<div class="container">
<v-layout wrap align-center justify-center row fill-height>
  <v-flex xs12 ma-5 text-xs-left>
    <v-layout wrap>
      <v-flex xs10>
        <div style="margin: 8px 16px 1px">
          <v-text-field xs12 label="Title" placeholder="프로젝트명을 입력해 주세요." v-model='project.title' counter="20" :maxlength="20"></v-text-field>
        </div>
      </v-flex>
      <v-flex xs2 style="margin-top: 3.5px;">
        <v-select v-model="project.captain"
          :items="members"
          label="프로젝트 팀장"
        ></v-select>
      </v-flex>
    </v-layout>

    <v-layout wrap>
      <v-flex xs10>
        <div style="margin: 8px 16px 1px">
          <v-text-field xs12 label="Goal" placeholder="프로젝트 목표를 입력해 주세요." v-model='project.goal' counter="20" :maxlength="20"></v-text-field>
        </div>
      </v-flex>
      <v-flex xs2 style="margin-top: 3.5px;">
        <v-select v-model="project.status"
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
              :return-value.sync="project.start_date"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              style="display: inline-block;"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="project.start_date"
                  label="프로젝트 시작일"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="project.start_date" no-title scrollable locale="ko-kr">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(project.start_date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>

          <span id="date_div" style="width:30px; margin-left: 10px; margin-top: 20px;">~</span>

          <v-flex style="width: 20%; margin-right: 18px;">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="project.end_date"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="project.end_date"
                  label="프로젝트 마감일"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="project.end_date" no-title scrollable locale="ko-kr">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2= false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu2.save(project.end_date)">OK</v-btn>
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
           <v-text-field v-model="project.git_url"
            label="git url을 입력해 주세요." counter="20" :maxlength="20"
          ></v-text-field>
        </div>
        </fieldset>
      </v-flex>
    </v-layout>

    <fieldset style="margin-top: -18px; margin-bottom: 5px; height:100%">
      <legend>PICTURE</legend>
        <label style="margin-left: 20px;"><span style="font-size: 18px; font-weight: 500;">Files&nbsp;&nbsp;</span>
          <input type="file" id="files" ref="files" multiple v-on:change="handleFileUploads()" 
          style="border: 2px solid rgb(231, 241, 247); padding: 1px 1px 0px 0.5px; border-radius: 3px;"/>
        </label>

        <v-btn
          small
          style="border-radius: 15px; margin-left:16px;"
          v-on:click="addFiles()"
          color="blue lighten-2"
        >
          Add Files
          <v-icon right dark style="margin-left: -0.1px;">add</v-icon>
        </v-btn>

         <v-btn
          small
          style="border-radius: 15px;"
          v-on:click="submitFiles()"
          color="blue-grey"
          class="ma-2 white--text"
        >
          Submit
          <v-icon right dark>cloud_upload</v-icon>
        </v-btn>

        <div style="height: 10px"></div>

        <div v-for="(file, key) in files" class="file-listing" style="margin-left: 20px; margin-bottom: 5px;">{{ file.name }}
          <v-btn class="remove-file" v-on:click="removeFile( key )" dark small style="border-radius: 15px;">Remove</v-btn>
        </div>
    </fieldset>

    <fieldset>
      <legend>CONTENT</legend>
      <div style="margin:16px;">
        <markdown-editor v-model="project.content" ref="markdownEditor"></markdown-editor>
      </div>
    </fieldset> 

    <v-layout wrap>
      <v-flex xs9>
        <fieldset style="margin-right:4px; height:85%">
          <legend>&nbsp;Technology&nbsp;</legend>
          <div style="margin:16px;" id="hashtag">
              <v-text-field v-model="project.tech" counter="20" :maxlength="20"
                label="프로젝트 주요 기술"
              ></v-text-field>
          </div>
        </fieldset>
      </v-flex>
      <v-flex xs3>
        <fieldset style="margin-left:4px; height:85%">
          <legend>&nbsp;Share&nbsp;</legend>
          <div style="margin:16px;">
            <v-radio-group v-model="project.share">
              <v-radio label="Public" color="primary" value="0"></v-radio>
              <v-radio label="Private" color="error" value="1"></v-radio>
            </v-radio-group>
          </div>
        </fieldset>
      </v-flex>
    </v-layout>

    <div style="text-align:center;" id="write-btn">
      <v-btn class="v-btn theme--dark" @click="createTeamProject">확인</v-btn>
      <v-btn class="v-btn theme--dark" @click="goHome">취소</v-btn>
    </div>

  </v-flex>
</v-layout>
</div>
</template>

<script>
import { async } from 'q';
export default {
    name: 'TeamProjectWritePage',
    components: {

    },
    data(){
        return{
            img: {
                imageName: '',
                imageUrl: '',
                imageFile: '',
            },
            project: {
                user: this.$session.get('userInfo').user_num,
                title: '',
                goal: '',
                captain: '',
                status: '',
                start_date: '2019-08-02',
                end_date: '2019-08-02',
                git_url: '',
                content: '',
                tech: '',
                share: '0',
                category: '1',
                modify: this.$session.get('userInfo').user_num
            },
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
            menu2: false,
            files: [],
            imgUrls: [],
            members: null
        }
    },
    mounted(){
        this.getMember()
    },
    methods:{
        goHome(){
            this.$router.push("/myproject")
        },
        handleFileUploads() {
            let uploadedFiles = this.$refs.files.files;
            for( var i = 0; i < uploadedFiles.length; i++ ){
                this.files.push( uploadedFiles[i] );
                }
                console.log(uploadedFiles);
        },
        getMember() {
            var data = {
                teamNum: this.$route.params.id
            }
            this.$http.post('http://192.168.31.61:3000/team/getMember', data)
            .then((res) => {
                console.log(res.body)
                var member = []
                for (var i=0; i < res.body.length; i++) {
                    var name = res.body[i].user_name
                    member.push(name)
                }
                this.members = member
            })
        },
        createTeamProject() {
            if (this.imgUrls.length == 0) {
                this.imgUrls.push('https://source.unsplash.com/random/300x300')
            }
            // console.log(this.project)
            var team_num = this.$route.params.id
            var data = {
                teamNum: this.$route.params.id,
                project: this.project
            }
            this.$http.post('http://192.168.31.61:3000/teamProject/create', data)
            .then((res) => {
                var pjt_num = res.body
                for (var i=0; i < this.imgUrls.length; i++){
                    var data = {
                        teamNum: team_num,
                        pjtNum: pjt_num, 
                        image: this.imgUrls[i]
                    }
                    console.log(data)
                    this.$http.post('http://192.168.31.61:3000/teamProject/images', data)
                    .then((res) => {
                        console.log(res)
                    })
                }
            })
            .then(() => {
                var teamNum = this.$route.params.id
                // console.log(res)
                alert("글 작성 완료");
                this.$router.push(`/teamProject/${teamNum}`)
            })
        },
        submitFiles(){
            for( var i = 0; i < this.files.length; i++ ){
                let file = this.files[i];

                if (file !== undefined) {
                    this.img.imageName = file.name;
                if (this.img.imageName.lastIndexOf('.') <= 0) {
                    return
                }
                const fr = new FileReader();
                fr.readAsDataURL(file);
                fr.addEventListener('load', () => {
                    this.img.imageUrl = fr.result
                    this.img.imageFile = file
                })
                
                if (file != '') {
                    var xmlHttpRequest = new XMLHttpRequest();
                    xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image/', false);
                    xmlHttpRequest.setRequestHeader("Authorization", "Client-ID cec4916437ef1c8");
                    xmlHttpRequest.onreadystatechange = (function() {
                    if (xmlHttpRequest.readyState == 4) {
                        if (xmlHttpRequest.status == 200) {
                        var result = JSON.parse(xmlHttpRequest.responseText);
                        this.img.imageUrl = result["data"]["link"]
                        console.log(this.img.imageUrl)
                        var url = this.img.imageUrl
                        this.imgUrls.push(url)
                        console.log(this.imgUrls)
                        } else {
                        console.log("upload failed");
                        }
                    }
                    }).bind(this);
                    xmlHttpRequest.send(file);
                }
                }
            }
        },

        addFiles(){
            this.$refs.files.click();
        },
        removeFile( key ){
            this.files.splice( key, 1 );
        },
    }
}
</script>

<style scoped>
.container {
    padding-top: 10px !important; 
}
</style>