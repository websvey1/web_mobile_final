 <template>
 <sequential-entrance fromTop>

  <v-card v-for="item in items" max-width="1000" max-height="170" style="margin: auto">
    <v-layout py-4 pl-4>
      <v-flex shrink>
        <v-img height="120" width="120" src="https://cdn.vuetifyjs.com/images/cards/store.jpg" style="border-radius: 50%;"></v-img>
      </v-flex>
      <v-flex text-center>
        <v-container grid-list-lg style="margin-left: 10px;">
          <v-layout column>
            <v-flex style="padding-top: 20px;">
              <h1>{{ item.title }}</h1>
            </v-flex>
            <v-flex style="margin-left: auto;">
              <v-btn color="warning" @click="show(item.member)">팀원보기</v-btn>
              <v-btn color="info">수락</v-btn>
              <v-btn color="error">거절</v-btn>
            </v-flex>
            <v-flex>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
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
      // TeamList.vue가 활성화 되자 마자, Member table에 가서, 지금 user가 속한 팀 리스트 모두 뽑아와야함
      // Team table에서 팀 리스트 뽑고, 그 팀 리스트 별로 memeber들 다 가져오기.
      var temp = {
        num : this.$session.get('userInfo').user_num
      }

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

            for(var k = 0; k < response.body.length; k++){
              tempMember += response.body[k].user_name + " "
            }

            this.items.push({ title: response.body[0].team_name, member: tempMember })
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
    methods: {
        goReadPage(postNum, email){
            console.log(postNum);
            router.push({name:"PostReadPage", params:{id:postNum}})
        },
        show(data){
          alert(data)
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
  height:1.2em;
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


</style>
