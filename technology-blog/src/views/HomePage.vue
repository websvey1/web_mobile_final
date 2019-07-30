<template>
<div class="body" style="padding-top: 50px;">

    <div class="container">
        <div class="website">
            <!-- <div class="nav">
            <ul>
                <li> Yeji's Family</li>
                <li><LoginHome></LoginHome></li>
                <li><img src="https://item.kakaocdn.net/do/781f727aa69530ae686abfdc213bc807f43ad912ad8dd55b04db6a64cddaf76d"></li>
                <li @click.stop="drawer = !drawer">Menu</li>
                <li @click="trans">Translate</li>
            </ul>
            </div> -->


            <div class="main-page" style="position:relative; z-index:2;">
                <PostList></PostList>
                  <PostList></PostList>
                    <PostList></PostList>
                    <PostList></PostList>

            </div>
        </div>
    </div>

    <!-- <v-navigation-drawer v-model="drawer" fixed temporary hide-overlay style="background-color: #fefaff;">
      <v-list>
        <div ></div>
        <v-list-tile avatar style="height:75px">
          <v-list-tile-content style="margin-left: 13px;">
            <span id="SSAFY">
              <b>SSAFY</b>
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

      <v-list-group>
        <template v-slot:activator>
          <v-list-tile @click="" style="margie-top:10px;">
            <v-list-tile-content style="height:auto;">
              <h1 style="margin-left: 15px;">
                <v-icon>question_answer</v-icon>
                <span class="spantag"> Post</span>
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
      </v-list-group>

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
    </v-navigation-drawer> -->
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
    #SSAFY {
    font-family: 'Lato', sans-serif;
    font-size: 60px;
    color:rgb(63, 63, 63)
    }
</style>
