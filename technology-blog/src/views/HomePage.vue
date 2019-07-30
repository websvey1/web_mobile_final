<template>
<div class="body">
    <div class="container">
        <div class="website">
            <div class="nav">
            <ul>
                <li> Yeji's Family</li>
                <li><LoginHome></LoginHome></li>
                <li><img src="https://item.kakaocdn.net/do/781f727aa69530ae686abfdc213bc807f43ad912ad8dd55b04db6a64cddaf76d"></li>
                <li @click.stop="drawer = !drawer">Menu</li>
                <li @click="trans">Translate</li>
            </ul>
            </div>
            <div class="main-page" style="padding-top: 10px;">
                <PostList></PostList>
            <footer>
            </footer>
            </div>
        </div>
    </div>

    <v-navigation-drawer v-model="drawer" fixed temporary hide-overlay style="background-color: #fefaff;">
      <v-list>
        <div ></div>
        <v-list-tile avatar style="height:75px">
          <v-list-tile-content style="margin-left: 13px;">
            <span id="SSAFY">
              <b>Hello</b>
            </span>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list-tile v-for="item in items" :key="item.title" @click="" :to="item.link" style="margie-top:10px;">
        <v-list-tile-content style="height:auto;">
          <h1 style="margin-left: 15px;">
            <v-icon>{{ item.icon }}</v-icon>
            <span class="spantag"> {{ item.title}}</span>
          </h1>
        </v-list-tile-content>
      </v-list-tile>
<!-- <<<<<<<<<<<<<<<<<< Personal Project >>>>>>>>>>>>>>>>>> -->
      <v-list-group>
        <template v-slot:activator>
          <v-list-tile @click="" style="margie-top:10px;">
            <v-list-tile-content style="height:auto;">
              <h1 style="margin-left: 15px;">
                <v-icon>question_answer</v-icon>
                <span class="spantag"> Personal</span>
              </h1>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-divider />
        <v-list-tile to="/post" style="background:white;">
          <v-list-tile-content style="height:auto;">
            <h1 style="margin-left: 30px;">
              <span class="spantag">Post 모아보기</span>
            </h1>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider />
        <v-list-tile to="/postwrite" style="background:white;">
          <v-list-tile-content style="height:auto;">
            <h1 style="margin-left: 30px;">
              <span class="spantag">Post 쓰기</span>
            </h1>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider/>
        <v-list-tile to="/myproject/create" style="background:white;">
          <v-list-tile-content style="height:auto;">
            <h1 style="margin-left: 30px;">
              <span class="spantag">Project 쓰기</span>
            </h1>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider/>
      </v-list-group>
<!-- <<<<<<<<<<<<<<<<<< Team Project >>>>>>>>>>>>>>>>>> -->
      <v-list-group>
        <template v-slot:activator>
          <v-list-tile @click="" style="margie-top:10px;">
            <v-list-tile-content style="height:auto;">
              <h1 style="margin-left: 15px;">
                <v-icon>question_answer</v-icon>
                <span class="spantag"> Team</span>
              </h1>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-divider />
        <v-list-tile to="/teamChoose" style="background:white;">
          <v-list-tile-content style="height:auto;">
            <h1 style="margin-left: 30px;">
              <span class="spantag">Team 선택</span>
            </h1>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider />
      </v-list-group>
<!-- <<<<<<<<<<<<<<<<<< User >>>>>>>>>>>>>>>>>> -->
      <v-list-group>
        <template v-slot:activator>
          <v-list-tile @click="" style="margie-top:10px;">
            <v-list-tile-content style="height:auto;">
              <h1 style="margin-left: 15px;">
                <v-icon>account_circle</v-icon>
                <span class="spantag"> Users</span>
              </h1>
            </v-list-tile-content>
          </v-list-tile>
        </template>
        <v-divider />
        <v-list-tile to="/updateUser" style="background:white;">
          <v-list-tile-content style="height:auto;">
            <h1 style="margin-left: 30px;">
              <span class="spantag">회원 정보 수정</span>
            </h1>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider />
        <v-list-tile to="/removeUser" style="background:white;">
          <v-list-tile-content style="height:auto;">
            <h1 style="margin-left: 30px;">
              <span class="spantag">회원 탈퇴</span>
            </h1>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider/>
      </v-list-group>

      <v-list-tile @click="" to="/graph" style="margie-top:10px;">
        <v-list-tile-content style="height:auto;">
          <h1 style="margin-left: 15px;">
            <v-icon>show_chart</v-icon>
            <span class="spantag"> Graph</span>
          </h1>
        </v-list-tile-content>
      </v-list-tile>

      <Weather></Weather>
    </v-list>
    </v-navigation-drawer>
</div>
</template>


<script>
import FirebaseService from '@/services/FirebaseService'
import PostList from '@/components/PostList'
import LoginHome from "@/components/LoginHome"
import Weather from '@/components/WeatherInfo'
import LogService from '@/services/LogService'


export default {
    name: 'HomePage',
    components: {
        PostList,
        LoginHome,
        Weather,
    },
    data() {
        return {
            drawer: null,
            items: [{
                title: 'Home',
                icon: 'home',
                link: '/'
            },
            {
                title: 'Project',
                icon: 'widgets',
                link: '/project'
            }
            ]
        }
    },
    created(){
        if(this.$store.state.userInfo != null){
          LogService.CreatedTime(this);
        }
    },
    beforeRouteLeave(to, from, next){
      if(this.$store.state.logInfo){
        LogService.DestroyedTime(this);
      }
      next();
    },
    methods: {
        trans(){
            this.$store.state.isTrans = !this.$store.state.isTrans;
        }
    },
}
</script>

<style scoped>
    .body{
    margin: 0;
    padding: 0;
    background: linear-gradient(110deg, #ffbdbd  50%, #f8ed8e 50%);
    }


    .website{
    overflow: hidden;
    display: flex;
    background-color: white;
    width: 1300px;
    height: 800px;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    position: relative;
    margin-top: 600px;
    flex-direction: column;
    background-color: white;
    background-repeat: no-repeat;
    background-position: right;
    background-size: 600px;
    border-radius: 15px;
    box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);

    }

    .nav {
    display: flex;
    justify-content: center;
    font-family: 'Raleway', Arial;
    color: #ff1744  ;
    font-size: 1.2em;
    font-weight: bold;
    text-transform: uppercase;
    }

    .nav ul{
    display: flex;
    list-style-type: none;
    }

    .nav ul li{
    margin: 30px;
    transition: .4s;
    }

    .link {
        color: #ff1744;
        text-decoration: none;
    }

    .nav ul li:hover{
    color:#12527c;
    cursor: pointer;
    }
    .nav ul li img{
    width: 90px;
    margin-top: -30px;
    }

    .main-page{
    display: flex;
    flex-direction: column;
    }

    .main-page h1{
    font-family: 'Raleway', Arial;
    font-size: 70px;
    margin-left: 60px;
    }

    .main-page p{
    font-family: 'Raleway';
    font-weight: strong;
    font-size: 15px;
    margin-left: 60px;
    margin-top: -40px;
    }

    .view-products{
    width: 170px;
    height: 50px;
    margin-left: 60px;
    margin-top: 70px;
    background-color: #12527c;
    border: none;
    border-radius: 20px;
    color: white;
    transition: .4s ease-in-out;
    }

    .view-products:hover{
    background-color: #ff1744;
        cursor: pointer;
    }

    #SSAFY {
    font-family: 'Lato', sans-serif;
    font-size: 60px;
    color:rgb(63, 63, 63)
    }
</style>
