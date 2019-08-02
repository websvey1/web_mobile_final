<template>
<div class="container">
<v-layout wrap align-center justify-center row fill-height>
  <v-flex xs12 ma-5 text-xs-left>
    <div style="margin: 0px 16px 1px">
      <v-text-field xs12 label="Title" placeholder="프로젝트명을 입력해 주세요." v-model='project.project_title' counter="20" :maxlength="20"></v-text-field>
    </div>
    <v-layout wrap>
      <v-flex xs10>
        <div style="margin: 8px 16px 1px">
          <v-text-field xs12 label="Goal" placeholder="프로젝트 목표를 입력해 주세요." v-model='project.project_goal' counter="20" :maxlength="20"></v-text-field>
        </div>
      </v-flex>
      <v-flex xs2 style="margin-top: 3.5px;">
        <v-select v-model="project.project_status"
          :items="status_items"
          :label="project.project_status"
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
              :return-value.sync="project.project_start_date"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
              style="display: inline-block;"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="project.project_start_date"
                  label="프로젝트 시작일"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="project.project_start_date" no-title scrollable locale="ko-kr">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu1.save(project.project_start_date)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        
          <span id="date_div" style="width:30px; margin-left: 10px; margin-top: 20px;">~</span>

          <v-flex style="width: 20%; margin-right: 18px;">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="project.project_end_date"
              transition="scale-transition"
              offset-y
              full-width
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="project.project_end_date"
                  label="프로젝트 마감일"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="project.project_end_date" no-title scrollable locale="ko-kr">
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2= false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.menu2.save(project.project_end_date)">OK</v-btn>
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
           <v-text-field v-model="project.project_git_url"
            label="git url을 입력해 주세요." counter="20" :maxlength="20"
          ></v-text-field>
        </div>
        </fieldset>
      </v-flex>
    </v-layout>

    <fieldset style="margin-bottom: 5px; height:100%">
      <legend>PICTURE</legend>
        <label style="margin-left: 20px;">Files
          <input type="file" id="files" ref="files" multiple v-on:change="handleFileUploads()"/>
        </label>
        <button v-on:click="addFiles()" style="margin-right: 20px;">Add Files</button>
        <button v-on:click="submitFiles()">Submit</button>

        <div v-for="(file, key) in files" class="file-listing" style="margin-left: 20px; margin-bottom: 5px;">
          <img v-if="file.slice(0,5) === 'https'" :src="file" width="30px" height="30px">
          <span v-else-if="file[0] !== 'h'">{{ file.name }}</span> 
          <span class="remove-file" v-on:click="removeFile(file)">Remove</span>
        </div>
    </fieldset>

    <fieldset>
      <legend>CONTENT</legend>
      <div style="margin:16px;">
        <markdown-editor v-model="project.project_content" ref="markdownEditor">
        </markdown-editor>
      </div>
    </fieldset> 

    <v-layout wrap>
      <v-flex xs9>
        <fieldset style="margin-right:4px; height:85%">
          <legend>&nbsp;Technology&nbsp;</legend>
          <div style="margin:16px;" id="hashtag">
              <v-text-field v-model="project.project_tech" counter="20" :maxlength="20"
                label="프로젝트 주요 기술"
              ></v-text-field>
          </div>
        </fieldset>
      </v-flex>
      <v-flex xs3>
        <fieldset style="margin-left:4px; height:85%">
          <legend>&nbsp;Share&nbsp;</legend>
          <div style="margin:16px;">
            <v-radio-group v-model="project.project_share">
              <v-radio label="Public" color="primary" value="0"></v-radio>
              <v-radio label="Private" color="error" value="1"></v-radio>
            </v-radio-group>
          </div>
        </fieldset>
      </v-flex>
    </v-layout>

    <div style="text-align:center;" id="write-btn">
      <v-btn class="v-btn theme--dark" @click="updateProject">확인</v-btn>
      <v-btn class="v-btn theme--dark" @click="goHome">취소</v-btn>
    </div>

  </v-flex>
</v-layout>
</div>
</template>

<script>
import { log } from 'util';
import { async } from 'q';
export default {
    name: 'ProjectUpdatePage',
    data() {
        return{
            img: {
                imgName: '',
                imgUrl: '',
                imgFile: '',
            },
            menu1: false,
            menu2: false,
            project: null,
            files: null,
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
            newImgs: [],
            imgUrls: []
        }
    },
    mounted() {
        this.getProject()
    },
    methods: {
        goHome(){
            this.$router.push("/")
        },
        getProject() {
            var data = {
                pjtNum: this.$route.params.id
            }
            this.$http.post('http://192.168.31.61:3000/myproject/update/getProject', data)
            .then((res)=> {
                this.project = res.body.project[0]
                this.files = res.body.images
            })
        },
        handleFileUploads() {
            let uploadedFiles = this.$refs.files.files;
            for( var i = 0; i < uploadedFiles.length; i++ ){
                this.files.push( uploadedFiles[i] );
                }
         },

        submitFiles(){
            for( var i = 0; i < this.files.length; i++ ){
                let file = this.files[i];
                console.log(file)

                if (file !== undefined) {
                    if (file !== undefined && file.slice(0,5) !== 'https') {
                        this.img.imgName = file.name;
                        if (this.img.imgName.lastIndexOf('.') <= 0) {
                            return
                        }
                        const fr = new FileReader();
                        fr.readAsDataURL(file);
                        fr.addEventListener('load', () => {
                            this.img.imageUrl = fr.result
                            this.img.imageFile = file
                        })

                        var img_file = this.img.imageFile;
                        if (file != '') {
                            var xmlHttpRequest = new XMLHttpRequest();
                            xmlHttpRequest.open('POST', 'https://api.imgur.com/3/image/', false);
                            xmlHttpRequest.setRequestHeader("Authorization", "Client-ID cec4916437ef1c8");
                            xmlHttpRequest.onreadystatechange = (function() {
                            if (xmlHttpRequest.readyState == 4) {
                                if (xmlHttpRequest.status == 200) {
                                var result = JSON.parse(xmlHttpRequest.responseText);
                                this.img.imageUrl = result["data"]["link"]
                                var url = this.img.imageUrl
                                this.newImgs.push(url)
                                console.log('새로운이미지')
                                console.log(this.newImgs)
                                } else {
                                console.log("upload failed");
                                }
                            }
                            }).bind(this);
                            xmlHttpRequest.send(file);
                        }
                    }
                    else {
                        this.imgUrls.push(file)
                        console.log('기존 이미지')
                        console.log(this.imgUrls)
                    }
                }
            }
        },

        addFiles(){
            this.$refs.files.click()
        },
        removeFile( key ){
            this.files.splice( key, 1 );
            var url = key
            var data = {
                imgDel: key
            }
            this.$http.post('http://192.168.31.61:3000/myproject/delete/image', data)
            .then((res) => {
                console.log(res)
            })
        },

        async updateProject(){
          var data = {
            pjtNum: this.project.project_num,
            project: this.project,
          }
          
          var projectNum = this.project.project_num
          var images = this.newImgs


          var project = await this.$http.post('http://192.168.31.61:3000/myproject/update/project', data)
            .then(async (res) => {
              if (this.newImgs.length > 0){
                for(var i=0; i < images.length; i++){
                  var newimage = images[0]
                  var data = {
                    pjtNum: projectNum,
                    image: newimage
                  }
                  console.log(data)
                  await this.$http.post('http://192.168.31.61:3000/myproject/update/image', data)
                  .then(async (result) => {
                    console.log(result)
                  })
                }
              }
              else {
                console.log(res)
              }
            })
            .then(async () => {
                alert("글 수정 완료");
                var pjtNum = this.$route.params.id
                this.$router.push(`/myproject/${pjtNum}`)
            })
        }

    }
}
</script>
