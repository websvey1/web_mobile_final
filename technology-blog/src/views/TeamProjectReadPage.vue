<template>
<div id="top__container" style="
  width: 55%; margin: 0 auto;
  ">
  <v-container>
      <v-layout wrap>
        <v-flex wrap xs12>
        <!-- 사진 -->
        <h1 style="text-align:center; padding-bottom:20px;">Project</h1>
        <v-carousel hide-delimiters style="
        width:100%;float:left; margin-top: 3px;
        ">
          <v-carousel-item v-resize="onResize" v-for="(image, i) in images" :key="i" :src="image.image_url"></v-carousel-item>
        </v-carousel>
        </v-flex>
      </v-layout>
      <!-- 상세 -->
      <v-layout wrap style="margin-top: 30px;">
        <v-flex wrap xs6>
          <fieldset style="margin-right:4px; height:100%; padding:10px 15px;">
            <!-- <legend style="text-align:right; padding-bottom:10px;"><h1>&nbsp;Project&nbsp;</h1></legend> -->
            <div style="margin:15px 20p;">
              <h2 style="padding:5px 0;">Title</h2>
              <p>{{ project.project_title }}</p>  
              <h2 style="padding:5px 0;">Goal</h2>
              <p>{{ project.project_goal }}</p>

              <h2 style="padding:5px 0;">Term</h2>
              <v-menu v-model="menu" bottom right transition="scale-transition" origin="top left">
                <template v-slot:activator="{ on }">
                  <v-chip pill v-on="on">
                    <v-icon left>event</v-icon>
                    <span style="cursor: pointer">{{ project.project_start_date }} ~ {{ project.project_end_date }}</span>
                  </v-chip>
                </template>
                <v-layout justify-center>
                  <v-date-picker v-model="picker" no-title :show-current="false" locale="ko-kr"></v-date-picker>
                </v-layout>
              </v-menu>
              <br>

              <h2>Status</h2>
              <v-btn rounded color="warning" dark>{{ project.project_status }}</v-btn>
              <br>
            </div>
          </fieldset>
          </v-flex>

          <v-flex wrap xs6>
          <fieldset style="margin-right:4px; height:100%; padding:10px 15px;">
            <!-- <legend style="text-align:right; padding-bottom:10px;"><h1>&nbsp;Project&nbsp;</h1></legend> -->
            <div style="margin:15px 20p;">
              <h2 style="padding:5px 0;">Captain</h2>
              <p>{{ project.project_captain }}</p>

              <h2 style="padding:5px 0;">Member</h2>
              <span v-for="member in members">
                  <v-chip color="rgb(191, 234, 255)" style="display: inline-block">{{ member }}</v-chip>
              </span>
              <h2 style="padding:5px 0;">git_url</h2>
              <p>{{ project.project_git_url }}</p>
            </div>
          </fieldset>
          </v-flex>
      </v-layout>
    <v-layout wrap align-center justify-center row fill-height style="clear:both; padding-top:20px;">
      <v-flex>
        <fieldset style="padding:10px 15px; height:80%">

          <h2 style="padding:10px 0;">Content</h2>
          <p>{{ project.project_content }}</p>

        </fieldset>
      </v-flex>
    </v-layout>
    <div style="text-align:center; margin-top: 20px;" id="write-btn">
      <v-btn class="v-btn theme--dark" @click="goUpdate">수정</v-btn>
      <v-btn class="v-btn theme--dark" @click="goHome">목록</v-btn>
    </div>

  </v-container>
</div>
</template>

<script>
export default {
    name: 'TeamProejctReadPage',
    data(){
        return {
            project: [],
            images: [],
            modify: false,
            menu: false,
            picker: new Date().toISOString().substr(0, 10),
            members: null,
        }
    },
    mounted() {
        this.getProject()
        this.getImage()
        this.getMember()
    },
    methods: {
        getProject() {
            console.log(this.$route.params)
            var team_num = this.$route.params.id
            var pjt_num = this.$route.params.num

            var data = {
                teamNum: team_num,
                pjtNum: pjt_num
            }

            this.$http.post('http://192.168.31.63:3000/teamProject/getproject', data)
            .then((res) => {
                console.log(res.body[0])
                this.project = res.body[0]
            })
        },
        getImage() {
            var data = {
                pjtNum: this.$route.params.num
            }
            this.$http.post('http://192.168.31.63:3000/teamProject/getimage', data)
            .then((res) => {
                console.log(res.body)
                this.images = res.body
            })
        },
        getMember() {
            var data = {
                teamNum: this.$route.params.id
            }
            this.$http.post('http://192.168.31.63:3000/team/getMember', data)
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
        goHome() {
            var teamNum = this.$route.params.id
            this.$router.push(`/teamProject/${teamNum}`)
        },
        goUpdate() {
            var teamNum = this.$route.params.id
            var pjtNum = this.$route.params.num
            this.$router.push(`/teamProject/${teamNum}/update/${pjtNum}`)
        }

    },
}
</script>
