<template>
  <div>
    <HeaderTest v-if="$router.currentRoute.name != 'HomePage'"/>
    <v-app>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>

    <div id="app">
      <div class="main">
        <div class="calendar-holder">
          <calendar :events="events" />
        </div>

        <div class="form-holder">
          <h3>Schedule an event</h3>
          <event-form />
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
import FirebaseService from './services/FirebaseService'
import HeaderTest from './components/HeaderTest'

import Calendar from './components/Calendar.vue'
import EventForm from './components/EventForm.vue'
import Pusher from 'pusher-js';
export default {
  name: 'App',
  components: {
    Footer,
    Header,
    HeaderTest,
    Calendar,
    EventForm
  },
  data () {
    return {
      //
      events: [{
            title     :  'event1',
            start     : '2019-07-09',
            cssClass  : 'blue',
            YOUR_DATA : {}
          },
          {
            title     : 'event2',
            start     : '2019-07-10',
            end       : '2019-07-13',
            cssClass  : ['orange']
          }] 
    }
  },

  created(){
    var config = {
      id : 'hong',
      pwd: '12345',
      dept_no : 1,
      user_id : 1
    }

    this.$http.post("/dept",config)
    .then(res => {
      alert(res.data)
      console.log(res.data);
    })
    .catch(error => {
      // alert(error)
      console.log("안됐지롱");
    })
  },
  
  methods:{
    async readPosts(){
      await FirebaseService.readPosts();
    }
  },

  mounted(){
    this.readPosts()
  }

}
</script>

<style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }
    .main {
      display: flex;
      align-items: center;
    }
    .calendar-holder {
      width: 65%;
    }
    .form-holder {
      width: 35%;
    }
    .form-holder > h3 {
      color: orangered;
      text-transform: uppercase;
      font-size: 16px;
      text-align: left;
      margin-left: 30px;
      margin-bottom: 10px;
    }
    </style>