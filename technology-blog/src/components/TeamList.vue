 <template>
 <sequential-entrance fromTop>

  <v-card v-for="item in items" max-width="1000" max-height="170" style="margin: auto">
  <div v-if="item.exist == true">
    <v-layout py-4 pl-4>
      <v-flex shrink>
        <v-img height="120" width="120" src="https://www.colourbox.com/preview/18068844-doodle-team-icon.jpg" style="border-radius: 50%;"></v-img>
      </v-flex>
      <v-flex text-center>
        <v-container grid-list-lg style="margin-left: 10px;">
          <v-layout column>
            <v-flex style="padding-top: 20px;">
              <h1>{{ item.title }}</h1>
            </v-flex>
            <v-flex v-if="item.auth == 0" style="margin-left: auto;">
              <v-btn color="warning" @click="show(item.member)">팀원보기</v-btn>
              <v-btn color="info" @click="item.auth = 1 && accept(item.title)">수락</v-btn>
              <v-btn color="error" @click="del(item.title)">거절</v-btn>
            </v-flex>
            <v-flex v-else style="margin-left: auto;">
              <v-btn color="warning" @click="show(item.member)">팀원보기</v-btn>
            </v-flex>
            <v-flex>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
    </div>
  </v-card>

 </sequential-entrance>
 </template>

<script>
import router from '@/router'

export default {
    name: 'TeamList',
    components: {

    },
    data(){
        return{
          items: []
        }
    },
    props: {
        post: {}
    },
    mounted(){
      this.start();
    },
    methods: {
      async start(){
        var temp = {
          num : this.$session.get('userInfo').user_num
        }

<<<<<<< HEAD
        await this.$http.post('http://192.168.31.63:3000/team/getTeamList', temp)
        .then(async (response) => {
          // 속해있는 여러 개의 팀이 response.body를 통해 전달됨
          for(var i = 0; i < response.body.length; i++){
            // 여러 개의 팀 중, 1개씩 순서대로 실행
            var data = {
              teamNum : response.body[i].team_num
            }
            // 선택된 팀에 속한 member들을 구함
            await this.$http.post('http://192.168.31.63:3000/team/getMember', data)
            .then(async (response) => {
              var tempTeamName = response.body[0].team_name;
              var tempMember = '';

              for(var k = 0; k < response.body.length; k++){
                tempMember += response.body[k].user_name + " "
              }
=======
      // this.$http.post('http://192.168.31.63:3000/team/getTeamList', temp)
      this.$http.post('http://192.168.31.65:3000/team/getTeamList', temp)
      .then((response) => {
        for(var i = 0; i < response.body.length; i++){
          var data = {
            teamNum : response.body[i].team_num
          }

          // this.$http.post('http://192.168.31.63:3000/team/getMember', data)
          this.$http.post('http://192.168.31.65:3000/team/getMember', data)
          .then((response) => {
            var tempMember = '';
>>>>>>> 3892d4da54248d25f66c1c222a1afb7007e88f3d

              var tempData = {
                num : this.$session.get('userInfo').user_num,
                teamNum : response.body[0].team_num
              }
              await this.$http.post('http://192.168.31.63:3000/team/getAuth', tempData)
              .then((response) => {
                this.items.push({ title: tempTeamName, member: tempMember, auth: response.body[0].member_auth, exist: true })
              })
              .catch((error) => {
                console.log(error)
              })
            })
            .catch((error) => {
              console.log(error)
            })
          }
        })
        .catch((error) => {
          console.log(error)
        })
      },
      goReadPage(postNum, email){
          console.log(postNum);
          router.push({name:"PostReadPage", params:{id:postNum}})
      },
      show(memberData){
        alert(memberData)
      },
      accept(titleData){
        var temp = {
          num : this.$session.get('userInfo').user_num,
          teamName : titleData
        }
        this.$http.post('http://192.168.31.63:3000/team/getTeamNum', temp)
        .then((response) => {
          // console.log(response.body[0].team_num)

          var auth = {
            num : this.$session.get('userInfo').user_num,
            teamNum : response.body[0].team_num
          }
          this.$http.post('http://192.168.31.63:3000/team/changeAuth', auth)
          .then((response) => {
            console.log("Change complete")
          })
          .catch((error) => {
            console.log(error)
          })
        })
        .catch((error) => {
          console.log(error)
        })
      },
      del(titleData){
        for(var i = 0; i < this.items.length; i++){
          if(this.items[i].title == titleData){
            this.items[i].exist = false
          }
        }

        var temp = {
          num : this.$session.get('userInfo').user_num,
          teamName : titleData
        }
        this.$http.post('http://192.168.31.63:3000/team/getTeamNum', temp)
        .then((response) => {
          var auth = {
            num : this.$session.get('userInfo').user_num,
            teamNum : response.body[0].team_num
          }
          this.$http.post('http://192.168.31.63:3000/team/deleteTeam', auth)
          .then((response) => {
            console.log("Delete complete")
          })
          .catch((error) => {
            console.log(error)
          })
        })
        .catch((error) => {
          console.log(error)
        })
      },
      async update(pk){
        var temp = {
          num : this.$session.get('userInfo').user_num,
          teamNum : pk
        }

        await this.$http.post('http://192.168.31.63:3000/team/getLatestTeam', temp)
        .then(async (response) => {
          console.log('team name:')
          console.log(response.body)
          
          var data = {
            teamNum : pk
          }
            // 선택된 팀에 속한 member들을 구함
            await this.$http.post('http://192.168.31.63:3000/team/getMember', data)
            .then(async (response) => {
              var tempTeamName = response.body[0].team_name;
              var tempMember = '';

              for(var k = 0; k < response.body.length; k++){
                tempMember += response.body[k].user_name + " "
              }

              this.items.push({ title: tempTeamName, member: tempMember, auth: 0, exist: true })
            })
            .catch((error) => {
              console.log(error)
            })
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
  }
}
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Jura:300,400,500,600);
@import url(https://fonts.googleapis.com/css?family=Play);
@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,300);

.logo {
  float: left;
}

.post-container {
  position: relative;
  padding-left: 50px;
}

.published {
  position: absolute;
  width: 50px;
  left: 25px;
  padding: 10px 0;
  text-align: center;
  background-color: #fff;
}

.date {
  text-transform: uppercase;
  font-family: Open Sans;
  font-weight: bold;
  color: #222;
  font-size: 12px;
}

.post {
  padding-left: 50px;
  padding-bottom: 60px;
  margin: 0 auto;
  border-left: 1px solid #999;
}

.post-container:last-child .post {
  padding-bottom: 60px;
}

.posth1 {
  /* padding-top: 3px; */
  font-family: Open Sans;
  font-weight: bold;
  color: #222;
  font-size: 30px;
  margin: 0;
  text-transform: uppercase;
  /* 여러 줄 자르기 추가 스타일 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  line-height: 1.2;
  height: 1.2em;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical ;
}

.pub-date {
  font-family: Open Sans;
  color: #666;
  font-size: 12px;
}

.post img {
  width: 100px;
  height: 100px;
  border-radius: 9999px;
  float: left;
  margin-right: 15px;
  margin-top: 5px;
}

.ptag {
  padding-top: 10px;
  font-family: Open Sans;
  color: #333;
  line-height: 1.6;
  font-size: 14px;
  margin-top: 0;
  text-overflow: ellipsis;
  /* 여러 줄 자르기 추가 스타일 */
  white-space: normal;
  /* height: 4.5em; */
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.v-card__text {
  padding: 0px !important;
  padding-bottom: 4px !important;
}

.v-card__title {
  padding: 0px !important;
  padding-top: 25px !important;
  padding-bottom: 5px !important;
}

.v-btn.outlined_first {
  border: 1.3px solid rgb(255, 177, 0);
  border-radius: 5%;
  height: 40px;
  width: 60px;
  font-weight:bold;
  color: rgb(255, 177, 0);
  background-color: white;
}

.v-btn.outlined_second {
  border: 1.3px solid rgb(0, 68, 194);
  border-radius: 5%;
  height: 40px;
  width: 60px;
  font-weight:bold;
  color: rgb(0, 68, 194);
  background-color: white;
}

.v-btn.outlined_third {
  border: 1.3px solid rgb(224, 0, 0);
  border-radius: 5%;
  height: 40px;
  width: 60px;
  font-weight:bold;
  color: rgb(224, 0, 0);
  background-color: white;
}
</style>