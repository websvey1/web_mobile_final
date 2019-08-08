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

  <div style="padding:100px 0;">
    <v-card>
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3">내 정보</h1>
      </v-card-title>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="text in texts" :key="text">
          <v-card flat>
            <v-card-text>{{ text }}</v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</div>
</template>

<script>
import {
  async
} from 'q';
export default {
  name: 'AnotherUserRead',
  data() {
    return {
      user: null,
      project: [],
      teamproject: [],
      post: null,
      tab: null,
      items: [
        'My Project', 'My Post', 'Team Project', 'Team Post',
      ],
      texts: [
        '11111', '22222', '3333', '4444',
      ],
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
          if (response.body.length > 0) {
            // console.log(response.body)
            for (var i = 0; i < response.body.length; i++) {
              var data = {
                teamNum: response.body[i].team_num
              }
              await this.$http.post('http://192.168.31.61:3000/another/member', data)
                .then(async (res) => {
                  this.teamproject.push({
                    project: response.body[i],
                    member: res.body
                  })
                  // console.log(this.teamproject)
                })
            }
          }
        })
    },

    getPost() {
      var user_num = this.$route.params.id
      var data = {
        userNum: user_num
      }
      this.$http.post('http://192.168.31.61:3000/another/getpost', data)
        .then((res) => {
          // console.log(res.body)
          this.post = res.body
          console.log(this.post)
        })
    }
  }
}

</script>
<style scoped>
v-container {
  padding-bottom: 50px;
}
</style>
