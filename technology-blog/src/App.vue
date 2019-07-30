<template>
  <div>
    <HeaderTest/>
    <v-app>
      <v-content>
        <router-view/>
      </v-content>
    </v-app>
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
import {mapState} from 'vuex';

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
      // events: [
      //   {
      //     title     :  'event1',
      //     start     : '2019-07-09',
      //     cssClass  : 'blue',
      //     YOUR_DATA : {}
      //   },
      //   {
      //     title     : 'event2',
      //     start     : '2019-07-10',
      //     end       : '2019-07-13',
      //     cssClass  : ['orange']
      //   }
      // ]
      events: [{
        title     : 'event2',
        start     : '2019-07-10',
        end       : '2019-07-13',
        cssClass  : ['orange']
      }]
      // events: []
    }
  },

  created(){
    this.readPosts();
  },
  methods:{
    async readPosts(){
      // await FirebaseService.readPosts();
      var posts = await this.$http.get("http://192.168.31.65:3000/post")
      .then((response) => {
        console.log(response.data);
        this.$store.state.posts = response.data;
      })
      .catch((error) =>{
        console.log(error);
      })
    }
  },
  mounted(){
    this.$http.post('http://192.168.31.63:3000/getPlan')
      .then((response) => {
        var items = response.body;
        // console.log(items)
        for(var i = 0; i < items.length; i++){
          this.events.push({title: items[i].cal_title, start: items[i].cal_start,
                  end: items[i].cal_end, cssClass: items[i].cal_color, description: items[i].cal_description});
        }

        // console.log(this.events)
      })
      .catch((error) =>{
        // console.log(error)
      })
  },
  computed:
    mapState(['plan'])
  ,
  watch: {
    plan(to,from){
      this.events.push(this.$store.state.plan);
    }
  },

}
</script>

<style>
/*   #app {
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
  } */
</style>
