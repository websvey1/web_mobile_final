<template>
<div>
  <v-card flat max-width="500" class="mx-auto" style="padding-top:50px;">
    <v-layout py-4 pl-4>
      <v-flex shrink style="padding-right:50px;">
        <v-avatar color="rgb(140, 140, 140)" size="175">
          <v-icon dark>account_circle</v-icon>
          <v-btn icon style="
          position:absolute;
          bottom:0;
          right:0;
          ">
          <!-- <v-icon style="font-size: 50px;">person_add</v-icon> -->
          <img src="@/assets/user.png/" style="width:70px; "></img>
          </v-btn>
        </v-avatar>

      </v-flex>
      <v-flex text-center style="padding-top:10px;">
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
    <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <div v-if="item == 'My Project'">
          <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Goal</th>
                    <th>Tech</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody v-for="pjt in project" :key="pjt.project_num">
                <tr>
                    <td data-title="Title"><a @click="goProject(pjt.project_num)">{{ pjt.project_title }}</a></td>
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
                <tr>
                    <th>Team</th>
                    <th>Title</th>
                    <th>Goal</th>
                    <th>Tech</th>
                    <th>Status</th>
                    <th>Member</th>
                </tr>
            </thead>
            <tbody v-for="team in teamproject" :key="team.project.project_num">
                <tr>
                    <td data-title="Team">{{ team.project.team_name }}</td>
                    <td data-title="Title"><a @click="goTeamProject(team.project.team_num, team.project.project_num)">{{ team.project.project_title }}</a></td>
                    <td data-title="Goal">{{ team.project.project_goal }}</td>
                    <td data-title="Tech">{{ team.project.project_tech }}</td>
                    <td data-title="Status">{{ team.project.project_status }}</td>
                    <td data-title="Member">
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
        <v-layout wrap v-else-if="item == 'Post'">
          <v-flex wrap v-for="p in post" :key="p.post.post_num" xs3 style="margin-top: 20px; margin-right: 20px;">
              <v-card max-width="344" class="mx-auto">
              <v-card-title>Title</v-card-title>
              <v-card-title><a @click="goPost(p.post.post_num)">{{ p.post.post_title }}</a></v-card-title>
              <v-chip v-if="p.post.post_category == 0" color="green" text-color="white">
                Project Post 
              </v-chip>
              <v-chip v-else-if="p.post.post_category == 1" color="cyan" text-color="white">
                Team Project Post 
              </v-chip>
              <div v-if="p.tag[0] !== null">
                <span v-for="t in p.tag" :key="t">
                  <v-chip class="ma-2" color="pink" label text-color="white">
                    <v-icon left>label</v-icon>
                    {{ t }}
                  </v-chip>
                </span>
              </div>
              <v-card-actions>
                <v-btn text>Click</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
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
        project: [],
        teamproject: [],
        post: [],
        tab: null,
        items: [
          'My Project', 'Team Project', 'Post', 'follow',
        ],
        follow: ['예지', '영신'],
      }
  },
  mounted() {
      this.readUser()
      this.getProject()
      this.getTeamProject()
      this.getPost()
  },
  methods: {
    readUser() {
      var user_num = this.$route.params.id
      var data = {
          userNum: user_num
      }
      this.$http.post('http://192.168.31.61:3000/another/readuser', data)
      .then((res) => {
          this.user = res.body
      })
    },

    getProject() {
      var user_num = this.$route.params.id
      var data = {
          userNum: user_num
      }
      this.$http.post('http://192.168.31.61:3000/another/getproject', data)
      .then((res) => {
          // console.log(res.body)
          this.project = res.body
          console.log(this.project)
      })
    },

    async getTeamProject() {
      var user_num = this.$route.params.id
      var data = {
        userNum: user_num
      }
      await this.$http.post('http://192.168.31.61:3000/another/teamproject', data)
      .then(async (response) => {
        if (response.body.length > 0){
          // console.log(response.body)
          for (var i=0; i < response.body.length; i++) {
            var data = {
              teamNum: response.body[i].team_num
            }
            await this.$http.post('http://192.168.31.61:3000/another/member', data)
            .then(async (res) => {
              this.teamproject.push({
                project: response.body[i],
                member: res.body
              })
            })
          }
          console.log(this.teamproject)
        }
      })
    },

    async getPost() {
      var user_num = this.$route.params.id
      var data = {
        userNum: user_num
      }
      await this.$http.post('http://192.168.31.61:3000/another/getpost', data)
      .then(async (response) => {
        if (response.body.length > 0){
          for (var i=0; i < response.body.length; i++) {
            var data = {
              userNum: user_num,
              postNum: response.body[i].post_num
            }
            await this.$http.post('http://192.168.31.61:3000/another/gettag', data)
            .then(async (res) => {
              this.post.push({
                post: response.body[i],
                tag: res.body
              })
            })
          }
          console.log(this.post)
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
    }
  },

}

</script>

<style scoped>
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
</style>
