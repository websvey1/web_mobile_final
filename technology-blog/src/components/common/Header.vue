<template>
<div style="z-index:4;">
  <!-- 첫번째 헤더 -->
  <v-toolbar flat style="background-color:rgb(255, 255, 255);

      z-index:4;
      color:rgb(0, 0, 0);
      height:80px;
      border-bottom: 1px solid rgb(208, 208, 208);
      padding: 10px 10px 20px 20px;
      ">
      <v-toolbar-title class="header__container">
            <router-link to="/"> <img src="@/assets/code3.png/" height="50px" widt="50px" alt=""> </router-link>
            <!-- <span v-if="this.$session.has('userInfo')" style="width:100%;text-align:right;">{{this.$session.get('userInfo').user_name}}님 </span> -->
            <!-- <v-btn flat class="outlined" @click=""><LoginForm class="login"></LoginForm></v-btn> -->
            <div>
              <LoginForm class="login"></LoginForm>
            </div>

            <!-- <span>?</span> -->
      </v-toolbar-title>
    </v-toolbar>

  <!-- 두번째 헤더 (고정될 헤더) -->
  <fixed-header>
    <div class="navbar" >
      <v-toolbar flat style="background-color: rgb(255, 255, 255);
      z-index:4;
      color:rgb(0, 0, 0);
      display: flex;
      border-bottom: 1px solid rgb(208, 208, 208);
      justify-content: center;
      ">
      <!-- box-shadow: 0 4px 0 rgba(182, 182, 182, 0.18) !important; -->

        <v-toolbar-title>
          <router-link id="Main" to="/" style="margin-right:50px;">
            YEJI's Family ♥
          </router-link>
        </v-toolbar-title>

        <!-- <v-spacer></v-spacer> -->

        <!-- <Translate /> -->
        <v-toolbar-items>
          <v-btn flat to="/">home</v-btn>
          <v-btn flat to="/myproject">Project</v-btn>
          <v-btn flat to="/post">Post</v-btn>
          <v-btn flat @click.stop="drawer = !drawer">Menu</v-btn>
        </v-toolbar-items>
      </v-toolbar>
    </div>
  </fixed-header>

            <!-- <router-link to="/postwrite" style="margin-right:20px;">PostWrite</router-link>
            <router-link to="/removeuser"style="margin-right:20px;">RemoveUser</router-link>
            <router-link to="/updateuser" style="margin-right:20px;">UpdateUser</router-link> -->

  <!-- 메뉴 누르면 나오는 drawer-->
  <v-navigation-drawer v-model="drawer" fixed temporary hide-overlay style="background-color: rgb(255, 255, 255);">
    <v-list>
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

    <!-- <v-list-tile v-for="item in items" :key="item.title" @click="" :to="item.link" style="margie-top:10px;">
      <v-list-tile-content style="height:auto;">
        <h1 style="margin-left: 15px;">
          <v-icon>{{ item.icon }}</v-icon>
          <span class="spantag"> {{ item.title}}</span>
        </h1>
      </v-list-tile-content>
    </v-list-tile> -->
    <!-- <div v-if > -->
    <v-list-tile @click="" to="/" style="margie-top:10px;">
      <v-list-tile-content style="height:auto;">
        <h1 style="margin-left: 15px;">
          <v-icon>home</v-icon>
          <span class="spantag"> Home</span>
        </h1>
      </v-list-tile-content>
    </v-list-tile>

    <v-list-group>
      <template v-slot:activator>
        <v-list-tile @click="" style="margie-top:10px;">
          <v-list-tile-content style="height:auto;">
            <h1 style="margin-left: 15px;">
              <v-icon>accessibility_new</v-icon>
              <span class="spantag"> Personal</span>
            </h1>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <v-divider />

      <v-list-tile to="/myproject" style="background:white;">
        <v-list-tile-content style="height:auto;">
          <h1 style="margin-left: 30px;">
            <span class="spantag">Project</span>
          </h1>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider />

      <v-list-tile to="/post" style="background:white;">
        <v-list-tile-content style="height:auto;">
          <h1 style="margin-left: 30px;">
            <span class="spantag">Post</span>
          </h1>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>

      <!-- <v-list-tile to="/todolist" style="background:white;">
        <v-list-tile-content style="height:auto;">
          <h1 style="margin-left: 30px;">
            <span class="spantag">To-Do List</span>
          </h1>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>

      <v-list-tile to="/calendar" style="background:white;">
        <v-list-tile-content style="height:auto;">
          <h1 style="margin-left: 30px;">
            <span class="spantag">Calendar</span>
          </h1>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>
    </v-list-group>
<!-- dklafjlkdjfkljakldfjklasdjfkljadsklfjdfkljkldfjakljdklfjaklfj -->
    <v-list-group>
      <template v-slot:activator>
        <v-list-tile @click="" style="margie-top:10px;">
          <v-list-tile-content style="height:auto;">
            <h1 style="margin-left: 15px;">
              <v-icon>people</v-icon>
              <span class="spantag"> Team</span>
            </h1>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <v-divider />

      <v-list-tile to="/teamChoose" style="background:white;">
        <v-list-tile-content style="height:auto;">
          <h1 style="margin-left: 30px;">
            <span class="spantag">Team 선택</span>&nbsp;
            <span v-if="newOne" style="color: red">new!</span>
          </h1>
        </v-list-tile-content>
      </v-list-tile>

      <!--
      <v-list-tile v-else @click="go()" style="background:white;">
        <v-list-tile-content style="height:auto;">
          <h1 style="margin-left: 30px;">
            <span class="spantag">Team: {{ teamName }}</span>
          </h1>
        </v-list-tile-content>
      </v-list-tile>
      -->

      <v-divider />
            <v-list-tile to="/teamCalendar" style="background:white;">
        <v-list-tile-content style="height:auto;">
          <h1 style="margin-left: 30px;">
            <span class="spantag">Calendar</span>
          </h1>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>

    </v-list-group>

        <v-list-tile to="/another" style="background:white;">
          <v-list-tile-content style="height:auto;">
            <h1 style="margin-left: 15px;">
              <v-icon>person_pin</v-icon>
              <span class="spantag"> AnotherUser</span>
            </h1>
          </v-list-tile-content>
        </v-list-tile>

    <v-list-group>
      <template v-slot:activator>
        <v-list-tile @click="" style="margie-top:10px;">
          <v-list-tile-content style="height:auto;">
            <h1 style="margin-left: 15px;">
              <v-icon>tag_faces</v-icon>
              <span class="spantag"> Users</span>
            </h1>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <v-divider />
      <v-list-tile to="/user/update" style="background:white;">
        <v-list-tile-content style="height:auto;">
          <h1 style="margin-left: 30px;">
            <span class="spantag">회원 정보 수정</span>
          </h1>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider />
      <v-list-tile to="/user/delete" style="background:white;">
        <v-list-tile-content style="height:auto;">
          <h1 style="margin-left: 30px;">
            <span class="spantag">회원 탈퇴</span>
          </h1>
        </v-list-tile-content>
      </v-list-tile>
      <v-divider/>
    </v-list-group>

    <Weather></Weather>
  </v-list>
  </v-navigation-drawer>
</div>
</template>


<script>
import Weather from '@/components/WeatherInfo'
import LoginForm from '@/components/LoginForm'
import FixedHeader from 'vue-fixed-header'
import {mapState} from 'vuex';

export default {
  name: "Header",
  components: {
    LoginForm,
    Weather,
    FixedHeader
  },
  data() {
    return {
      drawer: null,
      isTeam: false,
      TeamId: null,
      teamName: '',
      newOne: false,
    }
  },
  mounted(){
    // console.log("확인확인",this.$route.params.id)
    this.check();
  },
  created () {
    // 뷰가 생성되고 데이터가 이미 감시 되고 있을 때 데이터를 가져온다.
    this.fetchData();
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    exist(to, from){
      this.check();
    }
  },
  computed:
    mapState(['exist'])
  ,
  methods: {
    fetchData () {
        // console.log("&&&",this.$route.params.id)
        // if(this.$route.params.id == 'undefined' || this.$route.params.id == null){
        //   this.TeamId = null;
        // }
        // else{
        //   this.TeamId = this.$route.params.id;
        //   console.log(this.TeamId)
        //   var data = {
        //     teamNum : this.TeamId
        //   }

        //   console.log(data)
        //   this.$http.post('http://192.168.31.63:3000/team/getLatestTeam', data)
        //   .then((response) => {
        //     this.teamName = response.body[0].team_name
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   })
        // }
    },
    go(id){
      this.$router.push({ name: "TeamProjectPage", params: {id: id} })
    },
    check(){
      if(this.$store.state.exist){
        this.newOne = true
      }else{
        this.newOne = false
      }
    }
  }


}
</script>
<style scoped>
  template{
    z-index: 4;
    height: 100%;
  }
  .navbar.vue-fixed-header--isFixed {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    z-index:4;
  }
  .v-btn.outlined {
      border: 1px solid rgb(57, 117, 72);
      border-radius:10%;
      height: 50px;
      width: 60px;
      color: rgb(57, 117, 72);
    }

    #Main {
      text-decoration: none;
      /* font-family: "Trebuchet MS", serif; */
      font-family: 'Acme', sans-serif;
      font-size: 30px;
      color: rgba(0, 0, 0, .87);
    }
    #main-nav {
        width: 90%;
        margin: 0 auto;
        text-align: center;
        font-size: 1.7em;
        font-family: 'Raleway';
        border-bottom: 2px solid lightpink ;
    }

    #main-nav a {
      color: rgb(31, 30, 30);
      text-shadow: 1px 1px #706f6f;
      text-decoration: none;
      cursor: pointer;
    }

    #main-nav ul li {
      display: inline-block;
      list-style: none;
      padding: 20px 20px 20px;
    }

    #main-nav a {
      color: rgb(31, 30, 30);
      text-shadow: 1px 1px #706f6f;
      text-decoration: none;
      cursor: pointer;
    }

    #main-nav a:hover {
    color: #ff3300;
    }

    #MENU {
        font-family: 'Lato', sans-serif;
        font-size: 18px;
        border:2px lightcoral;
    }

    #SSAFY {
        font-family: 'Lato', sans-serif;
        font-size: 50px;
        color:rgb(63, 63, 63);
    }
    .SSAFY{
        display:flex;
        align-items: center;

        justify-content: center;
    }
    .v-list__tile__content, .v-list___tile-action, .v-list_tile{
        /* text-align: center!important; */
        /* align-items: center!important; */
        /* justify-content: center; */
        }
    #main-nav li.right {
        font-size: 1.3rem;
        float: right;
        margin-top: 6px;
    }

    #main-nav li.right {
      float: right;
    }

    #main-nav a:hover {
      color: #d74927;
    }

    .spantag {
       font-size:20px;
       color:rgb(61, 61, 61);
    }

    .spantag:hover {
      color: rgb(134, 90, 127);
      /* color:lightcyan */
    }

    .header__container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-left: 100px;
    }

</style>
