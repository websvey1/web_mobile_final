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
      <v-flex text-center style="padding-top:10px; margin-left: 25px;">
        <v-container grid-list-lg pa-0>
          <v-layout column>
            <v-flex>
              ID
              <h3>&nbsp;{{ user.userId }}</h3>
            </v-flex>
            <v-flex>
              Email
              <h3>&nbsp;{{ user.userEmail }}</h3>
            </v-flex>
            <v-flex v-if="user.userTech.length > 0" style="margin-left: -5px;">
              <span v-for="tech in user.userTech" :key="tech">
                <v-chip color="#FFECB3"><b>{{ tech }}</b></v-chip>
              </span>
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
                    <th>Project</th>
                    <th>Post Title</th>
                    <th>Post Tag</th>
                    <th>Created_Time</th>
                </tr>
            </thead>
            <tbody v-for="p in post" :key="p.post.post_num">
                <tr v-if="p.post.post_category == 0" @click="goPost(p.post.post_num)">
                    <td data-title="Project"> {{ p.post.project_title }}</td>
                    <td data-title="Title"> {{ p.post.post_title }}</td>
                    <td data-title="Tag" v-if="p.tag.length > 0">
                      <span v-for="t in p.tag" :key="t">
                        <v-chip small>
                          {{ t }}&nbsp;
                        </v-chip>
                      </span>
                    </td>
                    <td data-title="Created_Time">{{  p.post.post_created_at }}</td>
                </tr>
            </tbody>
          </table>
        </v-layout>
        <v-layout wrap v-else-if="item == 'Team Post'">
          <table>
            <thead>
                <tr style="background: rgba(0,0,0,0.05)">
                    <th>Team</th>
                    <th>Project</th>
                    <th>Post Title</th>
                    <th>Post Tag</th>
                    <th>Created Time</th>
                </tr>
            </thead>
            <tbody v-for="p in post" :key="p.post.post_num">
                <tr v-if="p.post.post_category == 1" @click="goPost(p.post.post_num)">
                    <td data-title="Team">{{ p.post.team_name }}</td>
                    <td data-title="Project">{{ p.post.project_title }}</td>
                    <td data-title="Title">{{ p.post.post_title }}</td>
                    <td data-title="Tag">
                      <span v-if="p.tag[0] !== null">
                        <span v-for="t in p.tag" :key="t">
                          <v-chip small>
                            {{ t }}&nbsp;
                          </v-chip>
                        </span>
                      </span>
                    </td>
                    <td data-title="Created Time">{{  p.post.post_created_at }}</td>
                </tr>
            </tbody>
          </table>
        </v-layout>
        <v-layout wrap row v-if="item == 'Follow'">
          <v-flex wrap xs12 style="margin-top: 20px;">
            <v-select v-model="userfollow" :items="follows" 
            item-text="text" :menu-props="{ bottom: true, offsetY: true }" return-object
            style="max-width: 250px; text-align: center; margin-left: 10px;"></v-select>
          </v-flex>
          <v-layout wrap v-if="userfollow.text === 'Follower'">
            <v-flex wrap xs3 pa-2 v-for="f in userfollowers" :key="f.user.user_num">
              <div class="usercard" @click="userpage(f.user.user_num)">
                <img v-if="f.user.user_image !== null" class="profile" :src="f.user.user_image"/>
                <img v-else class="profile" src="@/assets/profile.png/"/>
                <div class="userinfo">
                  <br>
                  <h3>{{ f.user.user_id }}</h3>
                  <p class="description" style="margin-bottom: 15px">{{ f.user.user_email }}</p>
                  <span v-for="t in f.tech" :key="t">
                    <v-chip color="#455A64" dark small>
                        {{ t }}&nbsp;
                    </v-chip>
                  </span>
                </div>
              </div>
            </v-flex>
          </v-layout>

          <v-layout wrap v-else-if="userfollow.text === 'Following'">
            <v-flex wrap xs3 pa-2 v-for="f in userfollowings" :key="f.user.user_num">
              <div class="usercard" @click="userpage(f.user.user_num)">
                <img v-if="f.user.user_image !== null" class="profile" :src="f.user.user_image"/>
                <img v-else class="profile" src="@/assets/profile.png/"/>
                <div class="userinfo">
                  <br>
                  <h3>{{ f.user.user_id }}</h3>
                  <p class="description" style="margin-bottom: 15px">{{ f.user.user_email }}</p>
                  <span v-for="t in f.tech" :key="t">
                    <v-chip color="#455A64" dark small>
                        {{ t }}&nbsp;
                    </v-chip>
                  </span>
                </div>
              </div>
            </v-flex>
          </v-layout>
        
        </v-layout>
          
          
        <!-- <div v-else-if="item == 'Follow'">
         SDFJSLDFJLSDKFJSLKJ
        </div> -->
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</div>
  <div style="text-align:center">
    <v-btn class="v-btn theme--dark" @click="another">목록</v-btn>
  </div>
</div>
</template>

<script>
import {async} from 'q';
import { mapState } from 'vuex';

export default {
  name: 'AnotherUserRead',
  data() {
      return {
        user: null,
        login_id: this.$session.get('userInfo').user_num,
        project_user: this.$route.params.id,
        project: [],
        teamproject: [],
        post: [],
        tab: null,
        items: [
          'My Project', 'Team Project', 'My Post', 'Team Post', 'Follow'
        ],
        status: null,
        follows: [
          {text: 'Follower', value: '0'},{text: 'Following', value: '1'}
        ],
        userfollow: {text: 'Follower', value: '0'},
        userfollowers: [],
        userfollowings: [],
      }
  },
  mounted() {
      this.check()
      this.readUser()
      this.getProject()
      this.getTeamProject()
      this.getPost()
      this.userFollower()
      this.userFollowing()
  },
  methods: {
    another() {
      this.$router.push('/another')
    },
    userpage(userNum) {
      this.$router.push(`/another/${userNum}`)
    },
    readUser() {
      var user_num = this.$route.params.id
      var data = {
          userNum: user_num
      }
      this.$http.post(this.$store.state.testIp + '/another/readuser', data)
      .then((res) => {
          // console.log(res.body)
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

    async userFollower() {
      var data = {
        userNum: this.$route.params.id
      }
      await this.$http.post(this.$store.state.testIp + '/another/userfollower', data)
      .then(async (res) => {
        if (res.body.length > 0) {
          for (var i=0; i < res.body.length; i++){
            var temp = {
              userNum: res.body[i].user_num
            }
            await this.$http.post(this.$store.state.testIp + '/another/usertech', temp)
            .then(async (response) => {
              this.userfollowers.push({
                user: res.body[i],
                tech: response.body
              })
            })
          }
        }
        // console.log(this.userfollowers)
      })
    },

    async userFollowing() {
      var data = {
        userNum: this.$route.params.id
      }
      await this.$http.post(this.$store.state.testIp + '/another/userfollowing', data)
      .then(async (res) => {
        if (res.body.length > 0) {
          for (var i=0; i < res.body.length; i++){
            var temp = {
              userNum: res.body[i].user_num
            }
            await this.$http.post(this.$store.state.testIp + '/another/usertech', temp)
            .then(async (response) => {
              this.userfollowings.push({
                user: res.body[i],
                tech: response.body
              })
            })
          }
        }
        // console.log(this.userfollowings)
      })
    },

    goProject(id) {
      this.$router.push(`/project/${id}`)
    },

    goTeamProject(id, num) {
      this.$router.push(`/team/${id}/project/${num}`)
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
        // console.log(data)
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

    async follow(following, follower) {
      if (this.login_id != this.$route.params.id){
        var data = {
          followingUser: following,
          followerUser: follower
        }
        // console.log(data)
        await this.$http.post(this.$store.state.testIp + '/another/follow', data)
        .then(async (res) => {
          // console.log(res.body)
          this.status = 1
          this.userfollowers = []
          await this.userFollower()
        })
      }
    },

    async nofollow(following, follower) {
      if (this.login_id != this.$route.params.id){
        var data = {
          followingUser: following,
          followerUser: follower
        }
        // console.log(data)
        await this.$http.post(this.$store.state.testIp + '/another/nofollow', data)
        .then(async (res) => {
          console.log(res.body)
          this.status = 0
          this.userfollowers = []
          await this.userFollower()
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

  .usercard {
    width: 230px;
    height: 330px;
    /* position: absolute; */
    background-color: #fafafa;
    border-radius: 3px;
    box-shadow: 0 0 5px #333;
    cursor: pointer;
  }

  .profile {
    width: 130px;
    height: 130px;
    border: 5px solid #eee;
    border-radius: 50%;
    margin: 30px 50px auto;
    background-image: url("");
    background-size: cover;
    transition-duration: 0.3s;
  }

  .profile:hover {
    opacity: 0.5;
  }

  .userinfo {
    text-align: center;
  }

  .userinfo p {
    padding-top: 10px;
    font-size: 13px;
  }

  .description {
    font-size: 0.8rem;
    margin: 0 20px;
  }


  @media all and (max-width: 400px) {
    .card {
      margin: 0;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

</style>
