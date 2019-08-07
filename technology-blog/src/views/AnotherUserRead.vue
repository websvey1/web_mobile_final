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
export default {
    name: 'AnotherUserRead',
    data() {
        return {
            user: null,
            project: [],
            teamproject: [],
            post: null, 
        }
    },
    mounted() {
        this.readUser()
        this.getProject()
    },
    methods: {
        readUser() {
            var user_num = this.$route.params.id
            var data = {
                userNum: user_num
            }
            this.$http.post('http://192.168.31.61:3000/another/readuser', data)
            .then((res) => {
                console.log(res.body)
                this.user = res.body
                console.log(this.user)
            })
        },
        getProject() {
            var user_num = this.$route.params.id
            var data = {
                userNum: user_num
            }
            this.$http.post('http://192.168.31.61:3000/another/getproject', data)
            .then((res) => {
                console.log(res.body)
                for (var i=0; i < res.body.length; i++) {
                    this.project.push(res.body[i])
                }
                console.log(this.project)
            })
        }
    }
}
</script>
