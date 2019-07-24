<template>
<div>
  <v-layout>
    <v-flex>
      <v-toolbar flat style="background-color: mistyrose">
        <v-toolbar-title>
          <router-link id="Main" to="/">
            YEJI's Family ♥
          </router-link>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- <Translate /> -->
        <v-toolbar-items>
          <v-btn flat to="/home">home</v-btn>
          <v-btn flat @click="trans">Translate</v-btn>
          <v-btn flat to="/postwrite">Post</v-btn>
          <v-btn flat @click.stop="drawer = !drawer">Menu</v-btn>
          <LoginForm/>
        </v-toolbar-items>
      </v-toolbar>
    </v-flex>
  </v-layout>


  <v-navigation-drawer v-model="drawer" fixed temporary hide-overlay>
    <v-list class="pa-1">
      <v-list-tile avatar>
        <v-list-tile-content>
          <v-list-tile-title>SSAFY</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>

    <v-list class="pt-0" dense>
      <v-divider></v-divider>
      <v-list-tile v-for="item in items" :key="item.title" @click="" :to="item.link">
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <Weather></Weather>
    </v-list>
  </v-navigation-drawer>

</div>
</template>

<script>
import Weather from './WeatherInfo'
import LoginForm from "@/components/LoginForm"


export default {
  name: "Header",
  components: {
    LoginForm,
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
          title: 'Portfolio',
          icon: 'widgets',
          link: '/portfolio'
        },
        {
          title: 'Post',
          icon: 'question_answer',
          link: '/post'
        },
        {
          title: 'LogIn',
          icon: 'people_outline',
          link: '/login'
        },
        {
          title: 'Graph',
          icon: 'android',
          link: '/graph'
        }

      ]
    }
  },
  methods: {
    trans(){
      this.$store.state.isTrans = !this.$store.state.isTrans;
    }
  }
}
</script>

<style scoped>
#Main {
  text-decoration: none;
  font-family: "Trebuchet MS", serif;

  color: rgba(0, 0, 0, .87);
}
</style>
