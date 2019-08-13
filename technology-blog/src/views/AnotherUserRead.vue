<template>
<div>
  <v-card flat max-width="500" class="mx-auto" style="padding-top:50px;">
    <v-layout py-4 pl-4>
      <v-flex shrink style="padding-right:50px;">
        <v-avatar color="rgb(140, 140, 140)" size="175">
          <img :src="user.userImage|image"/>
          <v-icon class="imgclick" color="blue lighten-2" large @click="follow(user.usernum, login_id)" v-if="status === 0"
          style="position:absolute; bottom:0; height: 50px; width:50px; margin-left: 93px;">
            fas fa-user-plus
          </v-icon>
          <v-icon class="imgclick" color="blue lighten-2" large @click="nofollow(user.usernum, login_id)" v-else-if="status === 1"
          style="position:absolute; bottom:0; height: 50px; width:50px; margin-left: 93px;">
            fas fa-user-check
          </v-icon>
          <!-- <img class="imgclick" @click="follow(user.usernum, login_id)" v-if="status === 0" src="@/assets/3.png/"
          style="position:absolute; bottom:0; height: 50px; width:50px; margin-left: 86px; border-radius: 0px"/> -->
<!-- 
          <img class="imgclick" @click="nofollow(user.usernum, login_id)" v-else-if="status === 1" src="@/assets/31.png/"
          style="position:absolute; bottom:0; height: 60px; width:50px; margin-left: 93px;"/> -->
        </v-avatar>
      </v-flex>
      <v-flex text-center style="padding-top:10px; margin-left: 10px;">
        <v-container grid-list-lg pa-0>
          <v-layout column>
            <v-flex>
              ID
              <h3>{{ user.userId }}</h3>
            </v-flex>
            <v-flex>
              Email
              <h3>{{ user.userEmail }}</h3>
            </v-flex>
            <v-flex>

            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-card>

<div style="padding:50px 50px;">
  <v-card flat>
    <v-tabs v-model="tab" grow >
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <div v-if="item == 'My Project'">
          <table>
            <thead>
                <tr style="background: rgba(0,0,0,0.05);">
                    <th>Title</th>
                    <th>Goal</th>
                    <th>Tech</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody v-for="pjt in project" :key="pjt.project_num">
                <tr @click="goProject(pjt.project_num)">
                    <td data-title="Title">{{ pjt.project_title }}</td>
                    <td data-title="Goal">{{ pjt.project_goal }}</td>
                    <td data-title="Tech">{{ pjt.project_tech }}</td>
                    <td data-title="Status">{{ pjt.project_status }}</td>
                </tr>
            </tbody>
          </table>
        </div>
        <div v-else-if="item == 'Team Project'">
          <table>
            <thead>
                <tr style="background: rgba(0,0,0,0.05)">
                    <th>Team</th>
                    <th>Title</th>
                    <th>Goal</th>
                    <th>Tech</th>
                    <th>Status</th>
                    <th>Member</th>
                </tr>
            </thead>
            <tbody v-for="team in teamproject" :key="team.project.project_num">
                <tr @click="goTeamProject(team.project.team_num, team.project.project_num)">
                    <td data-title="Team" style="min-width:90px;">{{ team.project.team_name }}</td>
                    <td data-title="Title">{{ team.project.project_title }}</td>
                    <td data-title="Goal">{{ team.project.project_goal }}</td>
                    <td data-title="Tech">{{ team.project.project_tech }}</td>
                    <td data-title="Status" style="min-width:90px;">{{ team.project.project_status }}</td>
                    <td data-title="Member" style="min-width:90px; max-width:300px;">
                      <span v-for="name in team.member" :key="name">
                        <v-chip small>
                          {{ name }}
                        </v-chip>
                      </span>
                    </td>
                </tr>
            </tbody>
          </table>
        </div>
        <v-layout wrap v-else-if="item == 'My Post'">
          <table>
            <thead>
                <tr style="background: rgba(0,0,0,0.05)">
                    <th>Title</th>
                    <th>Content</th>
                    <th>Created Time</th>
                </tr>
            </thead>
            <tbody  v-for="p in post" :key="p.post.post_num">
                <tr v-if="p.post.post_category == 0" @click="goPost(p.post.post_num)">
                    <td data-title="Title"> {{ p.post.post_title }}</td>
                    <td data-title="Content">{{  p.post.post_content }}</td>
                    <td data-title="Created Time">{{  p.post.post_created_at }}</td>
                </tr>
            </tbody>
          </table>
        </v-layout>
        <v-layout wrap v-else-if="item == 'Team Post'">
          <table>
            <thead>
                <tr style="background: rgba(0,0,0,0.05)">
                    <th>Title</th>
                    <th>Content</th>
                    <th>Created Time</th>
                </tr>
            </thead>
            <tbody  v-for="p in post" :key="p.post.post_num">
                <tr v-if="p.post.post_category == 1" @click="goPost(p.post.post_num)">
                    <td data-title="Title">{{ p.post.post_title }}</td>
                    <td data-title="Content">{{  p.post.post_content }}</td>
                    <td data-title="Created Time">{{  p.post.post_created_at  }}</td>
                </tr>
            </tbody>
          </table>
        </v-layout>
        <!-- <div v-else-if="item == 'Follow'">
         SDFJSLDFJLSDKFJSLKJ
        </div> -->
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</div>
</div>
</template>

<script>
import {async} from 'q';

export default {
  name: 'AnotherUserRead',
  data() {
      return {
        user: null,
        login_id: this.$session.get('userInfo').user_num,
        project: [],
        teamproject: [],
        post: [],
        tab: null,
        items: [
          'My Project', 'Team Project', 'My Post', 'Team Post',
        ],
        project_user: this.$route.params.id,
        status: null,
      }
  },
  mounted() {
      this.check()
      this.readUser()
      this.getProject()
      this.getTeamProject()
      this.getPost()
  },
  methods: {
    asd(){
      alert("씨발")
    },
    readUser() {
      var user_num = this.$route.params.id
      var data = {
          userNum: user_num
      }
      this.$http.post(this.$store.state.testIp + '/another/readuser', data)
      .then((res) => {
          console.log(res.body)
          this.user = res.body
          // console.log(this.user)
      })
    },
    getProject() {
      var user_num = this.$route.params.id
      var data = {
          userNum: user_num
      }
      this.$http.post(this.$store.state.testIp + '/another/getproject', data)
      .then((res) => {
          // console.log(res.body)
          this.project = res.body
          // console.log(this.project)
      })
    },

    async getTeamProject() {
      var user_num = this.$route.params.id
      var data = {
        userNum: user_num
      }
      await this.$http.post(this.$store.state.testIp + '/another/teamproject', data)
      .then(async (response) => {
        if (response.body.length > 0){
          // console.log(response.body)
          for (var i=0; i < response.body.length; i++) {
            var data = {
              teamNum: response.body[i].team_num
            }
            await this.$http.post(this.$store.state.testIp + '/another/member', data)
            .then(async (res) => {
              this.teamproject.push({
                project: response.body[i],
                member: res.body
              })
            })
          }
          // console.log(this.teamproject)
        }
      })
    },

    async getPost() {
      var user_num = this.$route.params.id
      var data = {
        userNum: user_num
      }
      await this.$http.post(this.$store.state.testIp + '/another/getpost', data)
      .then(async (response) => {
        if (response.body.length > 0){
          for (var i=0; i < response.body.length; i++) {
            var data = {
              userNum: user_num,
              postNum: response.body[i].post_num
            }
            await this.$http.post(this.$store.state.testIp + '/another/gettag', data)
            .then(async (res) => {
              this.post.push({
                post: response.body[i],
                tag: res.body
              })
            })
          }
          // console.log(this.post)
        }
      })
    },

    goProject(id) {
      this.$router.push(`/myproject/${id}`)
    },

    goTeamProject(id, num) {
      this.$router.push(`/teamProject/${id}/project/${num}`)
    },

    goPost(id) {
      this.$router.push(`/post/read/${id}`)
    },

    check() {
      if (this.login_id != this.$route.params.id){
        var data = {
          loginId: this.login_id,
          user: this.$route.params.id
        }
        console.log(data)
        this.$http.post(this.$store.state.testIp + '/another/check', data)
        .then((res) => {
          if (res.body.length === 0){
            this.status = 0
          }
          else {
            this.status = 1
          }
        })
      }
      else {
        this.status = 1
      }
    },

    follow(following, follower) {
      if (this.login_id != this.$route.params.id){
        var data = {
          followingUser: following,
          followerUser: follower
        }
        console.log(data)
        this.$http.post(this.$store.state.testIp + '/another/follow', data)
        .then((res) => {
          console.log(res.body)
          this.status = 1
        })
      }
    },

    nofollow(following, follower) {
      if (this.login_id != this.$route.params.id){
        var data = {
          followingUser: following,
          followerUser: follower
        }
        console.log(data)
        this.$http.post(this.$store.state.testIp + '/another/nofollow', data)
        .then((res) => {
          console.log(res.body)
          this.status = 0
        })
      }
      else{
        console.log("No")
      }
    },
  },
}
</script>

<style scoped>
  a{color:rgb(0, 0, 0)}
  a:link {text-decoration: none; color: #000000;}
  a:visited {text-decoration: none; color: #000000;}
  a:active {text-decoration: none; color: #000000;}
  a:hover {text-decoration: underline; color: red;}
  v-container{
    padding-bottom:50px;
  }
  table{
    font-family: sans-serif;
    border-collapse: collapse;
    font-size: 1.25em;
    width: 100%;
  }

  tr{
      border-bottom: 1px solid #ccc;
  }
  tr:hover{
    background: rgba(173, 214, 255, 0.2);
    cursor: pointer;
  }
  td,th{
      padding: .5em;
      text-align: left;
  }

  /* The magic! */
  @media screen and (max-width: 800px){
      table{
          font-size: 1em;
      }

      thead{
          display: none;
      }

      td{
          text-align: right;
          display: block;

          &:after{
              float: left;
              content: attr(data-title);
              font-weight: 600;
          }
      }
  }
  v-card-title {
    display:flex;
    width:100%;
    height:65px;
    max-height:65px;
    align-items:center;
    justify-content:space-between;
    flex: 1 0 auto;
  }
  .v-avatar img{
    border-radius: 50% !important;
  }

  .imgclick[data-v-75298a4c] {
    cursor: pointer !important;
    border-radius: 0% !important;
  }
</style>
