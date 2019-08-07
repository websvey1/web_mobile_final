<template>
<v-card
    max-width="500"
    class="mx-auto"
  >
    <v-layout
      py-4
      pl-4
    >
      <v-flex shrink>
        <v-avatar color="indigo" size="175">
            <v-icon dark>account_circle</v-icon>
        </v-avatar>
      </v-flex>
      <v-flex text-center>
        <v-container
          grid-list-lg
          pa-0
        >
          <v-layout column>
            <v-flex>
                <h3>{{ user.userId }}</h3>
            </v-flex>
            <v-flex>
              <h3>{{ user.userEmail }}</h3>
            </v-flex>
            <v-flex>
              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { async } from 'q';
export default {
    name: 'AnotherUserRead',
    data() {
        return {
            user: null,
            project: null,
            teamproject: [],
            post: null, 
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
