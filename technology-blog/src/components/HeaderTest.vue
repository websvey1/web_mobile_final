<template>
<div>
  <div class="container">
    <header>
      <div id="main-nav" style="display: flex; justify-content: space-between;">
        <ul style="width:100%">
          <li style="float: left;">
            <router-link to="/"><b> Yeji's Family</b></router-link>
          </li>
          <li class="right" style="">
            <!-- <router-link to="/postwrite" style="margin-right:20px;">PostWrite</router-link>
            <router-link to="/removeuser"style="margin-right:20px;">RemoveUser</router-link>
            <router-link to="/updateuser" style="margin-right:20px;">UpdateUser</router-link> -->
            <a @click.stop="drawer = !drawer">Menu</a>
              <span style="cursor:default">&nbsp;&nbsp;</span>
            <a>
              <LoginHome class="login"></LoginHome>
            </a>
          </li>
        </ul>
      </div>
    </header>
  </div>
  <!-- 메뉴 누르면 나오는 drawer-->
  <v-navigation-drawer v-model="drawer" fixed temporary hide-overlay style="background-color: #fefaff;">
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
  </v-navigation-drawer>
</div>
</template>


<script>
import Weather from './WeatherInfo'
import LoginForm from './LoginForm'
import LoginHome from './LoginHome'

export default {
  name: "HeaderTest",
  components: {
    LoginForm,
    Weather,
    LoginHome,
  },
  methods: {

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
        },
        // {
        //   title: 'Post',
        //   icon: 'question_answer',
        //   link: '/post'
        // },
        // {
        //   title: 'Graph',
        //   icon: 'android',
        //   link: '/graph'
        // }

      ]
    }
  },
}
</script>
<style scoped>
    header {
        width: 100%;
        margin: 0 auto;
        position:relative;
        z-index:2;
        /*background: #ededed;*/
        /*border-bottom: 1px solid #ccc;*/
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
</style>
